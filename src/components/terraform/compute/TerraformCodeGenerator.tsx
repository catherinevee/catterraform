
import React from 'react';

interface TerraformCodeGeneratorProps {
  useTfModule: boolean;
}

// Utility functions for generating Terraform code
export const generateTfModuleCode = () => {
  return `# Lambda function using Terraform AWS Lambda module
module "lambda_function" {
  source = "terraform-aws-modules/lambda/aws"
  version = "7.0"

  function_name = "\${var.project_name}-lambda-function"
  description   = "Lambda function for \${var.project_name}"
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  timeout       = 30
  memory_size   = 128

  source_path = "\${path.module}/lambda"

  environment_variables = {
    ENVIRONMENT = "production"
    LOG_LEVEL   = "info"
    PROJECT     = var.project_name
  }

  # IAM permissions
  attach_policy_statements = true
  policy_statements = {
    logs = {
      effect = "Allow"
      actions = [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
      resources = ["arn:aws:logs:*:*:*"]
    }
  }

  # CloudWatch Logs
  cloudwatch_logs_retention_in_days = 14

  tags = merge(var.required_tags, {
    Environment = "production"
    Application = var.project_name
    ManagedBy   = "terraform"
  })
}

# Outputs for the Lambda function
output "lambda_function_arn" {
  description = "The ARN of the Lambda Function"
  value       = module.lambda_function.lambda_function_arn
}

output "lambda_function_name" {
  description = "The name of the Lambda Function"
  value       = module.lambda_function.lambda_function_name
}

output "lambda_function_invoke_arn" {
  description = "The Invoke ARN of the Lambda Function"
  value       = module.lambda_function.lambda_function_invoke_arn
}`;
};

export const generateExampleLambdaCode = () => {
  return `# IAM role for Lambda execution
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_execution_role" {
  name               = "lambda_execution_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# Attach basic execution policy
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Package the Lambda function code
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "\${path.module}/lambda/index.js"
  output_path = "\${path.module}/lambda/function.zip"
}

# Lambda function
resource "aws_lambda_function" "example" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "example_lambda_function"
  role             = aws_iam_role.lambda_execution_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs20.x"
  timeout          = 30
  memory_size      = 128

  environment {
    variables = {
      ENVIRONMENT = "production"
      LOG_LEVEL   = "info"
    }
  }

  tags = {
    Environment = "production"
    Application = "example"
  }
}

# CloudWatch Log Group
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/example_lambda_function"
  retention_in_days = 14
}`;
};

export const generateEc2ModuleCode = () => {
  return `# EC2 Instance using Terraform AWS EC2 Instance module
module "ec2_instance" {
  source = "terraform-aws-modules/ec2-instance/aws"
  version = "5.0"

  name = "\${var.project_name}-instance"

  instance_type          = var.instance_type
  key_name               = var.key_name
  monitoring             = true
  vpc_security_group_ids = [aws_security_group.instance.id]
  subnet_id              = aws_subnet.private.id

  # EBS optimized and encrypted root volume
  ebs_optimized = true
  root_block_device = [
    {
      encrypted   = true
      volume_type = "gp3"
      throughput  = 200
      volume_size = var.compute_disk_size
      tags = {
        Name = "\${var.project_name}-root-volume"
      }
    },
  ]

  # Additional EBS volumes
  ebs_block_device = [
    {
      device_name = "/dev/sdf"
      volume_type = "gp3"
      volume_size = 20
      throughput  = 200
      encrypted   = true
      tags = {
        Name = "\${var.project_name}-data-volume"
      }
    }
  ]

  tags = merge(var.required_tags, {
    Environment = var.environment
    Application = var.project_name
    ManagedBy   = "terraform"
  })
}

# Security Group for EC2 instance
resource "aws_security_group" "instance" {
  name        = "\${var.project_name}-instance-sg"
  description = "Security group for EC2 instance"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_cidr != "" ? var.allowed_cidr : "10.0.0.0/8"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-instance-sg"
  })
}

# Outputs for the EC2 instance
output "instance_id" {
  description = "ID of the EC2 instance"
  value       = module.ec2_instance.id
}

output "instance_arn" {
  description = "ARN of the EC2 instance"
  value       = module.ec2_instance.arn
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = module.ec2_instance.public_ip
}

output "instance_private_ip" {
  description = "Private IP address of the EC2 instance"
  value       = module.ec2_instance.private_ip
}`;
};

// This is just for backward compatibility, not actually used as a React component
const TerraformCodeGenerator: React.FC<TerraformCodeGeneratorProps> = () => {
  return null;
};

export default TerraformCodeGenerator;
