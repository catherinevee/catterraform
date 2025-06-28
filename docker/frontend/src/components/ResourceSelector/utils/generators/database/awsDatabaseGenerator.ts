
export const generateAwsDynamoDbResources = (): string => {
  return `# AWS DynamoDB Table with comprehensive configuration
resource "aws_dynamodb_table" "main" {
  name             = "\${var.naming_convention}-dynamodb-table"
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "id"
  range_key        = "timestamp"
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"
  
  # Table class configuration
  table_class = "STANDARD"
  
  # Deletion protection
  deletion_protection_enabled = false
  
  # Attributes
  attribute {
    name = "id"
    type = "S"
  }
  
  attribute {
    name = "timestamp"
    type = "N"
  }
  
  attribute {
    name = "gsi1pk"
    type = "S"
  }
  
  attribute {
    name = "gsi1sk"
    type = "S"
  }
  
  attribute {
    name = "lsi1sk"
    type = "S"
  }
  
  # Global Secondary Index
  global_secondary_index {
    name            = "\${var.naming_convention}-gsi1"
    hash_key        = "gsi1pk"
    range_key       = "gsi1sk"
    projection_type = "ALL"
  }
  
  # Local Secondary Index
  local_secondary_index {
    name            = "\${var.naming_convention}-lsi1"
    range_key       = "lsi1sk"
    projection_type = "KEYS_ONLY"
  }
  
  # TTL configuration
  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }
  
  # Server-side encryption
  server_side_encryption {
    enabled     = true
    kms_key_id  = aws_kms_key.dynamodb.arn
  }
  
  # Point-in-time recovery
  point_in_time_recovery {
    enabled = true
  }
  
  # Replica configuration for global tables
  replica {
    region_name            = "us-east-1"
    kms_key_id            = aws_kms_key.dynamodb_replica.arn
    point_in_time_recovery = true
    
    global_secondary_index {
      name            = "\${var.naming_convention}-gsi1"
      projection_type = "ALL"
    }
  }
  
  # Import configuration
  import_table {
    input_compression_type = "GZIP"
    input_format          = "DYNAMODB_EXPORT"
    
    input_format_options {
      dynamodb {
        delimiter = ","
      }
    }
    
    s3_bucket_source {
      bucket                = aws_s3_bucket.dynamodb_import.id
      bucket_owner          = data.aws_caller_identity.current.account_id
      key_prefix           = "dynamodb-imports/"
    }
  }
  
  tags = var.default_tags
}

# KMS Key for DynamoDB encryption
resource "aws_kms_key" "dynamodb" {
  description             = "KMS key for DynamoDB table encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "Enable IAM User Permissions"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::\${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "Allow DynamoDB Service"
        Effect = "Allow"
        Principal = {
          Service = "dynamodb.amazonaws.com"
        }
        Action = [
          "kms:Decrypt",
          "kms:GenerateDataKey"
        ]
        Resource = "*"
      }
    ]
  })
  
  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-dynamodb-kms-key"
    Type = "encryption"
  })
}

# KMS Key Alias
resource "aws_kms_alias" "dynamodb" {
  name          = "alias/\${var.naming_convention}-dynamodb"
  target_key_id = aws_kms_key.dynamodb.key_id
}

# KMS Key for replica region
resource "aws_kms_key" "dynamodb_replica" {
  provider                = aws.replica
  description             = "KMS key for DynamoDB replica encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true
  
  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-dynamodb-replica-kms-key"
    Type = "encryption"
  })
}

# S3 Bucket for DynamoDB imports
resource "aws_s3_bucket" "dynamodb_import" {
  bucket = "\${var.naming_convention}-dynamodb-import-\${random_id.bucket_suffix.hex}"
  
  tags = merge(var.default_tags, {
    Name    = "\${var.naming_convention}-dynamodb-import"
    Purpose = "DynamoDB table imports"
  })
}

# S3 Bucket versioning
resource "aws_s3_bucket_versioning" "dynamodb_import" {
  bucket = aws_s3_bucket.dynamodb_import.id
  versioning_configuration {
    status = "Enabled"
  }
}

# S3 Bucket encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "dynamodb_import" {
  bucket = aws_s3_bucket.dynamodb_import.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.s3_dynamodb.arn
      sse_algorithm     = "aws:kms"
    }
    bucket_key_enabled = true
  }
}

# KMS Key for S3 bucket
resource "aws_kms_key" "s3_dynamodb" {
  description             = "KMS key for S3 bucket encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true
  
  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-s3-dynamodb-kms-key"
    Type = "encryption"
  })
}

# Random ID for unique bucket naming
resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# IAM Role for DynamoDB
resource "aws_iam_role" "dynamodb_role" {
  name = "\${var.naming_convention}-dynamodb-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "dynamodb.amazonaws.com"
        }
      }
    ]
  })
  
  tags = var.default_tags
}

# IAM Policy for DynamoDB operations
resource "aws_iam_role_policy" "dynamodb_policy" {
  name = "\${var.naming_convention}-dynamodb-policy"
  role = aws_iam_role.dynamodb_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem",
          "dynamodb:DescribeTable",
          "dynamodb:DescribeStream",
          "dynamodb:GetRecords",
          "dynamodb:GetShardIterator",
          "dynamodb:ListStreams"
        ]
        Resource = [
          aws_dynamodb_table.main.arn,
          "\${aws_dynamodb_table.main.arn}/*",
          "\${aws_dynamodb_table.main.arn}/stream/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "kms:Decrypt",
          "kms:GenerateDataKey"
        ]
        Resource = [
          aws_kms_key.dynamodb.arn
        ]
      }
    ]
  })
}

# CloudWatch Log Group for DynamoDB
resource "aws_cloudwatch_log_group" "dynamodb" {
  name              = "/aws/dynamodb/\${var.naming_convention}"
  retention_in_days = 7
  kms_key_id       = aws_kms_key.cloudwatch.arn
  
  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-dynamodb-logs"
    Type = "logging"
  })
}

# KMS Key for CloudWatch Logs
resource "aws_kms_key" "cloudwatch" {
  description             = "KMS key for CloudWatch logs encryption"
  deletion_window_in_days = 7
  enable_key_rotation     = true
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "Enable IAM User Permissions"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::\${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "Allow CloudWatch Logs"
        Effect = "Allow"
        Principal = {
          Service = "logs.\${var.default_region}.amazonaws.com"
        }
        Action = [
          "kms:Encrypt",
          "kms:Decrypt",
          "kms:ReEncrypt*",
          "kms:GenerateDataKey*",
          "kms:DescribeKey"
        ]
        Resource = "*"
      }
    ]
  })
  
  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-cloudwatch-kms-key"
    Type = "encryption"
  })
}

# Data source for current AWS account
data "aws_caller_identity" "current" {}

# Provider alias for replica region
provider "aws" {
  alias  = "replica"
  region = "us-east-1"
}

`;
};
