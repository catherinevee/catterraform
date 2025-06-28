
import BaseGenerator from '../BaseGenerator';
import Ec2Generator from './generators/Ec2Generator';
import AutoScalingGenerator from './generators/AutoScalingGenerator';
import NetworkingResourcesGenerator from './generators/NetworkingResourcesGenerator';
import DataSourcesGenerator from './generators/DataSourcesGenerator';

export default class AwsComputeGenerator extends BaseGenerator {
  private ec2Generator: Ec2Generator;
  private autoScalingGenerator: AutoScalingGenerator;
  private networkingResourcesGenerator: NetworkingResourcesGenerator;
  private dataSourcesGenerator: DataSourcesGenerator;

  constructor(cloudProvider: string) {
    super(cloudProvider);
    this.ec2Generator = new Ec2Generator(cloudProvider);
    this.autoScalingGenerator = new AutoScalingGenerator(cloudProvider);
    this.networkingResourcesGenerator = new NetworkingResourcesGenerator(cloudProvider);
    this.dataSourcesGenerator = new DataSourcesGenerator(cloudProvider);
  }

  generateAwsCompute(config: any): { resources: string; data: string } {
    const data = this.dataSourcesGenerator.generateComputeDataSources();

    let resources = '';
    
    // Check if using EC2 TF Module
    if (config?.useEc2TfModule && config?.ec2ModuleCode) {
      resources += '\n# EC2 Instance using Terraform Module\n';
      resources += config.ec2ModuleCode;
      resources += '\n\n';
    } else {
      // Use standard EC2 configuration
      if (config?.useEnvironmentConfigs && config?.environments) {
        resources = this.autoScalingGenerator.generateEnvironmentSpecificConfig(config.environments);
        resources += this.networkingResourcesGenerator.generateComputeNetworkingResources();
      } else {
        resources = this.ec2Generator.generateSingleInstanceConfig(config);
      }
    }

    // Add Lambda functions if enabled
    if (config?.enableLambdaFunctions && config?.lambdaHclCode) {
      resources += '\n# Lambda Functions\n';
      if (config?.useTfModule) {
        // When using TF module, the lambdaHclCode already contains the module configuration
        resources += config.lambdaHclCode;
      } else {
        // When not using TF module, use the custom HCL code
        resources += config.lambdaHclCode;
      }
      resources += '\n\n';
    }

    return { resources, data };
  }
}
