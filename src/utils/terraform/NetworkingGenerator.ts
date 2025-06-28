
import BaseGenerator from './BaseGenerator';
import AwsVpcGenerator from './networking/AwsVpcGenerator';
import AwsTransitGatewayGenerator from './networking/AwsTransitGatewayGenerator';
import AwsVpcModuleGenerator from './networking/AwsVpcModuleGenerator';
import AzureNetworkingGenerator from './networking/AzureNetworkingGenerator';
import GcpNetworkingGenerator from './networking/GcpNetworkingGenerator';

export default class NetworkingGenerator extends BaseGenerator {
  private awsVpcGenerator: AwsVpcGenerator;
  private awsTransitGatewayGenerator: AwsTransitGatewayGenerator;
  private awsVpcModuleGenerator: AwsVpcModuleGenerator;
  private azureNetworkingGenerator: AzureNetworkingGenerator;
  private gcpNetworkingGenerator: GcpNetworkingGenerator;

  constructor(cloudProvider: string) {
    super(cloudProvider);
    this.awsVpcGenerator = new AwsVpcGenerator(cloudProvider);
    this.awsTransitGatewayGenerator = new AwsTransitGatewayGenerator(cloudProvider);
    this.awsVpcModuleGenerator = new AwsVpcModuleGenerator(cloudProvider);
    this.azureNetworkingGenerator = new AzureNetworkingGenerator(cloudProvider);
    this.gcpNetworkingGenerator = new GcpNetworkingGenerator(cloudProvider);
  }

  generateNetworking(config: any): { resources: string; data: string; moduleCode?: string } {
    if (!config) return { resources: '', data: '' };

    let resources = '';
    let data = '';
    let moduleCode = '';

    switch (this.cloudProvider) {
      case 'aws':
        if (config.useTfModule) {
          // Use VPC module instead of individual resources
          moduleCode += this.awsVpcModuleGenerator.generateAwsVpcModule(config.vpcs || [config]);
        } else {
          // Generate individual VPC resources
          resources += this.awsVpcGenerator.generateAwsVpc(config.vpcs || [config]);
        }

        // Handle Transit Gateway
        if (config.transitGateway) {
          if (config.useTgwModule) {
            moduleCode += this.awsTransitGatewayGenerator.generateAwsTransitGatewayModule(config.vpcs || [config], config);
          } else {
            resources += this.awsTransitGatewayGenerator.generateAwsTransitGateway(config.vpcs || [config], config);
          }
        }
        break;

      case 'azure':
        resources += this.azureNetworkingGenerator.generateAzureVirtualNetworks(config.vpcs || [config]);
        if (config.transitGateway) {
          resources += this.azureNetworkingGenerator.generateAzureVirtualHub(config.vpcs || [config]);
        }
        break;

      case 'gcp':
        resources += this.gcpNetworkingGenerator.generateGcpVpcs(config.vpcs || [config]);
        if (config.enableVpcPeering) {
          resources += this.gcpNetworkingGenerator.generateGcpVpcPeering(config.vpcs || [config]);
        }
        break;

      default:
        return { resources: '', data: '' };
    }

    return { resources, data, moduleCode };
  }
}
