
import React from 'react';
import Ec2ModuleToggle from './compute/Ec2ModuleToggle';
import InstanceTypeSelector from './compute/InstanceTypeSelector';
import LambdaFunctionsConfig from './compute/LambdaFunctionsConfig';
import { Checkbox } from '@/components/ui/checkbox';
import { generateTfModuleCode, generateExampleLambdaCode, generateEc2ModuleCode } from './compute/TerraformCodeGenerator';

interface ComputeConfigProps {
  cloudProvider: string;
  onConfigChange: (field: string, value: any) => void;
}

const ComputeConfig: React.FC<ComputeConfigProps> = ({ cloudProvider, onConfigChange }) => {
  const [enableLambdaFunctions, setEnableLambdaFunctions] = React.useState(false);
  const [useTfModule, setUseTfModule] = React.useState(false);
  const [lambdaHclCode, setLambdaHclCode] = React.useState('');
  const [useEc2TfModule, setUseEc2TfModule] = React.useState(false);
  const [useAzureTfModule, setUseAzureTfModule] = React.useState(false);
  const [useWindowsVm, setUseWindowsVm] = React.useState(false);

  const handleEc2TfModuleToggle = (checked: boolean) => {
    setUseEc2TfModule(checked);
    onConfigChange('useEc2TfModule', checked);
    
    if (checked) {
      const moduleCode = generateEc2ModuleCode();
      onConfigChange('ec2ModuleCode', moduleCode);
    }
  };

  const handleAzureTfModuleToggle = (checked: boolean) => {
    setUseAzureTfModule(checked);
    onConfigChange('useAzureTfModule', checked);
    
    // Reset Windows VM checkbox when Azure module is disabled
    if (!checked) {
      setUseWindowsVm(false);
      onConfigChange('useWindowsVm', false);
    }
    
    if (checked) {
      // Generate Azure compute module code based on Windows VM selection
      const azureModuleCode = useWindowsVm ? generateAzureWindowsComputeModuleCode() : generateAzureComputeModuleCode();
      onConfigChange('azureModuleCode', azureModuleCode);
    }
  };

  const handleWindowsVmToggle = (checked: boolean) => {
    setUseWindowsVm(checked);
    onConfigChange('useWindowsVm', checked);
    
    if (useAzureTfModule) {
      // Regenerate Azure compute module code based on Windows VM selection
      const azureModuleCode = checked ? generateAzureWindowsComputeModuleCode() : generateAzureComputeModuleCode();
      onConfigChange('azureModuleCode', azureModuleCode);
    }
  };

  const handleLambdaToggle = (enabled: boolean) => {
    setEnableLambdaFunctions(enabled);
    onConfigChange('enableLambdaFunctions', enabled);
    if (enabled && !lambdaHclCode) {
      loadExampleLambdaCode();
    }
  };

  const handleTfModuleToggle = (checked: boolean) => {
    setUseTfModule(checked);
    onConfigChange('useTfModule', checked);
    
    if (checked) {
      const moduleCode = generateTfModuleCode();
      setLambdaHclCode(moduleCode);
      onConfigChange('lambdaHclCode', moduleCode);
    } else {
      loadExampleLambdaCode();
    }
  };

  const loadExampleLambdaCode = () => {
    const exampleCode = generateExampleLambdaCode();
    setLambdaHclCode(exampleCode);
    onConfigChange('lambdaHclCode', exampleCode);
  };

  const generateAzureComputeModuleCode = () => {
    return `# Azure Linux Virtual Machine using azurerm_linux_virtual_machine resource
resource "azurerm_linux_virtual_machine" "main" {
  name                = "\${var.project_name}-vm"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = var.instance_type
  admin_username      = "azureuser"

  disable_password_authentication = true

  network_interface_ids = [
    azurerm_network_interface.main.id,
  ]

  admin_ssh_key {
    username   = "azureuser"
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

  tags = merge(var.required_tags, {
    Environment = var.environment
    Application = var.project_name
    ManagedBy   = "terraform"
  })
}

# Network Interface for the VM
resource "azurerm_network_interface" "main" {
  name                = "\${var.project_name}-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.main.id
    private_ip_address_allocation = "Dynamic"
  }

  tags = var.required_tags
}

# Outputs for the Azure VM
output "vm_id" {
  description = "Virtual machine ID"
  value       = azurerm_linux_virtual_machine.main.id
}

output "vm_name" {
  description = "Virtual machine name"
  value       = azurerm_linux_virtual_machine.main.name
}

output "vm_private_ip" {
  description = "Virtual machine private IP address"
  value       = azurerm_network_interface.main.private_ip_address
}`;
  };

  const generateAzureWindowsComputeModuleCode = () => {
    return `# Azure Windows Virtual Machine using azurerm_windows_virtual_machine resource
resource "azurerm_windows_virtual_machine" "main" {
  name                = "\${var.project_name}-vm"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = var.instance_type
  admin_username      = "adminuser"
  admin_password      = var.admin_password

  network_interface_ids = [
    azurerm_network_interface.main.id,
  ]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
  }

  source_image_reference {
    publisher = "MicrosoftWindowsServer"
    offer     = "WindowsServer"
    sku       = "2022-Datacenter"
    version   = "latest"
  }

  tags = merge(var.required_tags, {
    Environment = var.environment
    Application = var.project_name
    ManagedBy   = "terraform"
  })
}

# Network Interface for the VM
resource "azurerm_network_interface" "main" {
  name                = "\${var.project_name}-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.main.id
    private_ip_address_allocation = "Dynamic"
  }

  tags = var.required_tags
}

# Outputs for the Azure Windows VM
output "vm_id" {
  description = "Virtual machine ID"
  value       = azurerm_windows_virtual_machine.main.id
}

output "vm_name" {
  description = "Virtual machine name"
  value       = azurerm_windows_virtual_machine.main.name
}

output "vm_private_ip" {
  description = "Virtual machine private IP address"
  value       = azurerm_network_interface.main.private_ip_address
}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Compute Configuration</h3>
        
        {cloudProvider === 'aws' && (
          <Ec2ModuleToggle
            useEc2TfModule={useEc2TfModule}
            onToggle={handleEc2TfModuleToggle}
          />
        )}

        {cloudProvider === 'azure' && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="azure-tf-module"
                checked={useAzureTfModule}
                onCheckedChange={handleAzureTfModuleToggle}
              />
              <label
                htmlFor="azure-tf-module"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use TF Module for Azure Compute?
              </label>
            </div>
            {useAzureTfModule && (
              <>
                <a
                  href="https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/linux_virtual_machine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 underline mb-2 block"
                >
                  Module Source
                </a>
                <div className="flex items-center space-x-2 ml-6">
                  <Checkbox
                    id="windows-vm"
                    checked={useWindowsVm}
                    onCheckedChange={handleWindowsVmToggle}
                  />
                  <label
                    htmlFor="windows-vm"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    for Windows VMs?
                  </label>
                </div>
              </>
            )}
          </div>
        )}

        <div className="space-y-3">
          <InstanceTypeSelector
            cloudProvider={cloudProvider}
            onInstanceTypeChange={(value) => onConfigChange('instanceType', value)}
          />

          {cloudProvider === 'aws' && (
            <LambdaFunctionsConfig
              enableLambdaFunctions={enableLambdaFunctions}
              useTfModule={useTfModule}
              onLambdaToggle={handleLambdaToggle}
              onTfModuleToggle={handleTfModuleToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComputeConfig;
