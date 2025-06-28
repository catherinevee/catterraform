
import BaseGenerator from './BaseGenerator';

export default class OutputGenerator extends BaseGenerator {
  generateOutputs(): string {
    switch (this.cloudProvider) {
      case 'aws':
        return `# Outputs
output "vpc_ids" {
  description = "IDs of the VPCs"
  value       = { for k, v in aws_vpc : k => v.id }
}

output "transit_gateway_id" {
  description = "ID of the Transit Gateway"
  value       = try(aws_ec2_transit_gateway.main.id, null)
}

output "instance_ids" {
  description = "IDs of the EC2 instances"
  value       = try(aws_instance.main[*].id, [])
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = try(aws_s3_bucket.main.bucket, null)
}

`;
      case 'azure':
        return `# Outputs
output "resource_group_name" {
  description = "Name of the resource group"
  value       = try(azurerm_resource_group.main.name, null)
}

output "vnet_ids" {
  description = "IDs of the virtual networks"
  value       = { for k, v in azurerm_virtual_network : k => v.id }
}

output "virtual_hub_id" {
  description = "ID of the Virtual Hub"
  value       = try(azurerm_virtual_hub.main.id, null)
}

output "vm_ids" {
  description = "IDs of the virtual machines"
  value       = try(azurerm_linux_virtual_machine.main[*].id, [])
}

output "storage_account_name" {
  description = "Name of the storage account"
  value       = try(azurerm_storage_account.main.name, null)
}

`;
      case 'gcp':
        return `# Outputs
output "network_names" {
  description = "Names of the VPC networks"
  value       = { for k, v in google_compute_network : k => v.name }
}

output "instance_names" {
  description = "Names of the compute instances"
  value       = try(google_compute_instance.main[*].name, [])
}

output "storage_bucket_name" {
  description = "Name of the storage bucket"
  value       = try(google_storage_bucket.main.name, null)
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
