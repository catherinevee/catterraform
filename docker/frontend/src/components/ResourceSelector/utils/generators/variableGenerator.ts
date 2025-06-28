
import { MultiTenantConfig } from './types';

export const generateVariablesSection = (
  hasAws: boolean,
  hasAzure: boolean,
  userDefinedVariables?: string,
  multiTenantConfig?: MultiTenantConfig
): string => {
  let variablesCode = `# Variables\n`;
  
  // Add user-defined variables first if they exist
  if (userDefinedVariables && userDefinedVariables.trim()) {
    // Always enhance the user-defined variables with validation
    variablesCode += `# User-Defined Variables\n${enhanceTaggingValidation(userDefinedVariables.trim())}\n\n`;
  }
  
  if (hasAws) {
    variablesCode += `variable "aws_region" {\n  description = "AWS region"\n  type        = string\n  default     = "us-west-2"\n}\n\n`;
    
    // Add AWS credentials variables if multi-tenant is enabled
    if (multiTenantConfig?.enabled && multiTenantConfig.aliasValuePairs.some(pair => pair.value && pair.value.trim())) {
      variablesCode += `variable "access_key" {\n  description = "AWS access key"\n  type        = string\n  sensitive   = true\n}\n\nvariable "secret_key" {\n  description = "AWS secret key"\n  type        = string\n  sensitive   = true\n}\n\n`;
    }
  }
  
  if (hasAzure) {
    variablesCode += `variable "resource_group_name" {\n  description = "Name of the resource group"\n  type        = string\n  default     = "example-rg"\n}\n\nvariable "location" {\n  description = "Azure location"\n  type        = string\n  default     = "East US"\n}\n\n`;
    
    // Add subscription ID variables for each alias if multi-tenant is enabled
    if (multiTenantConfig?.enabled && multiTenantConfig.aliasValuePairs.length > 0) {
      multiTenantConfig.aliasValuePairs.forEach(pair => {
        if (pair.value && pair.value.trim()) {
          variablesCode += `variable "subscription_id_${pair.value}" {\n  description = "Azure subscription ID for ${pair.value}"\n  type        = string\n}\n\n`;
        }
      });
    }
  }

  return variablesCode;
};

const enhanceTaggingValidation = (userDefinedVariables: string): string => {
  // Extract default tags from user-defined variables to get the required tag keys
  const defaultTagsMatch = userDefinedVariables.match(/variable "default_tags"[\s\S]*?default = \{([\s\S]*?)\}/);
  let requiredTags: string[] = [];
  
  if (defaultTagsMatch && defaultTagsMatch[1]) {
    const tagsContent = defaultTagsMatch[1];
    const tagMatches = tagsContent.match(/(\w+)\s*=/g);
    if (tagMatches) {
      requiredTags = tagMatches.map(match => match.replace(/\s*=/, '').trim());
    }
  }
  
  // If no tags found in user variables, use default required tags
  if (requiredTags.length === 0) {
    requiredTags = ['environment', 'project', 'managed_by', 'owner', 'cost_center', 'application'];
  }

  // Add validation directly to the default_tags variable if it exists in user-defined variables
  if (userDefinedVariables.includes('variable "default_tags"')) {
    // Replace the existing default_tags variable with one that includes validation
    const validationConditions = requiredTags.map(tag => `contains(keys(var.default_tags), "${tag}")`).join(' &&\n      ');
    const tagList = requiredTags.join(', ');
    
    // Extract the existing default_tags variable and add validation to it
    const updatedUserVariables = userDefinedVariables.replace(
      /variable "default_tags" \{\s*type = map\(string\)\s*default = \{[\s\S]*?\}\s*\}/,
      `variable "default_tags" {\n  description = "Default tags to apply to all resources"\n  type        = map(string)\n  default = {\n    environment = "production"\n    project = "terraform-generator"\n    managed_by = "terraform"\n    owner = "devops-team"\n    cost_center = "engineering"\n    application = "web-app"\n  }\n\n  validation {\n    condition = ${validationConditions}\n    error_message = "default_tags must include all required tags: ${tagList}."\n  }\n}`
    );
    
    return updatedUserVariables;
  }

  return userDefinedVariables;
};
