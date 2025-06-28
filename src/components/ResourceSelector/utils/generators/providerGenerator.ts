
export const generateProviderConfiguration = (
  selectedProviders: string[], 
  includeRemoteState?: boolean,
  multiTenantConfig?: { enabled: boolean; aliasValuePairs: { id: string; alias: string; value: string; }[] }
): string => {
  let code = '';
  
  if (selectedProviders.length > 0) {
    // Generate combined terraform block with all required providers
    code += `# Provider Configuration\nterraform {\n`;
    
    // Add backend configuration if AWS and Remote State are both selected
    if (selectedProviders.includes('aws') && includeRemoteState) {
      code += `  backend "s3" {
    bucket = "tfremotestate-ec2"
    key = "state"
    region = "eu-central-1"
    dynamodb_table = "tfremotestate-ec2"
  }
  
`;
    }
    
    code += `  required_providers {\n`;
    
    if (selectedProviders.includes('azurerm') || selectedProviders.includes('azure')) {
      code += `    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.34"
    }\n`;
    }
    
    if (selectedProviders.includes('aws')) {
      code += `    aws = {
      source  = "hashicorp/aws"
      version = "6.0.0"
    }\n`;
    }
    
    if (selectedProviders.includes('aws') || selectedProviders.includes('azurerm') || selectedProviders.includes('azure')) {
      code += `    random = {
      source  = "hashicorp/random"
      version = "3.1"
    }\n`;
    }
    
    code += `  }
}

`;

    // Add AWS credentials variables if both AWS and Remote State are selected
    if (selectedProviders.includes('aws') && includeRemoteState) {
      code += `# AWS Credentials Variables
variable "access_key" {
}

variable "secret_key" {
}

`;
    }

    // Generate provider blocks
    if (selectedProviders.includes('azurerm') || selectedProviders.includes('azure')) {
      code += `provider "azurerm" {
  features {}
}

`;

      // Add multi-tenant provider blocks for Azure
      if (multiTenantConfig?.enabled && multiTenantConfig.aliasValuePairs.length > 0) {
        multiTenantConfig.aliasValuePairs.forEach(pair => {
          if (pair.value.trim()) {
            code += `provider "azurerm" {
  alias = "${pair.value}"
  features {}  
  use_msi = true
}

`;
          }
        });
      }

      code += `data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "main" {
  name     = "\${var.naming_convention}-rg"
  location = var.default_region
  tags     = var.default_tags
}

`;
    }

    if (selectedProviders.includes('aws')) {
      code += `provider "aws" {
  region = var.default_region
}

`;

      // Add multi-tenant provider blocks for AWS
      if (multiTenantConfig?.enabled && multiTenantConfig.aliasValuePairs.length > 0) {
        multiTenantConfig.aliasValuePairs.forEach(pair => {
          if (pair.value.trim()) {
            code += `provider "aws" {
  alias = "${pair.value}"
  access_key = var.access_key
  secret_key = var.secret_key
}

`;
          }
        });
      }

      code += `data "aws_availability_zones" "available" {
  state = "available"
}

`;
    }
  }

  return code;
};
