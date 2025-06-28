
import { Resource } from '@/types/Resource';

export const generateOutputsSection = (selectedResourceData: Resource[]): string => {
  let outputsCode = `# Outputs\n`;
  
  selectedResourceData.forEach((resource, index) => {
    const resourceName = resource.type.replace(/^(aws_|azurerm_)/, '');
    const cleanName = resourceName.replace(/_/g, '-');
    outputsCode += `output "${cleanName}_${index + 1}_id" {\n  description = "ID of ${resource.type}"\n  value       = ${resource.type}.${cleanName}_${index + 1}.id\n}\n\n`;
  });

  return outputsCode;
};
