
import BaseGenerator from './BaseGenerator';

export default class ValidationGenerator extends BaseGenerator {
  generateValidationBlocks(selectedResources: string[], resourceConfigs: any): string {
    let validationCode = `# Validation Blocks for Resource Configuration
`;

    // Add validation for compute resources
    if (selectedResources.includes('compute')) {
      if (resourceConfigs.compute?.useEnvironmentConfigs) {
        // Environment-specific validation with variables moved from resources
        const environmentConfigs = resourceConfigs.compute?.environments?.map((env: any) => {
          return `    ${env.name} = {
      instance_type = "${env.instanceType}"
      min_size      = ${env.minSize}
      max_size      = ${env.maxSize}
      enable_spot   = ${env.enableSpot}
      storage_type  = "${env.storageType}"
      multi_az      = ${env.multiAz}
    }`;
        }).join('\n') || `    dev = {
      instance_type = "t3.micro"
      min_size      = 1
      max_size      = 3
      enable_spot   = true
      storage_type  = "gp3"
      multi_az      = false
    }`;

        validationCode += `
variable "environment_configs" {
  description = "Environment-specific configurations for cost optimization"
  type = map(object({
    instance_type = string
    min_size      = number
    max_size      = number
    enable_spot   = bool
    storage_type  = string
    multi_az      = bool
  }))
  default = {
${environmentConfigs}
  }
}

variable "selected_environment_config" {
  description = "Selected environment configuration"
  type = object({
    instance_type = string
    min_size      = number
    max_size      = number
    enable_spot   = bool
    storage_type  = string
    multi_az      = bool
  })
  default = null
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be one of: dev, staging, prod."
  }
}

variable "compute_disk_size" {
  description = "Disk size for compute instances in GB"
  type        = number
  default     = ${resourceConfigs.compute?.diskSize || 20}
  
  validation {
    condition     = var.compute_disk_size >= 8 && var.compute_disk_size <= 1000
    error_message = "Disk size must be between 8 GB and 1000 GB."
  }
}

variable "allowed_cidr" {
  description = "CIDR block allowed for SSH access"
  type        = string
  default     = ""
}
`;
      } else {
        // Single instance validation
        validationCode += `
variable "compute_instance_count" {
  description = "Number of compute instances to create"
  type        = number
  default     = ${resourceConfigs.compute?.count || 1}
  
  validation {
    condition     = var.compute_instance_count >= 1 && var.compute_instance_count <= 10
    error_message = "Instance count must be between 1 and 10."
  }
}

variable "compute_disk_size" {
  description = "Disk size for compute instances in GB"
  type        = number
  default     = ${resourceConfigs.compute?.diskSize || 20}
  
  validation {
    condition     = var.compute_disk_size >= 8 && var.compute_disk_size <= 1000
    error_message = "Disk size must be between 8 GB and 1000 GB."
  }
}
`;
      }
    }

    // Add validation for networking resources
    if (selectedResources.includes('networking')) {
      const vpcs = resourceConfigs.networking?.vpcs || [{ cidr: '10.0.0.0/16', publicSubnetCidr: '10.0.1.0/24' }];
      
      validationCode += `
variable "vpc_configurations" {
  description = "List of VPC configurations"
  type = list(object({
    name               = string
    cidr               = string
    publicSubnetCidr   = string
    privateSubnetCidr  = string
  }))
  default = [
${vpcs.map((vpc: any) => `    {
      name               = "${vpc.name || 'main-vpc'}"
      cidr               = "${vpc.cidr || '10.0.0.0/16'}"
      publicSubnetCidr   = "${vpc.publicSubnetCidr || '10.0.1.0/24'}"
      privateSubnetCidr  = "${vpc.privateSubnetCidr || '10.0.2.0/24'}"
    }`).join(',\n')}
  ]
  
  validation {
    condition     = length(var.vpc_configurations) >= 1 && length(var.vpc_configurations) <= 10
    error_message = "Number of VPCs must be between 1 and 10."
  }
}

variable "enable_transit_gateway" {
  description = "Enable Transit Gateway for VPC connectivity"
  type        = bool
  default     = ${resourceConfigs.networking?.transitGateway || false}
}
`;
    }

    // Add validation for database resources
    if (selectedResources.includes('database')) {
      validationCode += `
variable "db_backup_retention_period" {
  description = "Number of days to retain database backups"
  type        = number
  default     = ${resourceConfigs.database?.backupRetention || 7}
  
  validation {
    condition     = var.db_backup_retention_period >= 1 && var.db_backup_retention_period <= 35
    error_message = "Database backup retention period must be between 1 and 35 days."
  }
}
`;
    }

    // Add variables for tagging
    validationCode += `
variable "team_name" {
  description = "Name of the team responsible for the resources"
  type        = string
  default     = "infrastructure"
}

variable "owner_email" {
  description = "Email of the resource owner"
  type        = string
  default     = "admin@company.com"
}

variable "cost_center" {
  description = "Cost center for billing purposes"
  type        = string
  default     = "engineering"
}

variable "required_tags" {
  description = "Required tags for all resources"
  type        = map(string)
  default = {
    Project     = var.project_name
    Environment = var.environment
    Team        = var.team_name
    Owner       = var.owner_email
    CostCenter  = var.cost_center
    ManagedBy   = "terraform"
    CreatedDate = formatdate("YYYY-MM-DD", timestamp())
  }
  
  validation {
    condition     = contains(keys(var.required_tags), "Project") && contains(keys(var.required_tags), "Environment") && contains(keys(var.required_tags), "Team") && contains(keys(var.required_tags), "Owner") && contains(keys(var.required_tags), "CostCenter") && contains(keys(var.required_tags), "ManagedBy") && contains(keys(var.required_tags), "CreatedDate")
    error_message = "Required tags must include 'Project', 'Environment', 'Team', 'Owner', 'CostCenter', 'ManagedBy', and 'CreatedDate' keys."
  }
}
`;

    return validationCode + "\n";
  }
}
