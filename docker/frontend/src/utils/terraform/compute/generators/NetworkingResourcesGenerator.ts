
import BaseGenerator from '../../BaseGenerator';

export default class NetworkingResourcesGenerator extends BaseGenerator {
  generateComputeNetworkingResources(): string {
    return `# Security Group for compute instances
resource "aws_security_group" "compute" {
  name        = "\${var.project_name}-\${var.environment}-compute-sg"
  description = "Security group for compute instances"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_cidr != "" ? var.allowed_cidr : "10.0.0.0/8"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-\${var.environment}-compute-sg"
  })
}

# Subnets for multi-AZ deployment
resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "\${var.aws_region}a"

  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-private-subnet-1"
  })
}

resource "aws_subnet" "private_2" {
  count             = var.selected_environment_config != null ? (var.selected_environment_config.multi_az ? 1 : 0) : (var.environment_configs[var.environment].multi_az ? 1 : 0)
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "\${var.aws_region}b"

  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-private-subnet-2"
  })
}

# VPC for the infrastructure
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-vpc"
  })
}

`;
  }
}
