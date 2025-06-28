
import BaseGenerator from '../BaseGenerator';

export default class AzureNetworkingGenerator extends BaseGenerator {
  generateAzureVirtualNetworks(vpcs: any[]): string {
    let resources = `# Multiple Virtual Networks with Enforced Tagging
`;

    vpcs.forEach((vnet: any, index: number) => {
      const vnetName = vnet.name || `vnet-${index + 1}`;
      resources += `
resource "azurerm_virtual_network" "${vnetName.replace(/-/g, '_')}" {
  # Required parameters
  name                = "\${var.naming_convention}-${vnetName}"
  address_space       = ["${vnet.cidr || `10.${index}.0.0/16`}", "192.168.${index}.0/16"]
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name

  # Optional basic parameters
  dns_servers                = ["10.${index}.0.4", "10.${index}.0.5"]
  edge_zone                  = var.edge_zone
  flow_timeout_in_minutes    = 10
  bgp_community             = "12076:2000${index + 1}"

  # Optional DDoS Protection Plan block
  ddos_protection_plan {
    id     = azurerm_network_ddos_protection_plan.main.id
    enable = true
  }

  # Optional Encryption block
  encryption {
    enforcement = "AllowUnencrypted"
  }

  # Tags from user-defined variables
  tags = var.default_tags
  
  lifecycle {
    precondition {
      condition     = contains(keys(self.tags), "environment") && contains(keys(self.tags), "project")
      error_message = "All virtual networks must have environment and project tags."
    }
  }
}

# Subnet for ${vnetName}
resource "azurerm_subnet" "${vnetName.replace(/-/g, '_')}_subnet" {
  name                 = "\${var.naming_convention}-${vnetName}-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.${vnetName.replace(/-/g, '_')}.name
  address_prefixes     = ["${vnet.publicSubnetCidr || `10.${index}.1.0/24`}"]
}

# Network Security Group for ${vnetName}
resource "azurerm_network_security_group" "${vnetName.replace(/-/g, '_')}_nsg" {
  name                = "\${var.naming_convention}-${vnetName}-nsg"
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name
  
  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
  
  tags = var.default_tags
}

# DDoS Protection Plan
resource "azurerm_network_ddos_protection_plan" "main" {
  name                = "\${var.naming_convention}-ddos-protection"
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name
  
  tags = var.default_tags
}
`;
    });

    return resources;
  }

  generateAzureVirtualHub(vpcs: any[]): string {
    let resources = `
# Virtual WAN and Hub for VNet connectivity
resource "azurerm_virtual_wan" "main" {
  name                = "\${var.naming_convention}-vwan"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.default_region
  
  tags = var.default_tags
}

resource "azurerm_virtual_hub" "main" {
  name                = "\${var.naming_convention}-vhub"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.default_region
  virtual_wan_id      = azurerm_virtual_wan.main.id
  address_prefix      = "192.168.1.0/24"
  
  tags = var.default_tags
}

# Virtual Hub Connections
`;
    
    vpcs.forEach((vnet: any, index: number) => {
      const vnetName = vnet.name || `vnet-${index + 1}`;
      resources += `
resource "azurerm_virtual_hub_connection" "${vnetName.replace(/-/g, '_')}_connection" {
  name                      = "\${var.naming_convention}-${vnetName}-connection"
  virtual_hub_id            = azurerm_virtual_hub.main.id
  remote_virtual_network_id = azurerm_virtual_network.${vnetName.replace(/-/g, '_')}.id
}
`;
    });

    return resources;
  }
}
