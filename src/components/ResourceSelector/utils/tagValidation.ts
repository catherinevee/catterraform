
export const generateEnhancedCode = (baseCode: string, enforceTagging: boolean): string => {
  if (!enforceTagging || !baseCode) return baseCode;

  // Define required tags
  const requiredTags = ['environment', 'project', 'managed_by', 'owner', 'cost_center', 'application'];
  
  // Generate validation block for default_tags variable
  const tagValidationCode = `
variable "default_tags" {
  description = "Default tags to apply to all resources"
  type        = map(string)
  default = {
    environment = "production"
    project     = "terraform-generator"
    managed_by  = "terraform"
    owner       = "devops-team"
    cost_center = "engineering"
    application = "web-app"
  }

  validation {
    condition = ${requiredTags.map(tag => `contains(keys(var.default_tags), "${tag}")`).join(' &&\n      ')}
    error_message = "default_tags must include all required tags: ${requiredTags.join(', ')}."
  }
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
  
  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "Environment must be one of: development, staging, production."
  }
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "terraform-generator"
  
  validation {
    condition     = length(var.project_name) > 0 && length(var.project_name) <= 50
    error_message = "Project name must be between 1 and 50 characters."
  }
}

`;

  // Insert validation code after provider configuration but before resources
  const lines = baseCode.split('\n');
  const insertIndex = lines.findIndex(line => line.includes('resource "')) || lines.length;
  
  // Split the code and insert validation
  const beforeResources = lines.slice(0, insertIndex).join('\n');
  const resourcesAndAfter = lines.slice(insertIndex).join('\n');
  
  // Replace resource tags with validated tags
  const updatedResourcesCode = resourcesAndAfter.replace(
    /tags = \{[\s\S]*?\}/g,
    'tags = merge(var.default_tags, {\n    Name = "${var.project_name}-${var.environment}-resource"\n  })'
  );

  return beforeResources + tagValidationCode + updatedResourcesCode;
};
