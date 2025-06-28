import ProviderGenerator from './terraform/ProviderGenerator';
import ValidationGenerator from './terraform/ValidationGenerator';
import ComputeGenerator from './terraform/ComputeGenerator';
import StorageGenerator from './terraform/StorageGenerator';
import NetworkingGenerator from './terraform/NetworkingGenerator';
import DatabaseGenerator from './terraform/DatabaseGenerator';
import CostAlertsGenerator from './terraform/CostAlertsGenerator';
import RemoteStateGenerator from './terraform/RemoteStateGenerator';
import OutputGenerator from './terraform/OutputGenerator';
import ValidationUtils from './terraform/ValidationUtils';

export default class TerraformCodeGenerator {
  private cloudProvider: string;
  private providerGenerator: ProviderGenerator;
  private validationGenerator: ValidationGenerator;
  private computeGenerator: ComputeGenerator;
  private storageGenerator: StorageGenerator;
  private networkingGenerator: NetworkingGenerator;
  private databaseGenerator: DatabaseGenerator;
  private costAlertsGenerator: CostAlertsGenerator;
  private remoteStateGenerator: RemoteStateGenerator;
  private outputGenerator: OutputGenerator;

  constructor(cloudProvider: string) {
    this.cloudProvider = cloudProvider;
    this.providerGenerator = new ProviderGenerator(cloudProvider);
    this.validationGenerator = new ValidationGenerator(cloudProvider);
    this.computeGenerator = new ComputeGenerator(cloudProvider);
    this.storageGenerator = new StorageGenerator(cloudProvider);
    this.networkingGenerator = new NetworkingGenerator(cloudProvider);
    this.databaseGenerator = new DatabaseGenerator(cloudProvider);
    this.costAlertsGenerator = new CostAlertsGenerator(cloudProvider);
    this.remoteStateGenerator = new RemoteStateGenerator(cloudProvider);
    this.outputGenerator = new OutputGenerator(cloudProvider);
  }

  async generateCode(projectName: string, selectedResources: string[], resourceConfigs: any): Promise<string> {
    const { fullCode } = await this.generateCodeWithSections(projectName, selectedResources, resourceConfigs);
    return fullCode;
  }

  async generateCodeWithSections(projectName: string, selectedResources: string[], resourceConfigs: any): Promise<{
    fullCode: string;
    sections: {
      terraform: string;
      provider: string;
      variables: string;
      data: string;
      resources: string;
      outputs: string;
      validation: string;
      module?: string;
    };
  }> {
    const terraform = this.providerGenerator.generateTerraformBlock();
    const provider = this.providerGenerator.generateProvider();
    
    // Skip variables and validation if only remote-state is selected
    const isOnlyRemoteState = selectedResources.length === 1 && selectedResources[0] === 'remote-state';
    const variables = isOnlyRemoteState ? '' : this.providerGenerator.generateVariables(projectName, resourceConfigs);
    const validation = isOnlyRemoteState ? '' : this.validationGenerator.generateValidationBlocks(selectedResources, resourceConfigs);
    
    let resources = '';
    let data = '';
    let moduleCode = '';
    
    for (const resource of selectedResources) {
      switch (resource) {
        case 'compute':
          const computeResult = this.computeGenerator.generateCompute(resourceConfigs.compute);
          resources += computeResult.resources;
          data += computeResult.data;
          
          // Check for compute modules
          if (resourceConfigs.compute?.useEc2TfModule && resourceConfigs.compute?.ec2ModuleCode) {
            moduleCode += resourceConfigs.compute.ec2ModuleCode + '\n\n';
          }
          if (resourceConfigs.compute?.useAzureTfModule && resourceConfigs.compute?.azureModuleCode) {
            moduleCode += resourceConfigs.compute.azureModuleCode + '\n\n';
          }
          break;
        case 'storage':
          resources += this.storageGenerator.generateStorage(resourceConfigs.storage);
          break;
        case 'networking':
          const networkingResult = this.networkingGenerator.generateNetworking(resourceConfigs.networking);
          resources += networkingResult.resources;
          data += networkingResult.data;
          
          // Check for networking modules
          if (resourceConfigs.networking?.useTfModule || 
              (resourceConfigs.networking?.transitGateway && resourceConfigs.networking?.useTgwModule)) {
            moduleCode += networkingResult.moduleCode || '';
          }
          break;
        case 'database':
          resources += this.databaseGenerator.generateDatabase(resourceConfigs.database);
          break;
        case 'cost-alerts':
          resources += this.costAlertsGenerator.generateCostAlerts(resourceConfigs['cost-alerts']);
          data += this.costAlertsGenerator.generateData();
          
          // Check for pricing module
          if (resourceConfigs['cost-alerts']?.usePricingModule) {
            moduleCode += this.costAlertsGenerator.generatePricingModule();
          }
          break;
        case 'remote-state':
          resources += this.remoteStateGenerator.generateRemoteState(resourceConfigs['remote-state']);
          break;
      }
    }

    const outputs = isOnlyRemoteState ? '' : this.outputGenerator.generateOutputs();
    const tags = isOnlyRemoteState ? '' : this.outputGenerator.generateTags(projectName);

    const fullCode = terraform + provider + variables + validation + data + resources + outputs + tags;

    return {
      fullCode,
      sections: {
        terraform,
        provider,
        variables: variables + validation,
        data,
        resources: resources + tags,
        outputs,
        validation,
        module: moduleCode.trim()
      }
    };
  }

  validateHCL(code: string): { isValid: boolean; errors: string[]; warnings: string[] } {
    return ValidationUtils.validateHCL(code);
  }

  // New method for async database validation
  async validateHCLWithDatabase(code: string): Promise<{ 
    isValid: boolean; 
    errors: string[]; 
    warnings: string[];
    info: string[];
    suggestions: string[];
  }> {
    return await ValidationUtils.validateWithDatabase(code);
  }
}
