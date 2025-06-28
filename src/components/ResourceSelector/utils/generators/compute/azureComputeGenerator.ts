
export const generateAzureComputeResources = (selectedComputeTypes?: string[]): string => {
  let code = '';

  // Check if Linux VM is selected
  if (!selectedComputeTypes || selectedComputeTypes.includes('linux-vm')) {
    code += `# Azure Linux Virtual Machine
resource "azurerm_network_interface" "example" {
  name                = "\${var.naming_convention}-nic"
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.example.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.example.id
  }

  tags = var.default_tags
}

resource "azurerm_public_ip" "example" {
  name                = "\${var.naming_convention}-public-ip"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.default_region
  allocation_method   = "Static"
  sku                = "Standard"

  tags = var.default_tags
}

resource "azurerm_linux_virtual_machine" "example" {
  name                = "\${var.naming_convention}-vm"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.default_region
  size                = "Standard_B2s"
  admin_username      = "adminuser"

  disable_password_authentication = true

  network_interface_ids = [
    azurerm_network_interface.example.id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  tags = var.default_tags
}

`;
  }

  return code;
};
