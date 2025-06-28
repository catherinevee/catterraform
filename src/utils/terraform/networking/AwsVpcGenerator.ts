
import BaseGenerator from '../BaseGenerator';

export default class AwsVpcGenerator extends BaseGenerator {
  generateAwsVpc(vpcs: any[]): string {
    let resources = `# Multiple VPCs with Enforced Tagging
`;

    vpcs.forEach((vpc: any, index: number) => {
      const vpcName = vpc.name || `vpc-${index + 1}`;
      resources += `
resource "aws_vpc" "${vpcName.replace(/-/g, '_')}" {
  cidr_block           = "${vpc.cidr || `10.${index}.0.0/16`}"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-${vpcName}"
    Type = "networking"
  })
  
  lifecycle {
    precondition {
      condition     = contains(keys(self.tags), "Project") && contains(keys(self.tags), "Environment")
      error_message = "All VPCs must have Project and Environment tags."
    }
  }
}

# Internet Gateway for ${vpcName}
resource "aws_internet_gateway" "${vpcName.replace(/-/g, '_')}_igw" {
  vpc_id = aws_vpc.${vpcName.replace(/-/g, '_')}.id
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-${vpcName}-igw"
    Type = "networking"
  })
}

# Public Subnet for ${vpcName}
resource "aws_subnet" "${vpcName.replace(/-/g, '_')}_public" {
  vpc_id                  = aws_vpc.${vpcName.replace(/-/g, '_')}.id
  cidr_block              = "${vpc.publicSubnetCidr || `10.${index}.1.0/24`}"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-${vpcName}-public-subnet"
    Type = "networking"
  })
}

# Private Subnet for ${vpcName}
resource "aws_subnet" "${vpcName.replace(/-/g, '_')}_private" {
  vpc_id            = aws_vpc.${vpcName.replace(/-/g, '_')}.id
  cidr_block        = "${vpc.privateSubnetCidr || `10.${index}.2.0/24`}"
  availability_zone = data.aws_availability_zones.available.names[${Math.min(index + 1, 2)}]
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-${vpcName}-private-subnet"
    Type = "networking"
  })
}

# Route Table for ${vpcName}
resource "aws_route_table" "${vpcName.replace(/-/g, '_')}_public_rt" {
  vpc_id = aws_vpc.${vpcName.replace(/-/g, '_')}.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.${vpcName.replace(/-/g, '_')}_igw.id
  }
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-${vpcName}-public-rt"
    Type = "networking"
  })
}

resource "aws_route_table_association" "${vpcName.replace(/-/g, '_')}_public_rta" {
  subnet_id      = aws_subnet.${vpcName.replace(/-/g, '_')}_public.id
  route_table_id = aws_route_table.${vpcName.replace(/-/g, '_')}_public_rt.id
}
`;
    });

    return resources;
  }
}
