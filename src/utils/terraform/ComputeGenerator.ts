
import BaseGenerator from './BaseGenerator';
import AwsComputeGenerator from './compute/AwsComputeGenerator';
import AzureComputeGenerator from './compute/AzureComputeGenerator';
import GcpComputeGenerator from './compute/GcpComputeGenerator';

export default class ComputeGenerator extends BaseGenerator {
  private awsGenerator: AwsComputeGenerator;
  private azureGenerator: AzureComputeGenerator;
  private gcpGenerator: GcpComputeGenerator;

  constructor(cloudProvider: string) {
    super(cloudProvider);
    this.awsGenerator = new AwsComputeGenerator(cloudProvider);
    this.azureGenerator = new AzureComputeGenerator(cloudProvider);
    this.gcpGenerator = new GcpComputeGenerator(cloudProvider);
  }

  generateCompute(config: any): { resources: string; data: string } {
    switch (this.cloudProvider) {
      case 'aws':
        return this.awsGenerator.generateAwsCompute(config);
      case 'azure':
        return { resources: this.azureGenerator.generateAzureCompute(config), data: '' };
      case 'gcp':
        return { resources: this.gcpGenerator.generateGcpCompute(config), data: '' };
      default:
        return { resources: '', data: '' };
    }
  }
}
