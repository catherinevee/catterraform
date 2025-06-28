
import DatabaseValidationUtils from './DatabaseValidationUtils';

export default class ValidationUtils {
  static validateHCL(code: string): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Basic syntax validation (immediate)
    const basicValidation = this.validateBasicHCLSyntax(code);
    errors.push(...basicValidation.errors);
    warnings.push(...basicValidation.warnings);

    // Note: Database validation is async, so we'll handle it separately in the component
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private static validateBasicHCLSyntax(code: string): { errors: string[]; warnings: string[] } {
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

    // Check for basic Terraform structure
    if (!code.trim()) {
      warnings.push('Empty HCL code');
      return { errors, warnings };
    }

    if (!code.includes('terraform') && !code.includes('provider') && !code.includes('resource')) {
      warnings.push('No Terraform blocks found in HCL code');
    }

    return { errors, warnings };
  }

  // Static method for database validation (async)
  static async validateWithDatabase(code: string): Promise<{ 
    isValid: boolean; 
    errors: string[]; 
    warnings: string[];
    info: string[];
    suggestions: string[];
  }> {
    try {
      return await DatabaseValidationUtils.validateHCL(code);
    } catch (error) {
      console.error('Database validation failed:', error);
      // Fallback to basic validation
      const basic = this.validateHCL(code);
      return {
        isValid: basic.isValid,
        errors: basic.errors,
        warnings: [...basic.warnings, 'Database validation unavailable'],
        info: [],
        suggestions: []
      };
    }
  }
}
