
import BaseGenerator from '../BaseGenerator';

export default class AzureComputeGenerator extends BaseGenerator {
  generateAzureCompute(config: any): string {
    return `# Resource Group
resource "azurerm_resource_group" "main" {
  name     = "\${var.project_name}-rg"
  location = var.location
  tags     = var.required_tags
}

# Virtual Machine with Enforced Tagging
resource "azurerm_linux_virtual_machine" "main" {
  count               = var.compute_instance_count
  name                = "\${var.project_name}-vm-\${count.index + 1}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "${config?.instanceType || this.getDefaultInstanceType()}"
  admin_username      = "adminuser"
  
  disable_password_authentication = true
  
  network_interface_ids = [
    azurerm_network_interface.main[count.index].id,
  ]
  
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
    disk_size_gb         = var.compute_disk_size
  }
  
  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-vm-\${count.index + 1}"
    Type = "compute"
  })
  
  lifecycle {
    precondition {
      condition     = contains(keys(var.required_tags), "Project") && contains(keys(var.required_tags), "Environment") && contains(keys(var.required_tags), "Team") && contains(keys(var.required_tags), "Owner") && contains(keys(var.required_tags), "CostCenter") && contains(keys(var.required_tags), "ManagedBy") && contains(keys(var.required_tags), "CreatedDate")
      error_message = "Required tags must include 'Project', 'Environment', 'Team', 'Owner', 'CostCenter', 'ManagedBy', and 'CreatedDate' keys."
    }
  }
}

resource "azurerm_network_interface" "main" {
  count               = var.compute_instance_count
  name                = "\${var.project_name}-nic-\${count.index + 1}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  
  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.main.id
    private_ip_address_allocation = "Dynamic"
  }
  
  tags = var.required_tags
}

`;
  }
}
