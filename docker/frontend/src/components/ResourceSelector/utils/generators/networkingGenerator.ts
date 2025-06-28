import { generateAwsNetworkingResources } from './networking/awsNetworkingGenerator';

export const generateNetworkingResources = (selectedProviders: string[]): string => {
  let code = '';
  
  if (selectedProviders.includes('azure')) {
    code += `# DDoS Protection Plan
resource "azurerm_network_ddos_protection_plan" "main" {
  name                = "\${var.naming_convention}-ddos-protection"
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name
  
  tags = var.default_tags
}

resource "azurerm_virtual_network" "example" {
  # Required parameters
  name                = "\${var.naming_convention}-vnet"
  address_space       = ["10.0.0.0/16", "192.168.0.0/16"]
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name

  # Optional basic parameters
  dns_servers                = ["10.0.0.4", "10.0.0.5"]
  edge_zone                  = var.edge_zone
  flow_timeout_in_minutes    = 10
  bgp_community             = "12076:20001"

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
}

resource "azurerm_subnet" "example" {
  name                 = "\${var.naming_convention}-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_network_security_group" "example" {
  name                = "\${var.naming_convention}-nsg"
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

# Additional variable for edge zone configuration
variable "edge_zone" {
  description = "Edge Zone within the Azure Region"
  type        = string
  default     = null
}

`;
  }
  
  if (selectedProviders.includes('aws')) {
    code += generateAwsNetworkingResources();
  }

  return code;
};
