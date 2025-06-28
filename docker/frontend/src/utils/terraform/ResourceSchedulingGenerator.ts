
import BaseGenerator from './BaseGenerator';

export default class ResourceSchedulingGenerator extends BaseGenerator {
  generateResourceScheduling(schedulingConfig: any): string {
    const { environment, scaleUpTime, scaleDownTime, scaleUpDays, scaleDownDays, enableLambdaScheduler, autoscalingGroupName } = schedulingConfig;
    
    // Convert time format (HH:MM to cron format)
    const scaleUpHour = scaleUpTime.split(':')[0];
    const scaleDownHour = scaleDownTime.split(':')[0];
    const scaleUpCron = this.convertDaysToCron(scaleUpDays);
    const scaleDownCron = this.convertDaysToCron(scaleDownDays);

    let code = `
# Resource Scheduling Configuration
resource "aws_autoscaling_schedule" "scale_down_evening" {
  count = var.environment == "${environment}" ? 1 : 0

  scheduled_action_name  = "scale-down-evening"
  min_size               = 0
  max_size               = 0
  desired_capacity       = 0
  recurrence             = "0 ${scaleDownHour} * * ${scaleDownCron}"
  autoscaling_group_name = aws_autoscaling_group.${autoscalingGroupName || 'main'}.name

  tags = var.required_tags
}

resource "aws_autoscaling_schedule" "scale_up_morning" {
  count = var.environment == "${environment}" ? 1 : 0

  scheduled_action_name  = "scale-up-morning"
  min_size               = local.config.min_size
  max_size               = local.config.max_size
  desired_capacity       = local.config.min_size
  recurrence             = "0 ${scaleUpHour} * * ${scaleUpCron}"
  autoscaling_group_name = aws_autoscaling_group.${autoscalingGroupName || 'main'}.name

  tags = var.required_tags
}
`;

    if (enableLambdaScheduler) {
      code += this.generateLambdaScheduler(environment, scaleUpHour, scaleDownHour, scaleUpCron);
    }

    return code;
  }

  private generateLambdaScheduler(environment: string, scaleUpHour: string, scaleDownHour: string, scaleUpCron: string): string {
    return `
# IAM role for Lambda scheduler
resource "aws_iam_role" "scheduler" {
  name = "\${var.project_name}-resource-scheduler-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = var.required_tags
}

resource "aws_iam_role_policy" "scheduler_policy" {
  name = "\${var.project_name}-scheduler-policy"
  role = aws_iam_role.scheduler.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "autoscaling:UpdateAutoScalingGroup",
          "autoscaling:DescribeAutoScalingGroups",
          "ec2:DescribeInstances",
          "ec2:StopInstances",
          "ec2:StartInstances"
        ]
        Resource = "*"
      }
    ]
  })
}

# Lambda function for advanced scheduling
data "archive_file" "scheduler_zip" {
  type        = "zip"
  output_path = "resource_scheduler.zip"
  source {
    content = <<-EOT
import json
import boto3
import os

def handler(event, context):
    environment = os.environ['ENVIRONMENT']
    
    # Add your custom scheduling logic here
    print(f"Running scheduler for environment: {environment}")
    
    return {
        'statusCode': 200,
        'body': json.dumps('Scheduler executed successfully')
    }
EOT
    filename = "index.py"
  }
}

resource "aws_lambda_function" "resource_scheduler" {
  filename      = data.archive_file.scheduler_zip.output_path
  function_name = "\${var.project_name}-resource-scheduler"
  role          = aws_iam_role.scheduler.arn
  handler       = "index.handler"
  runtime       = "python3.9"
  timeout       = 300

  source_code_hash = data.archive_file.scheduler_zip.output_base64sha256

  environment {
    variables = {
      ENVIRONMENT = var.environment
    }
  }

  tags = var.required_tags
}

# CloudWatch rule to trigger the scheduler
resource "aws_cloudwatch_event_rule" "scheduler" {
  name                = "\${var.project_name}-resource-scheduler"
  description         = "Trigger resource scheduler"
  schedule_expression = "cron(0 ${scaleUpHour},${scaleDownHour} * * ${scaleUpCron})"

  tags = var.required_tags
}

resource "aws_cloudwatch_event_target" "lambda" {
  rule      = aws_cloudwatch_event_rule.scheduler.name
  target_id = "ResourceSchedulerTarget"
  arn       = aws_lambda_function.resource_scheduler.arn
}

resource "aws_lambda_permission" "allow_cloudwatch" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.resource_scheduler.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.scheduler.arn
}
`;
  }

  private convertDaysToCron(days: string): string {
    switch (days) {
      case 'MON-FRI':
        return 'MON-FRI';
      case 'MON-SAT':
        return 'MON-SAT';
      case '*':
        return '*';
      default:
        return 'MON-FRI';
    }
  }
}
