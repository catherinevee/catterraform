
import { Resource } from '@/types/Resource';
import { CodeSections, VersionConfig, MultiTenantConfig } from './generators/types';
import { generateVersionsSection } from './generators/versionGenerator';
import { generateVariablesSection } from './generators/variableGenerator';
import { generateResourcesSection } from './generators/resourceGenerator';
import { generateOutputsSection } from './generators/outputGenerator';

// Re-export types for backward compatibility
export type { VersionConfig, MultiTenantConfig, CodeSections };

export const generateCodeSections = (
  selectedResources: string[],
  resources: Resource[],
  versionConfig?: VersionConfig,
  userDefinedVariables?: string,
  multiTenantConfig?: MultiTenantConfig,
  removeOptionalParameters?: boolean
): CodeSections => {
  const selectedResourceData = resources.filter(r => selectedResources.includes(r.type));
  
  const hasAws = selectedResourceData.some(r => r.type.startsWith('aws_'));
  const hasAzure = selectedResourceData.some(r => r.type.startsWith('azurerm_'));
  
  // Generate sections using dedicated generators
  const versionsCode = generateVersionsSection(hasAws, hasAzure, versionConfig, multiTenantConfig);
  const variablesCode = generateVariablesSection(hasAws, hasAzure, userDefinedVariables, multiTenantConfig);
  const resourcesCode = generateResourcesSection(selectedResourceData, hasAzure, removeOptionalParameters);
  const outputsCode = generateOutputsSection(selectedResourceData);
  
  // Full code
  const fullCode = `# Terraform configuration for ${selectedResources.length} resources\n\n${versionsCode}${variablesCode}${resourcesCode}${outputsCode}`;
  
  return {
    versions: versionsCode,
    variables: variablesCode,
    resources: resourcesCode,
    outputs: outputsCode,
    full: fullCode
  };
};
