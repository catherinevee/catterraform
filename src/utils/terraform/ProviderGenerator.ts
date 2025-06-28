
import BaseGenerator from './BaseGenerator';

export default class ProviderGenerator extends BaseGenerator {
  generateTerraformBlock(): string {
    return `# Terraform Configuration Block
terraform {
  required_version = "1.12.2"
}

`;
  }

  generateProvider(): string {
    switch (this.cloudProvider) {
      case 'aws':
        return `# AWS Provider Configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.97.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

`;
      case 'azure':
        return `# Azure Provider Configuration
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.30.0"
    }
  }
}

provider "azurerm" {
  features {}
}

`;
      case 'gcp':
        return `# GCP Provider Configuration
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.13.0"
    }
  }
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

`;
      default:
        return '';
    }
  }

  generateVariables(projectName: string, resourceConfigs?: any): string {
    const namingConvention = resourceConfigs?.global?.namingConvention;
    const customNamingConvention = resourceConfigs?.global?.customNamingConvention;
    const selectedRegion = resourceConfigs?.global?.region;
    
    let sanitizedName: string;
    if (namingConvention === 'custom' && customNamingConvention) {
      sanitizedName = this.applyNamingConvention(projectName, namingConvention, customNamingConvention, resourceConfigs);
    } else {
      sanitizedName = this.applyNamingConvention(projectName, namingConvention, undefined, resourceConfigs) || projectName.toLowerCase().replace(/\s+/g, '-');
    }
    
    switch (this.cloudProvider) {
      case 'aws':
        const defaultRegion = selectedRegion || 'us-west-2';
        return `# Variables
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "${defaultRegion}"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "${sanitizedName}"
}

${namingConvention === 'custom' && customNamingConvention ? `variable "custom_naming_pattern" {
  description = "Custom naming pattern for resources"
  type        = string
  default     = "${customNamingConvention}"
}

` : ''}variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

`;
      case 'azure':
        const defaultLocation = selectedRegion || 'West US 2';
        return `# Variables
variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "${defaultLocation}"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "${sanitizedName}"
}

${namingConvention === 'custom' && customNamingConvention ? `variable "custom_naming_pattern" {
  description = "Custom naming pattern for resources"
  type        = string
  default     = "${customNamingConvention}"
}

` : ''}variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

`;
      case 'gcp':
        const defaultGcpRegion = selectedRegion || 'us-west1';
        return `# Variables
variable "gcp_project" {
  description = "GCP project ID"
  type        = string
}

variable "gcp_region" {
  description = "GCP region for resources"
  type        = string
  default     = "${defaultGcpRegion}"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "${sanitizedName}"
}

${namingConvention === 'custom' && customNamingConvention ? `variable "custom_naming_pattern" {
  description = "Custom naming pattern for resources"
  type        = string
  default     = "${customNamingConvention}"
}

` : ''}variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

`;
      default:
        return '';
    }
  }
}
