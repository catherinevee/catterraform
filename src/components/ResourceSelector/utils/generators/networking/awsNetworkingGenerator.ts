

export const generateAwsNetworkingResources = (): string => {
  return `# AWS VPC with all optional parameters
resource "aws_vpc" "main" {
  cidr_block                           = "10.0.0.0/16"
  instance_tenancy                     = "default"
  enable_dns_hostnames                 = true
  enable_dns_support                   = true
  enable_network_address_usage_metrics = false
  
  # Optional IPv6 configuration
  assign_generated_ipv6_cidr_block     = false
  ipv4_ipam_pool_id                    = null
  ipv4_netmask_length                  = null
  ipv6_cidr_block                      = null
  ipv6_ipam_pool_id                    = null
  ipv6_netmask_length                  = null
  ipv6_cidr_block_network_border_group = null

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-vpc"
  })
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-igw"
  })
}

# Public Subnet
resource "aws_subnet" "public" {
  vpc_id                          = aws_vpc.main.id
  cidr_block                      = "10.0.1.0/24"
  availability_zone               = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch         = true
  
  # Optional parameters
  assign_ipv6_address_on_creation = false
  availability_zone_id            = null
  cidr_block                      = "10.0.1.0/24"
  customer_owned_ipv4_pool        = null
  enable_dns64                    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  enable_resource_name_dns_a_record_on_launch    = false
  ipv6_cidr_block                 = null
  ipv6_native                     = false
  map_customer_owned_ip_on_launch = false
  outpost_arn                     = null
  private_dns_hostname_type_on_launch = "ip-name"

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-public-subnet"
    Type = "public"
  })
}

# Private Subnet
resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]
  
  # Optional parameters
  assign_ipv6_address_on_creation = false
  availability_zone_id            = null
  customer_owned_ipv4_pool        = null
  enable_dns64                    = false
  enable_resource_name_dns_aaaa_record_on_launch = false
  enable_resource_name_dns_a_record_on_launch    = false
  ipv6_cidr_block                 = null
  ipv6_native                     = false
  map_customer_owned_ip_on_launch = false
  map_public_ip_on_launch         = false
  outpost_arn                     = null
  private_dns_hostname_type_on_launch = "ip-name"

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-private-subnet"
    Type = "private"
  })
}

# NAT Gateway
resource "aws_eip" "nat" {
  domain = "vpc"
  
  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-nat-eip"
  })
}

resource "aws_nat_gateway" "main" {
  allocation_id     = aws_eip.nat.id
  subnet_id         = aws_subnet.public.id
  connectivity_type = "public"
  
  # Optional parameters
  private_ip                 = null
  secondary_allocation_ids   = []
  secondary_private_ip_count = 0

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-nat-gateway"
  })

  depends_on = [aws_internet_gateway.main]
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-public-rt"
    Type = "public"
  })
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  }

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-private-rt"
    Type = "private"
  })
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}

# Network ACLs
resource "aws_network_acl" "main" {
  vpc_id     = aws_vpc.main.id
  subnet_ids = [aws_subnet.public.id, aws_subnet.private.id]

  # Allow inbound HTTP
  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 80
    to_port    = 80
  }

  # Allow inbound HTTPS
  ingress {
    protocol   = "tcp"
    rule_no    = 110
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 443
    to_port    = 443
  }

  # Allow inbound SSH
  ingress {
    protocol   = "tcp"
    rule_no    = 120
    action     = "allow"
    cidr_block = "10.0.0.0/16"
    from_port  = 22
    to_port    = 22
  }

  # Allow all outbound traffic
  egress {
    protocol   = "-1"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-network-acl"
  })
}

# Security Groups
resource "aws_security_group" "web" {
  name_prefix = "\${var.naming_convention}-web-"
  vpc_id      = aws_vpc.main.id
  description = "Security group for web servers"

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-web-sg"
  })
}

# VPC Flow Logs
resource "aws_flow_log" "vpc_flow_log" {
  iam_role_arn    = aws_iam_role.flow_log.arn
  log_destination = aws_cloudwatch_log_group.vpc_flow_log.arn
  traffic_type    = "ALL"
  vpc_id          = aws_vpc.main.id
  
  # Optional parameters
  deliver_cross_account_role = null
  log_destination_type       = "cloud-watch-logs"
  log_format                 = "$\{version} $\{account-id} $\{interface-id} $\{srcaddr} $\{dstaddr} $\{srcport} $\{dstport} $\{protocol} $\{packets} $\{bytes} $\{windowstart} $\{windowend} $\{action} $\{flowlogstatus}"
  max_aggregation_interval   = 600

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-vpc-flow-log"
  })
}

resource "aws_cloudwatch_log_group" "vpc_flow_log" {
  name              = "/aws/vpc/flowlogs/\${var.naming_convention}"
  retention_in_days = 14
  
  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-vpc-flow-log-group"
  })
}

resource "aws_iam_role" "flow_log" {
  name = "\${var.naming_convention}-flow-log-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "vpc-flow-logs.amazonaws.com"
        }
      }
    ]
  })

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-flow-log-role"
  })
}

resource "aws_iam_role_policy" "flow_log" {
  name = "\${var.naming_convention}-flow-log-policy"
  role = aws_iam_role.flow_log.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

# Transit Gateway with all optional parameters
resource "aws_ec2_transit_gateway" "main" {
  # Optional parameters with their defaults
  amazon_side_asn                 = 64512
  auto_accept_shared_attachments  = "disable"
  default_route_table_association = "enable"
  default_route_table_propagation = "enable"
  description                     = "\${var.naming_convention} Transit Gateway"
  dns_support                     = "enable"
  multicast_support              = "disable"
  transit_gateway_cidr_blocks    = []
  vpn_ecmp_support               = "enable"

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-tgw"
  })
}

# Transit Gateway VPC Attachment
resource "aws_ec2_transit_gateway_vpc_attachment" "main" {
  subnet_ids                                      = [aws_subnet.private.id]
  transit_gateway_id                              = aws_ec2_transit_gateway.main.id
  vpc_id                                          = aws_vpc.main.id
  
  # Optional parameters
  appliance_mode_support                          = "disable"
  dns_support                                     = "enable"
  ipv6_support                                    = "disable"
  security_group_referencing_support              = "disable"
  transit_gateway_default_route_table_association = true
  transit_gateway_default_route_table_propagation = true

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-tgw-vpc-attachment"
  })
}

# Transit Gateway Route Table
resource "aws_ec2_transit_gateway_route_table" "main" {
  transit_gateway_id = aws_ec2_transit_gateway.main.id

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-tgw-route-table"
  })
}

# Transit Gateway Route
resource "aws_ec2_transit_gateway_route" "default" {
  destination_cidr_block         = "0.0.0.0/0"
  transit_gateway_attachment_id  = aws_ec2_transit_gateway_vpc_attachment.main.id
  transit_gateway_route_table_id = aws_ec2_transit_gateway_route_table.main.id
  
  # Optional parameters
  blackhole = false
}

# VPC Endpoints for AWS services
resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.\${var.default_region}.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.private.id]
  
  # Optional parameters
  auto_accept         = null
  dns_options         = []
  ip_address_type     = null
  policy              = null
  private_dns_enabled = null
  security_group_ids  = []
  subnet_ids          = []

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-s3-endpoint"
  })
}

resource "aws_vpc_endpoint" "ec2" {
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.\${var.default_region}.ec2"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [aws_subnet.private.id]
  security_group_ids  = [aws_security_group.vpc_endpoint.id]
  private_dns_enabled = true
  
  # Optional parameters
  auto_accept     = null
  dns_options     = []
  ip_address_type = "ipv4"
  policy          = null

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-ec2-endpoint"
  })
}

resource "aws_security_group" "vpc_endpoint" {
  name_prefix = "\${var.naming_convention}-vpc-endpoint-"
  vpc_id      = aws_vpc.main.id
  description = "Security group for VPC endpoints"

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-vpc-endpoint-sg"
  })
}

# VPC Peering Connection (example for multi-VPC scenarios)
resource "aws_vpc_peering_connection" "main" {
  count       = var.enable_vpc_peering ? 1 : 0
  vpc_id      = aws_vpc.main.id
  peer_vpc_id = var.peer_vpc_id
  peer_region = var.default_region
  auto_accept = true

  # Optional parameters
  peer_owner_id = null

  accepter {
    allow_remote_vpc_dns_resolution = true
  }

  requester {
    allow_remote_vpc_dns_resolution = true
  }

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-vpc-peering"
  })
}

# Additional variables needed for VPC Peering
variable "enable_vpc_peering" {
  description = "Enable VPC peering connection"
  type        = bool
  default     = false
}

variable "peer_vpc_id" {
  description = "VPC ID to peer with"
  type        = string
  default     = ""
}

`;
};

