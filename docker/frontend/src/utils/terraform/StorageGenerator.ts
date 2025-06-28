
import BaseGenerator from './BaseGenerator';

export default class StorageGenerator extends BaseGenerator {
  generateStorage(config: any): string {
    const bucketName = config?.name || 'storage-bucket';
    const useTfModule = config?.useTfModule || false;

    switch (this.cloudProvider) {
      case 'aws':
        if (useTfModule) {
          return `# S3 Bucket using Terraform AWS Module
module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 4.0"

  bucket = "\${var.project_name}-${bucketName}"
  
  # Bucket policies
  attach_elb_log_delivery_policy        = false
  attach_lb_log_delivery_policy         = false
  attach_access_log_delivery_policy     = false
  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true

  # S3 bucket-level Public Access Block configuration
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

  # S3 Bucket Ownership Controls
  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  expected_bucket_owner = data.aws_caller_identity.current.account_id

  # S3 bucket server-side encryption configuration
  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }

  # S3 bucket versioning
  versioning = {
    status     = true
    mfa_delete = false
  }

  # S3 bucket lifecycle configuration
  lifecycle_configuration = {
    rule = [
      {
        id     = "transition_to_ia"
        status = "Enabled"

        transition = [
          {
            days          = 30
            storage_class = "STANDARD_IA"
          },
          {
            days          = 90
            storage_class = "GLACIER"
          }
        ]
      }
    ]
  }

  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-${bucketName}"
    Type = "storage"
  })
}

# Required data source for expected_bucket_owner
data "aws_caller_identity" "current" {}

`;
        } else {
          return `# S3 Bucket with Enforced Tagging
resource "aws_s3_bucket" "main" {
  bucket = "\${var.project_name}-${bucketName}"
  tags   = merge(var.required_tags, {
    Name = "\${var.project_name}-${bucketName}"
    Type = "storage"
  })
  
  lifecycle {
    precondition {
      condition     = contains(keys(self.tags), "Project") && contains(keys(self.tags), "Environment")
      error_message = "All S3 buckets must have Project and Environment tags."
    }
  }
}

resource "aws_s3_bucket_versioning" "main" {
  bucket = aws_s3_bucket.main.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "main" {
  bucket = aws_s3_bucket.main.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Lifecycle policy for cost optimization
resource "aws_s3_bucket_lifecycle_configuration" "main" {
  bucket = aws_s3_bucket.main.id
  
  rule {
    id     = "transition_to_ia"
    status = "Enabled"
    
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    
    transition {
      days          = 90
      storage_class = "GLACIER"
    }
  }
}

`;
        }
      case 'azure':
        return `# Storage Account with Enforced Tagging
resource "azurerm_storage_account" "main" {
  name                     = replace("\${var.project_name}${bucketName}", "-", "")
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-storage"
    Type = "storage"
  })
  
  lifecycle {
    precondition {
      condition     = contains(keys(self.tags), "Project") && contains(keys(self.tags), "Environment")
      error_message = "All storage accounts must have Project and Environment tags."
    }
  }
}

resource "azurerm_storage_container" "main" {
  name                  = "${bucketName}"
  storage_account_name  = azurerm_storage_account.main.name
  container_access_type = "private"
}

`;
      case 'gcp':
        return `# Cloud Storage Bucket with Enforced Labeling
resource "google_storage_bucket" "main" {
  name     = "\${var.project_name}-${bucketName}"
  location = var.gcp_region
  
  uniform_bucket_level_access = true
  
  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type          = "SetStorageClass"
      storage_class = "NEARLINE"
    }
  }
  
  lifecycle_rule {
    condition {
      age = 90
    }
    action {
      type          = "SetStorageClass"
      storage_class = "COLDLINE"
    }
  }
  
  labels = merge(var.required_tags, {
    name = replace("\${var.project_name}-${bucketName}", "-", "_")
    type = "storage"
  })
  
  lifecycle {
    precondition {
      condition     = contains(keys(self.labels), "project") && contains(keys(self.labels), "environment")
      error_message = "All storage buckets must have project and environment labels."
    }
  }
}

`;
      default:
        return '';
    }
  }
}
