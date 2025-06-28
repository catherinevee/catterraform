
import { Resource } from '@/types/Resource';
import { getRequiredParameters } from '../resourceParameters';
import { removeOptionalParameters } from '../parameterUtils';

export const generateResourcesSection = (
  selectedResourceData: Resource[],
  hasAzure: boolean,
  removeOptional?: boolean
): string => {
  let resourcesCode = '';
  
  // Add resource group for Azure resources
  if (hasAzure) {
    resourcesCode += `resource "azurerm_resource_group" "example" {\n  name     = var.resource_group_name\n  location = var.location\n\n  tags = var.default_tags\n}\n\n`;
  }
  
  // Generate individual resources
  selectedResourceData.forEach((resource, index) => {
    const resourceName = resource.type.replace(/^(aws_|azurerm_)/, '');
    const cleanName = resourceName.replace(/_/g, '-');
    
    resourcesCode += `# ${resource.type} - ${resource.description}\n`;
    resourcesCode += `resource "${resource.type}" "${cleanName}_${index + 1}" {\n`;
    resourcesCode += `  name = "example-${cleanName}-${index + 1}"\n`;
    
    if (resource.type.startsWith('azurerm_')) {
      resourcesCode += `  resource_group_name = azurerm_resource_group.example.name\n`;
      resourcesCode += `  location            = azurerm_resource_group.example.location\n`;
    }
    
    // Add specific required parameters
    resourcesCode += `\n${getRequiredParameters(resource.type)}\n\n`;
    resourcesCode += `  # Refer to: ${resource.docs_url}\n\n`;
    
    // Always use default_tags
    resourcesCode += `  tags = var.default_tags\n`;
    resourcesCode += `}\n\n`;
  });

  // Remove optional parameters if requested
  if (removeOptional) {
    resourcesCode = removeOptionalParameters(resourcesCode);
  }

  return resourcesCode;
};
