
import { 
  generateProviderConfiguration,
  generateNetworkingResources,
  generateStorageResources,
  generateComputeResources,
  generateDatabaseResources,
  generateIAMResources,
  generateCostManagementResources
} from './hclCodeGenerators';

// Inline remote state generator functionality
const generateRemoteStateResources = (selectedProviders: string[]): string => {
  let code = '';
  
  if (selectedProviders.includes('aws')) {
    code += `
# S3 bucket for Terraform state
resource "aws_s3_bucket" "terraform_state" {
  bucket = "terraform-state-\${random_string.bucket_suffix.result}"
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# DynamoDB table for state locking
resource "aws_dynamodb_table" "terraform_locks" {
  name           = "terraform-state-locks"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

`;
  }
  
  if (selectedProviders.includes('azure')) {
    code += `
# Storage account for Terraform state
resource "azurerm_storage_account" "terraform_state" {
  name                     = "tfstate\${random_string.storage_suffix.result}"
  resource_group_name      = azurerm_resource_group.example.name
  location                 = azurerm_resource_group.example.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  tags = var.default_tags
}

resource "azurerm_storage_container" "terraform_state" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.terraform_state.name
  container_access_type = "private"
}

resource "random_string" "storage_suffix" {
  length  = 8
  special = false
  upper   = false
}

`;
  }
  
  return code;
};

export const generateHCLCode = (
  selectedCategories: string[],
  selectedProviders: string[],
  selectedComputeTypes?: string[],
  multiTenantConfig?: { enabled: boolean; aliasValuePairs: { id: string; alias: string; value: string; }[] }
): string => {
  if (selectedCategories.length === 0 || selectedProviders.length === 0) {
    return '';
  }

  let code = '';
  
  const includeRemoteState = selectedCategories.some(cat => cat.toLowerCase() === 'remote state');
  
  // Add provider configurations with remote state backend if selected
  code += generateProviderConfiguration(selectedProviders, includeRemoteState, multiTenantConfig);

  // Generate resources based on selected categories
  selectedCategories.forEach(category => {
    switch (category.toLowerCase()) {
      case 'remote state':
        code += generateRemoteStateResources(selectedProviders);
        break;
      case 'networking':
        code += generateNetworkingResources(selectedProviders);
        break;
      case 'storage':
        code += generateStorageResources(selectedProviders);
        break;
      case 'compute':
        code += generateComputeResources(selectedProviders, selectedComputeTypes);
        break;
      case 'database':
        code += generateDatabaseResources(selectedProviders);
        break;
      case 'iam':
        code += generateIAMResources(selectedProviders);
        break;
      case 'cost':
      case 'billing':
      case 'cost/billing':
        code += generateCostManagementResources(selectedProviders);
        break;
    }
  });

  return code;
};
