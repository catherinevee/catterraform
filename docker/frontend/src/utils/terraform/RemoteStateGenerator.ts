
import BaseGenerator from './BaseGenerator';

export default class RemoteStateGenerator extends BaseGenerator {
  generateRemoteState(config?: any): string {
    switch (this.cloudProvider) {
      case 'aws':
        return `# Remote State Configuration - S3 Backend with DynamoDB Lock
terraform {
  backend "s3" {
    bucket         = "terraform-state-bucket"
    key            = "terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-lock-table"
    encrypt        = true
  }
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "terraform-state-bucket"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "terraform_lock" {
  name           = "terraform-lock-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

`;
      case 'azure':
        const resourceGroupName = config?.resourceGroupName || 'polandcentralrg-1';
        const storageAccountName = config?.storageAccountName || 'tfstatecfriy';
        const containerName = config?.containerName || 'tfstate-container';
        const region = config?.region || 'polandcentral';
        const useOidc = config?.useOidc !== false; // default to true

        return `terraform {
  backend "azurerm" {
      resource_group_name  = "${resourceGroupName}"
      storage_account_name = "${storageAccountName}"
      container_name       = "${containerName}"
      ${useOidc ? 'use_oidc = true\n      use_azuread_auth = true\n      client_id = "catherinevee_manid"\n      tenant_id = var.AZURE_TENANT_ID\n      subscription_id = var.ARM_SUBSCRIPTION_ID' : ''}

  }
}

resource "azurerm_resource_group" "${resourceGroupName}" {
  name = "${resourceGroupName}"
  location = "${region}"
}

`;
      case 'gcp':
        return `# Remote State Configuration - GCS Backend
terraform {
  backend "gcs" {
    bucket  = "terraform-state-bucket"
    prefix  = "terraform/state"
  }
}

resource "google_storage_bucket" "terraform_state" {
  name     = "terraform-state-bucket"
  location = "US"
  
  versioning {
    enabled = true
  }
}

`;
      default:
        return '';
    }
  }

  generateTags(projectName: string): string {
    return '';
  }
}
