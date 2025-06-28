
import { CloudResourcesService } from "@/services/cloudResourcesService";

export default class DatabaseValidationUtils {
  static async validateHCL(code: string): Promise<{ 
    isValid: boolean; 
    errors: string[]; 
    warnings: string[];
    info: string[];
    suggestions: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const info: string[] = [];
    const suggestions: string[] = [];

    try {
      // Extract resource types from HCL code
      const resourceTypes = this.extractResourceTypes(code);
      
      if (resourceTypes.length === 0) {
        warnings.push('No cloud resources detected in the HCL code');
        return { isValid: true, errors, warnings, info, suggestions };
      }

      console.log('Validating resource types:', resourceTypes);

      // Detect provider(s)
      const provider = CloudResourcesService.detectProvider(resourceTypes);
      info.push(`Detected provider(s): ${provider}`);

      // Validate against database rules
      const validationResult = await CloudResourcesService.validateHclCode(code, resourceTypes);
      
      errors.push(...validationResult.errors);
      warnings.push(...validationResult.warnings);
      info.push(...validationResult.info);

      // Check if resource types exist in database
      for (const resourceType of resourceTypes) {
        const resource = await CloudResourcesService.getResourceByType(resourceType);
        if (!resource) {
          warnings.push(`Resource type '${resourceType}' not found in cloud resources database`);
          
          // Provide provider-specific documentation links
          if (resourceType.startsWith('aws_')) {
            suggestions.push(`Consider checking the AWS documentation for '${resourceType}' at https://registry.terraform.io/providers/hashicorp/aws/latest/docs`);
          } else if (resourceType.startsWith('azurerm_')) {
            suggestions.push(`Consider checking the Azure documentation for '${resourceType}' at https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs`);
          }
        } else {
          // Get resource arguments and validate required fields
          const resourceArgs = await CloudResourcesService.getResourceArguments(resource.id);
          const requiredArgs = resourceArgs.filter(arg => arg.required);
          
          for (const requiredArg of requiredArgs) {
            if (!code.includes(requiredArg.name)) {
              errors.push(`Required argument '${requiredArg.name}' missing for resource '${resourceType}'`);
            }
          }

          // Add suggestions based on available examples
          const examples = await CloudResourcesService.getResourceExamples(resource.id);
          if (examples.length > 0) {
            suggestions.push(`Check examples for '${resourceType}' in the database for best practices`);
          }
        }
      }

      // Basic HCL syntax validation
      const syntaxValidation = this.validateBasicSyntax(code);
      errors.push(...syntaxValidation.errors);
      warnings.push(...syntaxValidation.warnings);

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        info,
        suggestions
      };

    } catch (error) {
      console.error('Database validation error:', error);
      return {
        isValid: false,
        errors: ['Database validation service unavailable'],
        warnings: [],
        info: [],
        suggestions: ['Falling back to basic syntax validation']
      };
    }
  }

  private static extractResourceTypes(code: string): string[] {
    const resourcePattern = /resource\s+"([^"]+)"/g;
    const matches: string[] = [];
    let match;

    while ((match = resourcePattern.exec(code)) !== null) {
      if (match[1].startsWith('azurerm_') || match[1].startsWith('aws_')) {
        matches.push(match[1]);
      }
    }

    return [...new Set(matches)]; // Remove duplicates
  }

  private static validateBasicSyntax(code: string): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for balanced braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      errors.push('Unbalanced braces in HCL code');
    }

    // Check for balanced quotes
    const quotes = (code.match(/"/g) || []).length;
    if (quotes % 2 !== 0) {
      errors.push('Unbalanced quotes in HCL code');
    }

    // Check for basic structure
    if (!code.includes('resource')) {
      warnings.push('No resource blocks found in HCL code');
    }

    return { errors, warnings };
  }
}
