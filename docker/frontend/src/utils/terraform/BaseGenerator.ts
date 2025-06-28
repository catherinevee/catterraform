
export default abstract class BaseGenerator {
  protected cloudProvider: string;

  constructor(cloudProvider: string) {
    this.cloudProvider = cloudProvider;
  }

  protected applyNamingConvention(name: string, convention?: string, customPattern?: string, resourceConfigs?: any): string {
    if (!convention) return name;
    
    if (convention === 'custom' && customPattern) {
      return this.applyCustomNamingPattern(name, customPattern, resourceConfigs);
    }
    
    // Get additional context for naming
    const organization = resourceConfigs?.global?.organization || '';
    const project = name;
    const environment = resourceConfigs?.global?.environment || 'dev';
    const location = resourceConfigs?.global?.location || '';
    
    // Build the base name combining organization, project, environment, and location
    const parts = [organization, project, environment, location].filter(Boolean);
    const combinedName = parts.join('-');
    
    switch (convention) {
      case 'kebab-case':
        return combinedName.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
      case 'snake_case':
        return combinedName.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
      case 'PascalCase':
        return combinedName.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, '').replace(/[-_]/g, '');
      case 'camelCase':
        const pascal = this.applyNamingConvention(combinedName, 'PascalCase');
        return pascal.charAt(0).toLowerCase() + pascal.slice(1);
      case 'prefix-kebab':
        return `org-${this.applyNamingConvention(combinedName, 'kebab-case')}`;
      default:
        return combinedName;
    }
  }

  private applyCustomNamingPattern(projectName: string, pattern: string, resourceConfigs?: any): string {
    const organization = resourceConfigs?.global?.organization || '';
    const environment = resourceConfigs?.global?.environment || 'dev';
    const location = resourceConfigs?.global?.location || '';
    
    return pattern
      .replace(/{organization}/g, organization.toLowerCase().replace(/\s+/g, '-'))
      .replace(/{project}/g, projectName.toLowerCase().replace(/\s+/g, '-'))
      .replace(/{environment}/g, environment)
      .replace(/{location}/g, location.toLowerCase().replace(/\s+/g, '-'))
      .replace(/{resource}/g, '${local.resource_type}')
      .replace(/{suffix}/g, '${random_id.suffix.hex}');
  }

  protected getDefaultInstanceType(): string {
    switch (this.cloudProvider) {
      case 'aws': return 't3.micro';
      case 'azure': return 'Standard_B1s';
      case 'gcp': return 'e2-micro';
      default: return 't3.micro';
    }
  }
}
