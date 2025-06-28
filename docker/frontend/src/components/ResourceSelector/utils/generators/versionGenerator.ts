
import { VersionConfig, MultiTenantConfig } from './types';

export const generateVersionsSection = (
  hasAws: boolean,
  hasAzure: boolean,
  versionConfig?: VersionConfig,
  multiTenantConfig?: MultiTenantConfig
): string => {
  // Versions section
  let versionsCode = `terraform {\n  required_version = "${versionConfig?.terraformVersion || '1.12'}"\n  required_providers {\n`;
  
  if (hasAws) {
    versionsCode += `    aws = {\n      source  = "hashicorp/aws"\n      version = "${versionConfig?.awsProviderVersion || '6.0.0'}"\n    }\n`;
  }
  if (hasAzure) {
    versionsCode += `    azurerm = {\n      source  = "hashicorp/azurerm"\n      version = "${versionConfig?.azureProviderVersion || '4.34'}"\n    }\n`;
  }
  versionsCode += `  }\n}\n\n`;
  
  // Provider configuration
  if (hasAws) {
    versionsCode += `provider "aws" {\n  region = var.aws_region\n}\n\n`;
  }
  if (hasAzure) {
    versionsCode += `provider "azurerm" {\n  features {}\n}\n\n`;
  }

  // Add multi-tenant provider blocks if enabled
  if (multiTenantConfig?.enabled && multiTenantConfig.aliasValuePairs.length > 0) {
    multiTenantConfig.aliasValuePairs.forEach(pair => {
      if (pair.value && pair.value.trim()) {
        if (hasAzure) {
          versionsCode += `provider "azurerm" {\n  alias = "${pair.value}"\n  features {}\n  use_msi = true\n  subscription_id = var.subscription_id_${pair.value}\n}\n\n`;
        }
        if (hasAws) {
          versionsCode += `provider "aws" {\n  alias = "${pair.value}"\n  region = var.aws_region\n  access_key = var.access_key\n  secret_key = var.secret_key\n}\n\n`;
        }
      }
    });
  }
  
  // Data sources
  if (hasAws) {
    versionsCode += `data "aws_availability_zones" "available" {\n  state = "available"\n}\n\n`;
    versionsCode += `data "aws_ami" "ubuntu" {\n  most_recent = true\n  owners      = ["099720109477"] # Canonical\n\n  filter {\n    name   = "name"\n    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]\n  }\n}\n\n`;
  }
  if (hasAzure) {
    versionsCode += `data "azurerm_client_config" "current" {}\n\n`;
  }

  return versionsCode;
};
