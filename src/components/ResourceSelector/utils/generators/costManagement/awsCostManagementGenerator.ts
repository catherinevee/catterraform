
export const generateAwsCostManagementResources = (): string => {
  return `# AWS Cost Management and Billing Resources

# Cost Anomaly Monitor
resource "aws_ce_anomaly_monitor" "main" {
  name         = "\${var.naming_convention}-anomaly-monitor"
  monitor_type = "DIMENSIONAL"
  
  specification = jsonencode({
    Dimension = {
      Key           = "SERVICE"
      Values        = ["EC2-Instance", "RDS"]
      MatchOptions  = ["EQUALS"]
    }
  })

  tags = var.default_tags
}

# Cost Anomaly Subscription
resource "aws_ce_anomaly_subscription" "main" {
  name      = "\${var.naming_convention}-anomaly-subscription"
  frequency = "DAILY"
  
  monitor_arn_list = [
    aws_ce_anomaly_monitor.main.arn
  ]
  
  subscriber {
    type    = "EMAIL"
    address = "admin@company.com"
  }

  threshold_expression {
    and {
      dimension {
        key           = "ANOMALY_TOTAL_IMPACT_ABSOLUTE"
        values        = ["100"]
        match_options = ["GREATER_THAN_OR_EQUAL"]
      }
    }
  }

  tags = var.default_tags
}

# Cost Allocation Tag
resource "aws_ce_cost_allocation_tag" "environment" {
  tag_key = "Environment"
  status  = "Active"
}

resource "aws_ce_cost_allocation_tag" "project" {
  tag_key = "Project"
  status  = "Active"
}

resource "aws_ce_cost_allocation_tag" "cost_center" {
  tag_key = "CostCenter"
  status  = "Active"
}

# Cost Category
resource "aws_ce_cost_category" "main" {
  name         = "\${var.naming_convention}-cost-category"
  rule_version = "CostCategoryExpression.v1"
  
  rule {
    value = "Development"
    rule {
      dimension {
        key           = "LINKED_ACCOUNT"
        values        = ["123456789012"]
        match_options = ["EQUALS"]
      }
    }
    type = "REGULAR"
  }

  rule {
    value = "Production"
    rule {
      dimension {
        key           = "LINKED_ACCOUNT"
        values        = ["123456789013"]
        match_options = ["EQUALS"]
      }
    }
    type = "REGULAR"
  }

  rule {
    value = "Staging"
    rule {
      dimension {
        key           = "LINKED_ACCOUNT"
        values        = ["123456789014"]
        match_options = ["EQUALS"]
      }
    }
    type = "REGULAR"
  }

  default_value = "Other"
  
  split_charge_rule {
    method = "PROPORTIONAL"
    source = "LINKED_ACCOUNT"
    targets = ["123456789012", "123456789013"]
    
    parameter {
      key    = "SPLIT_COST_DATA"
      values = ["SHARED_SERVICES"]
    }
  }

  tags = var.default_tags
}

# Budgets
resource "aws_budgets_budget" "monthly" {
  name          = "\${var.naming_convention}-monthly-budget"
  budget_type   = "COST"
  limit_amount  = "1000"
  limit_unit    = "USD"
  time_unit     = "MONTHLY"
  time_period_start = "2024-01-01_00:00"
  time_period_end   = "2087-06-15_00:00"

  cost_filters = {
    Service = ["Amazon Elastic Compute Cloud - Compute"]
  }

  cost_filter {
    name   = "LinkedAccount"
    values = [data.aws_caller_identity.current.account_id]
  }

  cost_filter {
    name   = "TagKey"
    values = ["Environment"]
  }

  cost_filter {
    name   = "Region"
    values = [var.default_region]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                 = 80
    threshold_type            = "PERCENTAGE"
    notification_type         = "ACTUAL"
    subscriber_email_addresses = ["admin@company.com"]
    subscriber_sns_topic_arns   = []
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                 = 100
    threshold_type            = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = ["admin@company.com"]
    subscriber_sns_topic_arns   = []
  }

  auto_adjust_data {
    auto_adjust_type                = "HISTORICAL"
    historical_options {
      budget_adjustment_period     = 1
      lookback_available_periods   = 60
    }
  }

  planned_limit {
    start_time = "2024-01-01_00:00"
    amount     = "500"
    unit       = "USD"
  }

  planned_limit {
    start_time = "2024-07-01_00:00"
    amount     = "1500"
    unit       = "USD"
  }

  tags = var.default_tags
}

# Cost and Usage Report
resource "aws_cur_report_definition" "main" {
  report_name                = "\${var.naming_convention}-cost-usage-report"
  time_unit                  = "DAILY"
  format                     = "textORcsv"
  compression                = "GZIP"
  s3_bucket                  = aws_s3_bucket.cost_reports.bucket
  s3_prefix                  = "cost-reports/"
  s3_region                  = var.default_region
  additional_schema_elements = ["RESOURCES"]
  additional_artifacts       = ["REDSHIFT", "QUICKSIGHT"]
  refresh_closed_reports     = true
  report_versioning         = "OVERWRITE_REPORT"
}

# S3 Bucket for Cost Reports
resource "aws_s3_bucket" "cost_reports" {
  bucket        = "\${var.naming_convention}-cost-reports-\${random_string.bucket_suffix.result}"
  force_destroy = true

  tags = var.default_tags
}

resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "aws_s3_bucket_versioning" "cost_reports" {
  bucket = aws_s3_bucket.cost_reports.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_encryption" "cost_reports" {
  bucket = aws_s3_bucket.cost_reports.id

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
      bucket_key_enabled = true
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "cost_reports" {
  bucket = aws_s3_bucket.cost_reports.id

  rule {
    id     = "cost_reports_lifecycle"
    status = "Enabled"

    expiration {
      days = 365
    }

    noncurrent_version_expiration {
      noncurrent_days = 30
    }

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }
}

resource "aws_s3_bucket_policy" "cost_reports" {
  bucket = aws_s3_bucket.cost_reports.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCURDelivery"
        Effect = "Allow"
        Principal = {
          Service = "billingreports.amazonaws.com"
        }
        Action = [
          "s3:GetBucketAcl",
          "s3:GetBucketPolicy"
        ]
        Resource = aws_s3_bucket.cost_reports.arn
        Condition = {
          StringEquals = {
            "aws:SourceArn"    = "arn:aws:cur:us-east-1:\${data.aws_caller_identity.current.account_id}:definition/*"
            "aws:SourceAccount" = data.aws_caller_identity.current.account_id
          }
        }
      },
      {
        Sid    = "AllowCURPutObject"
        Effect = "Allow"
        Principal = {
          Service = "billingreports.amazonaws.com"
        }
        Action   = "s3:PutObject"
        Resource = "\${aws_s3_bucket.cost_reports.arn}/*"
        Condition = {
          StringEquals = {
            "aws:SourceArn"    = "arn:aws:cur:us-east-1:\${data.aws_caller_identity.current.account_id}:definition/*"
            "aws:SourceAccount" = data.aws_caller_identity.current.account_id
          }
        }
      }
    ]
  })
}

# Data source for current AWS account
data "aws_caller_identity" "current" {}

`;
};
