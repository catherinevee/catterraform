
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AwsAccountDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-2 hover:opacity-90"
            style={{ borderColor: '#6653e3', color: '#6653e3' }}
          >
            AWS Account Configuration Example
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AWS Account Configuration Example</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>This template sets up:</strong><br/>
                • S3 bucket for Terraform state storage<br/>
                • DynamoDB table for state locking<br/>
                • KMS encryption for state files<br/>
                • Lifecycle policies for cost optimization
              </p>
            </div>
            
            <Tabs defaultValue="main" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="main">main.tf</TabsTrigger>
                <TabsTrigger value="backend">backend.tf</TabsTrigger>
                <TabsTrigger value="versions">versions.tf</TabsTrigger>
                <TabsTrigger value="resources">resources.tf</TabsTrigger>
                <TabsTrigger value="outputs">outputs.tf</TabsTrigger>
              </TabsList>
              
              <TabsContent value="main" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`# AWS Account Configuration
# This configuration sets up the necessary infrastructure for Terraform state management

# Include all resource definitions
module "terraform_state" {
  source = "./modules/terraform-state"
  
  bucket_name = var.bucket_name
  app_name    = var.app_name
}`}</pre>
                </div>
              </TabsContent>
              
              <TabsContent value="backend" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`resource "local_file" "state02" {
  filename        = "\${path.module}/../autogen_state.tf"
  file_permission = "0640"
  content         = <<EOF
terraform {
  backend "s3" {
    bucket         = "\${aws_s3_bucket.tf-state.id}"
    key            = "\${var.app_name}/app.tfstate"
    region         = "\${data.aws_region.current.name}"
    dynamodb_table = "\${aws_dynamodb_table.tf-state.id}"
    kms_key_id     = "\${aws_kms_alias.key-alias.id}"
    encrypt        = true
  }
}
EOF
}`}</pre>
                </div>
              </TabsContent>
              
              <TabsContent value="versions" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.97.0"
   }
  }
}`}</pre>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`data "aws_region" "current" {}

# S3 bucket to store terraform state
resource "aws_s3_bucket" "tf-state" {
  bucket = var.bucket_name
}

# KMS key to encrypt bucket objects
resource "aws_kms_key" "tf-bucket-key" {
  description             = "This key is used to encrypt bucket objects"
  deletion_window_in_days = 10
  enable_key_rotation     = true
}

# Alias of the KMS key for easier reference
resource "aws_kms_alias" "key-alias" {
  name          = "alias/tf-bucket-key"
  target_key_id = aws_kms_key.tf-bucket-key.key_id
}

# Block all public access to the S3 bucket holding our terraform state
resource "aws_s3_bucket_public_access_block" "tf-state" {
  bucket                  = aws_s3_bucket.tf-state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ACLs enabled
resource "aws_s3_bucket_ownership_controls" "tf-state" {
  bucket = aws_s3_bucket.tf-state.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# Enable versioning for bucket objects
resource "aws_s3_bucket_versioning" "tf-state" {
  bucket = aws_s3_bucket.tf-state.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Encrypt objects in the bucket
resource "aws_s3_bucket_server_side_encryption_configuration" "tf-state" {
  bucket = aws_s3_bucket.tf-state.id
  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.tf-bucket-key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

# Save money by transitioning old objects to cheaper storage
resource "aws_s3_bucket_lifecycle_configuration" "tf-state" {
  bucket = aws_s3_bucket.tf-state.id
  rule {
    id     = "archive"
    status = "Enabled"
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    transition {
      days          = 60
      storage_class = "GLACIER"
    }
  }
}

# Used for locking terraform state
resource "aws_dynamodb_table" "tf-state" {
  name         = "tf-state"
  hash_key     = "LockID"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "LockID"
    type = "S"
  }
}`}</pre>
                </div>
              </TabsContent>

              <TabsContent value="outputs" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`output "tf_state_kms_id" {
  description = "ID of the KMS key used to encrypt bucket objects"
  value       = aws_kms_key.tf-bucket-key.id
}

output "tf_state_kms_alias" {
  description = "Alias of the KMS key used to encrypt bucket objects"
  value       = aws_kms_alias.key-alias.id
}

output "tf_state_kms_arn" {
  description = "value of the ARN of the KMS key used to encrypt bucket objects"
  value       = aws_kms_key.tf-bucket-key.arn
}

output "tf_state_s3_bucket_id" {
  description = "Name (id) of the S3 bucket used to store the terraform state"
  value       = aws_s3_bucket.tf-state.id
}

output "tf_state_s3_bucket_arn" {
  description = "ARN of the S3 bucket used to store the terraform state"
  value       = aws_s3_bucket.tf-state.arn
}

output "tf_state_dynamodb_table_id" {
  description = "Name (id) of the DynamoDB table used to store the terraform state"
  value       = aws_dynamodb_table.tf-state.id
}

output "tf_state_dynamodb_table_arn" {
  description = "ARN of the DynamoDB table used to store the terraform state"
  value       = aws_dynamodb_table.tf-state.arn
}`}</pre>
                </div>
              </TabsContent>

              <TabsContent value="variables" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`variable "bucket_name" {
  type    = string
  description = "Name of the S3 bucket for storing Terraform state"
}

variable "app_name" {
  type    = string
  description = "This will be used throughout terraform to uniquely identify resources"
}`}</pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
