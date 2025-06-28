
import BaseGenerator from '../BaseGenerator';

export default class AwsTransitGatewayGenerator extends BaseGenerator {
  generateAwsTransitGateway(vpcs: any[], config: any): string {
    let resources = `
# Transit Gateway for Inter-VPC Connectivity
resource "aws_ec2_transit_gateway" "main" {
  description                     = "Transit Gateway for \${var.project_name}"
  amazon_side_asn                = ${config?.transitGatewayAsn || 64512}
  auto_accept_shared_attachments = "enable"
  default_route_table_association = "enable"
  default_route_table_propagation = "enable"
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-tgw"
    Type = "networking"
  })
}

# Transit Gateway Attachments
`;
    
    vpcs.forEach((vpc: any, index: number) => {
      const vpcName = vpc.name || `vpc-${index + 1}`;
      resources += `
resource "aws_ec2_transit_gateway_vpc_attachment" "${vpcName.replace(/-/g, '_')}_attachment" {
  subnet_ids         = [aws_subnet.${vpcName.replace(/-/g, '_')}_private.id]
  transit_gateway_id = aws_ec2_transit_gateway.main.id
  vpc_id             = aws_vpc.${vpcName.replace(/-/g, '_')}.id
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-${vpcName}-tgw-attachment"
    Type = "networking"
  })
}
`;
    });

    if (config?.enableVpnConnection) {
      resources += `
# Customer Gateway (placeholder - replace with actual values)
resource "aws_customer_gateway" "main" {
  bgp_asn    = 65000
  ip_address = "203.0.113.12" # Replace with your public IP
  type       = "ipsec.1"
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-cgw"
    Type = "networking"
  })
}

# VPN Connection
resource "aws_vpn_connection" "main" {
  customer_gateway_id = aws_customer_gateway.main.id
  transit_gateway_id  = aws_ec2_transit_gateway.main.id
  type                = aws_customer_gateway.main.type
  static_routes_only  = true
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-vpn"
    Type = "networking"
  })
}
`;
    }

    return resources;
  }

  generateAwsTransitGatewayModule(vpcs: any[], config: any): string {
    return `
# Transit Gateway using Terraform AWS Module
module "transit_gateway" {
  source  = "terraform-aws-modules/transit-gateway/aws"
  version = "2.0"

  name            = "\${var.project_name}-tgw"
  description     = "Transit Gateway for \${var.project_name}"
  amazon_side_asn = ${config?.transitGatewayAsn || 64512}

  enable_auto_accept_shared_attachments = true
  enable_default_route_table_association = true
  enable_default_route_table_propagation = true

  vpc_attachments = {
${vpcs.map((vpc: any, index: number) => {
  const vpcName = vpc.name || `vpc-${index + 1}`;
  return `    ${vpcName.replace(/-/g, '_')} = {
      vpc_id     = aws_vpc.${vpcName.replace(/-/g, '_')}.id
      subnet_ids = [aws_subnet.${vpcName.replace(/-/g, '_')}_private.id]

      dns_support  = true
      ipv6_support = false

      transit_gateway_default_route_table_association = true
      transit_gateway_default_route_table_propagation = true
    }`;
}).join('\n')}
  }

  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-tgw"
    Type = "networking"
  })
}
`;
  }
}
