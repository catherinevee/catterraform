
import { supabase } from "@/integrations/supabase/client";

export interface CloudResource {
  id: string;
  type: string;
  category: string;
  description: string;
  docs_url: string;
}

export interface ResourceArgument {
  id: string;
  resource_id: string;
  name: string;
  type: string;
  required: boolean;
  description: string;
  validation: any;
}

export interface HclExample {
  id: string;
  resource_id: string;
  name: string;
  code: string;
  tags: string[];
}

export interface ValidationRule {
  id: string;
  name: string;
  type: string;
  pattern: string | null;
  message: string;
  severity: string;
  applies_to: string[];
}

export class CloudResourcesService {
  // Get resources by provider (azure or aws)
  static async getResourcesByProvider(provider: 'azure' | 'aws'): Promise<CloudResource[]> {
    const typePrefix = provider === 'azure' ? 'azurerm_' : 'aws_';
    
    const { data, error } = await supabase
      .from('azure_resources')
      .select('*')
      .like('type', `${typePrefix}%`)
      .order('category', { ascending: true })
      .order('type', { ascending: true });

    if (error) {
      console.error(`Error fetching ${provider} resources:`, error);
      throw error;
    }

    return data || [];
  }

  // Get resources by category and provider
  static async getResourcesByCategoryAndProvider(category: string, provider: 'azure' | 'aws'): Promise<CloudResource[]> {
    const typePrefix = provider === 'azure' ? 'azurerm_' : 'aws_';
    
    const { data, error } = await supabase
      .from('azure_resources')
      .select('*')
      .eq('category', category)
      .like('type', `${typePrefix}%`)
      .order('type');

    if (error) {
      console.error(`Error fetching ${provider} resources by category:`, error);
      throw error;
    }

    return data || [];
  }

  // Get all resources (both Azure and AWS)
  static async getAllResources(): Promise<CloudResource[]> {
    const { data, error } = await supabase
      .from('azure_resources')
      .select('*')
      .order('category', { ascending: true })
      .order('type', { ascending: true });

    if (error) {
      console.error('Error fetching all resources:', error);
      throw error;
    }

    return data || [];
  }

  // Get resource by type
  static async getResourceByType(type: string): Promise<CloudResource | null> {
    const { data, error } = await supabase
      .from('azure_resources')
      .select('*')
      .eq('type', type)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching resource:', error);
      throw error;
    }

    return data || null;
  }

  // Get arguments for a resource
  static async getResourceArguments(resourceId: string): Promise<ResourceArgument[]> {
    const { data, error } = await supabase
      .from('resource_arguments')
      .select('*')
      .eq('resource_id', resourceId)
      .order('required', { ascending: false })
      .order('name');

    if (error) {
      console.error('Error fetching resource arguments:', error);
      throw error;
    }

    return data || [];
  }

  // Get HCL examples for a resource
  static async getResourceExamples(resourceId: string): Promise<HclExample[]> {
    const { data, error } = await supabase
      .from('hcl_examples')
      .select('*')
      .eq('resource_id', resourceId)
      .order('name');

    if (error) {
      console.error('Error fetching HCL examples:', error);
      throw error;
    }

    return data || [];
  }

  // Get validation rules that apply to a resource type
  static async getValidationRules(resourceType: string): Promise<ValidationRule[]> {
    const { data, error } = await supabase
      .from('validation_rules')
      .select('*')
      .contains('applies_to', [resourceType])
      .order('severity', { ascending: true })
      .order('name');

    if (error) {
      console.error('Error fetching validation rules:', error);
      throw error;
    }

    return data || [];
  }

  // Get all validation rules
  static async getAllValidationRules(): Promise<ValidationRule[]> {
    const { data, error } = await supabase
      .from('validation_rules')
      .select('*')
      .order('type')
      .order('severity');

    if (error) {
      console.error('Error fetching validation rules:', error);
      throw error;
    }

    return data || [];
  }

  // Validate HCL code against database rules
  static async validateHclCode(hclCode: string, resourceTypes: string[]): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    info: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const info: string[] = [];

    try {
      // Get all applicable validation rules
      const allRules = await this.getAllValidationRules();
      const applicableRules = allRules.filter(rule => 
        rule.applies_to.some(type => resourceTypes.includes(type))
      );

      // Apply each validation rule
      for (const rule of applicableRules) {
        if (rule.pattern) {
          const regex = new RegExp(rule.pattern);
          if (!regex.test(hclCode)) {
            switch (rule.severity) {
              case 'error':
                errors.push(rule.message);
                break;
              case 'warning':
                warnings.push(rule.message);
                break;
              case 'info':
                info.push(rule.message);
                break;
            }
          }
        } else {
          // Custom validation logic based on rule type
          if (rule.type === 'semantic') {
            if (rule.name === 'required_location' && !hclCode.includes('location')) {
              switch (rule.severity) {
                case 'error':
                  errors.push(rule.message);
                  break;
                case 'warning':
                  warnings.push(rule.message);
                  break;
              }
            }
          }
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        info
      };
    } catch (error) {
      console.error('Error validating HCL code:', error);
      return {
        isValid: false,
        errors: ['Validation service error'],
        warnings: [],
        info: []
      };
    }
  }

  // Helper method to detect provider from resource types
  static detectProvider(resourceTypes: string[]): 'azure' | 'aws' | 'mixed' {
    const hasAzure = resourceTypes.some(type => type.startsWith('azurerm_'));
    const hasAws = resourceTypes.some(type => type.startsWith('aws_'));
    
    if (hasAzure && hasAws) return 'mixed';
    if (hasAws) return 'aws';
    return 'azure';
  }
}
