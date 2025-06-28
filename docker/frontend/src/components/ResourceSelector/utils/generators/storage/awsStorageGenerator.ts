
export const generateAwsStorageResources = (): string => {
  return `# AWS S3 Storage Resources

# Random suffix for unique bucket naming
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# S3 Bucket with comprehensive configuration
resource "aws_s3_bucket" "main" {
  bucket              = "\${var.naming_convention}-bucket-\${random_string.bucket_suffix.result}"
  bucket_prefix       = null
  force_destroy       = false
  object_lock_enabled = false

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-s3-bucket"
  })

  lifecycle {
    prevent_destroy = true
  }

  timeouts {
    create = "20m"
    read   = "20m"
    update = "20m"
    delete = "60m"
  }
}

# S3 Bucket Accelerate Configuration
resource "aws_s3_bucket_accelerate_configuration" "main" {
  bucket                = aws_s3_bucket.main.id
  status                = "Suspended"
  expected_bucket_owner = data.aws_caller_identity.current.account_id
}

# S3 Bucket ACL
resource "aws_s3_bucket_acl" "main" {
  bucket                = aws_s3_bucket.main.id
  acl                   = "private"
  expected_bucket_owner = data.aws_caller_identity.current.account_id

  depends_on = [aws_s3_bucket_ownership_controls.main]
}

# S3 Bucket Analytics Configuration
resource "aws_s3_bucket_analytics_configuration" "main" {
  bucket = aws_s3_bucket.main.id
  name   = "\${var.naming_convention}-analytics"

  filter {
    prefix = "documents/"
    tags = {
      priority = "high"
      class    = "blue"
    }
  }

  storage_class_analysis {
    data_export {
      destination {
        s3_bucket_destination {
          bucket_arn        = aws_s3_bucket.main.arn
          bucket_account_id = data.aws_caller_identity.current.account_id
          prefix            = "analytics-export/"
          format            = "CSV"
        }
      }
      output_schema_version = "V_1"
    }
  }
}

# S3 Bucket CORS Configuration
resource "aws_s3_bucket_cors_configuration" "main" {
  bucket                = aws_s3_bucket.main.id
  expected_bucket_owner = data.aws_caller_identity.current.account_id

  cors_rule {
    id                  = "cors-rule-1"
    allowed_headers     = ["*"]
    allowed_methods     = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    allowed_origins     = ["https://example.com"]
    expose_headers      = ["ETag", "x-amz-version-id"]
    max_age_seconds     = 3000
  }

  cors_rule {
    id              = "cors-rule-2"
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}

# S3 Bucket Intelligent Tiering Configuration
resource "aws_s3_bucket_intelligent_tiering_configuration" "main" {
  bucket = aws_s3_bucket.main.id
  name   = "\${var.naming_convention}-intelligent-tiering"
  status = "Enabled"

  filter {
    prefix = "documents/"
    tags = {
      priority = "high"
      class    = "blue"
    }
  }

  tiering {
    access_tier = "DEEP_ARCHIVE_ACCESS"
    days        = 180
  }

  tiering {
    access_tier = "ARCHIVE_ACCESS"
    days        = 90
  }

  optional_fields = ["BucketKeyStatus", "ChecksumAlgorithm"]
}

# S3 Bucket Inventory Configuration
resource "aws_s3_bucket_inventory" "main" {
  bucket                   = aws_s3_bucket.main.id
  name                     = "\${var.naming_convention}-inventory"
  included_object_versions = "Current"
  enabled                  = true

  schedule {
    frequency = "Daily"
  }

  destination {
    bucket {
      format     = "CSV"
      bucket_arn = aws_s3_bucket.main.arn
      prefix     = "inventory-results/"
      account_id = data.aws_caller_identity.current.account_id

      encryption {
        sse_s3 {}
      }
    }
  }

  filter {
    prefix = "documents/"
  }

  optional_fields = [
    "Size",
    "LastModifiedDate",
    "StorageClass",
    "ETag",
    "IsMultipartUploaded",
    "ReplicationStatus",
    "EncryptionStatus",
    "ObjectLockRetainUntilDate",
    "ObjectLockMode",
    "ObjectLockLegalHoldStatus",
    "IntelligentTieringAccessTier",
    "BucketKeyStatus",
    "ChecksumAlgorithm"
  ]
}

# S3 Bucket Lifecycle Configuration
resource "aws_s3_bucket_lifecycle_configuration" "main" {
  bucket                = aws_s3_bucket.main.id
  expected_bucket_owner = data.aws_caller_identity.current.account_id

  rule {
    id     = "transition-rule"
    status = "Enabled"

    filter {
      and {
        prefix = "documents/"
        tags = {
          rule      = "log"
          autoclean = "true"
        }
      }
    }

    expiration {
      days                         = 365
      expired_object_delete_marker = false
    }

    noncurrent_version_expiration {
      noncurrent_days           = 30
      newer_noncurrent_versions = 5
    }

    noncurrent_version_transition {
      noncurrent_days    = 30
      storage_class      = "STANDARD_IA"
      newer_noncurrent_versions = 5
    }

    noncurrent_version_transition {
      noncurrent_days    = 60
      storage_class      = "GLACIER"
      newer_noncurrent_versions = 5
    }

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 60
      storage_class = "GLACIER"
    }

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }

  rule {
    id     = "delete-markers-rule"
    status = "Enabled"

    expiration {
      expired_object_delete_marker = true
    }
  }
}

# S3 Bucket Logging Configuration
resource "aws_s3_bucket_logging" "main" {
  bucket                = aws_s3_bucket.main.id
  target_bucket         = aws_s3_bucket.main.id
  target_prefix         = "access-logs/"
  expected_bucket_owner = data.aws_caller_identity.current.account_id

  target_object_key_format {
    partitioned_prefix {
      partition_date_source = "EventTime"
    }
  }
}

# S3 Bucket Metric Configuration
resource "aws_s3_bucket_metric" "main" {
  bucket = aws_s3_bucket.main.id
  name   = "\${var.naming_convention}-metrics"

  filter {
    prefix = "documents/"
    tags = {
      priority = "high"
      class    = "blue"
    }
  }
}

# S3 Bucket Notification Configuration
resource "aws_s3_bucket_notification" "main" {
  bucket      = aws_s3_bucket.main.id
  eventbridge = true

  lambda_function {
    lambda_function_arn = aws_lambda_function.main.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "documents/"
    filter_suffix       = ".jpg"
  }

  queue {
    queue_arn     = aws_sqs_queue.main.arn
    events        = ["s3:ObjectCreated:*"]
    filter_prefix = "images/"
    filter_suffix = ".png"
  }

  topic {
    topic_arn     = aws_sns_topic.main.arn
    events        = ["s3:ObjectRemoved:*"]
    filter_prefix = "logs/"
    filter_suffix = ".log"
  }
}

# S3 Bucket Object Lock Configuration
resource "aws_s3_bucket_object_lock_configuration" "main" {
  bucket                = aws_s3_bucket.main.id
  expected_bucket_owner = data.aws_caller_identity.current.account_id
  object_lock_enabled   = "Enabled"

  rule {
    default_retention {
      mode  = "COMPLIANCE"
      days  = 30
      years = null
    }
  }
}

# S3 Bucket Ownership Controls
resource "aws_s3_bucket_ownership_controls" "main" {
  bucket = aws_s3_bucket.main.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# S3 Bucket Policy
resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.main.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "DenyInsecureConnections"
        Effect    = "Deny"
        Principal = "*"
        Action    = "s3:*"
        Resource = [
          aws_s3_bucket.main.arn,
          "\${aws_s3_bucket.main.arn}/*"
        ]
        Condition = {
          Bool = {
            "aws:SecureTransport" = "false"
          }
        }
      }
    ]
  })
}

# S3 Bucket Public Access Block
resource "aws_s3_bucket_public_access_block" "main" {
  bucket                  = aws_s3_bucket.main.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 Bucket Replication Configuration
resource "aws_s3_bucket_replication_configuration" "main" {
  role   = aws_iam_role.replication.arn
  bucket = aws_s3_bucket.main.id

  rule {
    id       = "replicate-everything"
    status   = "Enabled"
    priority = 10

    delete_marker_replication {
      status = "Enabled"
    }

    replica_modifications {
      status = "Enabled"
    }

    filter {
      prefix = "documents/"
    }

    destination {
      bucket             = aws_s3_bucket.replica.arn
      storage_class      = "STANDARD_IA"
      replica_kms_key_id = aws_kms_key.replica.arn
      account_id         = data.aws_caller_identity.current.account_id

      access_control_translation {
        owner = "Destination"
      }

      encryption_configuration {
        replica_kms_key_id = aws_kms_key.replica.arn
      }

      metrics {
        status = "Enabled"
        event_threshold {
          minutes = 15
        }
      }

      replication_time {
        status = "Enabled"
        time {
          minutes = 15
        }
      }
    }
  }

  depends_on = [aws_s3_bucket_versioning.main]
}

# S3 Bucket Request Payment Configuration
resource "aws_s3_bucket_request_payment_configuration" "main" {
  bucket                = aws_s3_bucket.main.id
  payer                 = "BucketOwner"
  expected_bucket_owner = data.aws_caller_identity.current.account_id
}

# S3 Bucket Server Side Encryption Configuration
resource "aws_s3_bucket_server_side_encryption_configuration" "main" {
  bucket                = aws_s3_bucket.main.id
  expected_bucket_owner = data.aws_caller_identity.current.account_id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.main.arn
      sse_algorithm     = "aws:kms"
    }
    bucket_key_enabled = true
  }
}

# S3 Bucket Versioning Configuration
resource "aws_s3_bucket_versioning" "main" {
  bucket                = aws_s3_bucket.main.id
  expected_bucket_owner = data.aws_caller_identity.current.account_id

  versioning_configuration {
    status     = "Enabled"
    mfa_delete = "Disabled"
  }
}

# S3 Bucket Website Configuration
resource "aws_s3_bucket_website_configuration" "main" {
  bucket                = aws_s3_bucket.main.id
  expected_bucket_owner = data.aws_caller_identity.current.account_id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }

  routing_rule {
    condition {
      key_prefix_equals = "docs/"
    }
    redirect {
      replace_key_prefix_with = "documents/"
    }
  }

  routing_rule {
    condition {
      http_error_code_returned_equals = "404"
      key_prefix_equals               = "archive/"
    }
    redirect {
      host_name          = "archive.example.com"
      http_redirect_code = "301"
      protocol           = "https"
      replace_key_with   = "not_found.html"
    }
  }
}

# Required AWS Caller Identity data source
data "aws_caller_identity" "current" {}

# KMS Key for S3 bucket encryption
resource "aws_kms_key" "main" {
  description             = "KMS key for S3 bucket encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-s3-kms-key"
  })
}

resource "aws_kms_alias" "main" {
  name          = "alias/\${var.naming_convention}-s3-key"
  target_key_id = aws_kms_key.main.key_id
}

# Replica bucket for replication (in different region)
resource "aws_s3_bucket" "replica" {
  provider = aws.replica
  bucket   = "\${var.naming_convention}-replica-bucket-\${random_string.bucket_suffix.result}"

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-s3-replica-bucket"
  })
}

# KMS Key for replica bucket
resource "aws_kms_key" "replica" {
  provider                = aws.replica
  description             = "KMS key for S3 replica bucket encryption"
  deletion_window_in_days = 7

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-s3-replica-kms-key"
  })
}

# IAM Role for S3 replication
resource "aws_iam_role" "replication" {
  name = "\${var.naming_convention}-s3-replication-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "s3.amazonaws.com"
        }
      },
    ]
  })

  tags = var.default_tags
}

resource "aws_iam_policy" "replication" {
  name = "\${var.naming_convention}-s3-replication-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetReplicationConfiguration",
          "s3:ListBucket",
        ]
        Effect = "Allow"
        Resource = [
          aws_s3_bucket.main.arn,
        ]
      },
      {
        Action = [
          "s3:GetObjectVersionForReplication",
          "s3:GetObjectVersionAcl",
          "s3:GetObjectVersionTagging",
        ]
        Effect = "Allow"
        Resource = [
          "\${aws_s3_bucket.main.arn}/*",
        ]
      },
      {
        Action = [
          "s3:ReplicateObject",
          "s3:ReplicateDelete",
          "s3:ReplicateTags",
        ]
        Effect = "Allow"
        Resource = "\${aws_s3_bucket.replica.arn}/*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "replication" {
  role       = aws_iam_role.replication.name
  policy_arn = aws_iam_policy.replication.arn
}

# Example Lambda function for S3 notifications
resource "aws_lambda_function" "main" {
  filename         = "lambda_function.zip"
  function_name    = "\${var.naming_convention}-s3-processor"
  role            = aws_iam_role.lambda.arn
  handler         = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime         = "python3.9"
  timeout         = 60

  tags = var.default_tags
}

# Lambda IAM role
resource "aws_iam_role" "lambda" {
  name = "\${var.naming_convention}-lambda-role"

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

  tags = var.default_tags
}

# Archive file for Lambda deployment
data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = "lambda_function.zip"
  source {
    content  = "def handler(event, context): return 'Hello from Lambda!'"
    filename = "index.py"
  }
}

# SQS Queue for S3 notifications
resource "aws_sqs_queue" "main" {
  name                       = "\${var.naming_convention}-s3-notifications"
  delay_seconds              = 0
  max_message_size           = 262144
  message_retention_seconds  = 1209600
  receive_wait_time_seconds  = 0
  visibility_timeout_seconds = 30

  tags = var.default_tags
}

# SNS Topic for S3 notifications
resource "aws_sns_topic" "main" {
  name = "\${var.naming_convention}-s3-notifications"

  tags = var.default_tags
}

# Provider alias for replication region
provider "aws" {
  alias  = "replica"
  region = "us-east-1"  # Different region for replication
}

`;
};
