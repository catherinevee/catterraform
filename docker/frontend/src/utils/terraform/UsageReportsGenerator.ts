
import BaseGenerator from './BaseGenerator';

export default class UsageReportsGenerator extends BaseGenerator {
  generateUsageReports(): string {
    return `
# Cost and Usage Reports
resource "aws_s3_bucket" "cur_reports" {
  bucket = "\${var.project_name}-cost-usage-reports"
  
  tags = var.required_tags
}

resource "aws_s3_bucket_policy" "cur_reports" {
  bucket = aws_s3_bucket.cur_reports.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "billingreports.amazonaws.com"
        }
        Action = [
          "s3:GetBucketAcl",
          "s3:GetBucketPolicy"
        ]
        Resource = aws_s3_bucket.cur_reports.arn
      },
      {
        Effect = "Allow"
        Principal = {
          Service = "billingreports.amazonaws.com"
        }
        Action = "s3:PutObject"
        Resource = "\${aws_s3_bucket.cur_reports.arn}/*"
      }
    ]
  })
}

resource "aws_cur_report_definition" "main" {
  report_name                = "\${var.project_name}-usage-report"
  time_unit                  = "DAILY"
  format                     = "Parquet"
  compression                = "GZIP"
  additional_schema_elements = ["RESOURCES"]
  s3_bucket                  = aws_s3_bucket.cur_reports.bucket
  s3_prefix                  = "reports"
  s3_region                  = var.aws_region
  
  additional_artifacts = ["ATHENA"]
  
  tags = var.required_tags
}
`;
  }
}
