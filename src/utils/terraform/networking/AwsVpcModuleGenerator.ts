
import BaseGenerator from '../BaseGenerator';

export default class AwsVpcModuleGenerator extends BaseGenerator {
  generateAwsVpcModule(vpcs: any[]): string {
    let resources = `# VPC using Terraform AWS Module
`;

    vpcs.forEach((vpc: any, index: number) => {
      const vpcName = vpc.name || `vpc-${index + 1}`;
      resources += `
module "${vpcName.replace(/-/g, '_')}" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.0"

  name = "\${var.project_name}-${vpcName}"
  cidr = "${vpc.cidr || `10.${index}.0.0/16`}"

  azs             = data.aws_availability_zones.available.names
  private_subnets = ["${vpc.privateSubnetCidr || `10.${index}.2.0/24`}"]
  public_subnets  = ["${vpc.publicSubnetCidr || `10.${index}.1.0/24`}"]

  enable_nat_gateway = true
  enable_vpn_gateway = true
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-${vpcName}"
    Type = "networking"
  })
}
`;
    });

    return resources;
  }
}
