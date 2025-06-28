
export const generateAwsEc2Resources = (): string => {
  return `# AWS EC2 Compute Resources

# Data source for latest Ubuntu AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Data source for availability zones
data "aws_availability_zones" "available" {
  state = "available"
}

# Key pair for EC2 instances
resource "aws_key_pair" "main" {
  key_name   = "\${var.naming_convention}-keypair"
  public_key = var.public_key

  tags = var.default_tags
}

# Security group for EC2 instances
resource "aws_security_group" "ec2" {
  name        = "\${var.naming_convention}-ec2-sg"
  description = "Security group for EC2 instances"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }

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

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-ec2-sg"
  })
}

# EC2 Instance with comprehensive configuration
resource "aws_instance" "main" {
  ami                                  = data.aws_ami.ubuntu.id
  instance_type                        = var.instance_type
  key_name                            = aws_key_pair.main.key_name
  vpc_security_group_ids              = [aws_security_group.ec2.id]
  subnet_id                           = aws_subnet.public.id
  availability_zone                   = data.aws_availability_zones.available.names[0]
  associate_public_ip_address         = true
  disable_api_stop                    = false
  disable_api_termination             = false
  ebs_optimized                       = true
  get_password_data                   = false
  hibernation                         = false
  host_id                             = null
  host_resource_group_arn             = null
  iam_instance_profile                = null
  instance_initiated_shutdown_behavior = "stop"
  monitoring                          = true
  placement_group                     = null
  placement_partition_number          = null
  private_ip                          = null
  secondary_private_ips               = null
  security_groups                     = null
  source_dest_check                   = true
  tenancy                             = "default"
  user_data                           = base64encode(file("\${path.module}/user_data.sh"))
  user_data_base64                    = null
  user_data_replace_on_change         = false

  cpu_options {
    core_count       = null
    threads_per_core = null
    amd_sev_snp      = null
  }

  capacity_reservation_specification {
    capacity_reservation_preference = "open"
    capacity_reservation_target {
      capacity_reservation_id                 = null
      capacity_reservation_resource_group_arn = null
    }
  }

  credit_specification {
    cpu_credits = "standard"
  }

  enclave_options {
    enabled = false
  }

  maintenance_options {
    auto_recovery = "default"
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_put_response_hop_limit = 1
    http_tokens                 = "optional"
    http_protocol_ipv6          = "disabled"
    instance_metadata_tags      = "disabled"
  }

  private_dns_name_options {
    enable_resource_name_dns_a_record    = false
    enable_resource_name_dns_aaaa_record = false
    hostname_type                        = "ip-name"
  }

  root_block_device {
    delete_on_termination = true
    encrypted             = true
    iops                  = null
    kms_key_id            = null
    throughput            = null
    volume_size           = 20
    volume_type           = "gp3"
    tags = merge(var.default_tags, {
      Name = "\${var.naming_convention}-root-volume"
    })
  }

  ebs_block_device {
    device_name           = "/dev/sdf"
    delete_on_termination = true
    encrypted             = true
    iops                  = null
    kms_key_id            = null
    snapshot_id           = null
    throughput            = null
    volume_size           = 10
    volume_type           = "gp3"
    tags = merge(var.default_tags, {
      Name = "\${var.naming_convention}-data-volume"
    })
  }

  ephemeral_block_device {
    device_name  = "/dev/sdb"
    no_device    = false
    virtual_name = "ephemeral0"
  }

  network_interface {
    device_index          = 0
    network_interface_id  = null
    delete_on_termination = true
  }

  launch_template {
    id      = null
    name    = null
    version = null
  }

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-instance"
  })

  volume_tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-volumes"
  })

  timeouts {
    create = "10m"
    update = "10m"
    delete = "20m"
  }

  lifecycle {
    create_before_destroy = false
    ignore_changes        = [ami]
  }
}

# Dedicated Host (optional)
resource "aws_ec2_host" "main" {
  availability_zone    = data.aws_availability_zones.available.names[0]
  host_recovery        = "off"
  instance_family      = "m5"
  instance_type        = var.instance_type
  outpost_arn          = null
  asset_id             = null
  auto_placement       = "on"
  host_maintenance     = "off"

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-dedicated-host"
  })
}

# Elastic IP for the instance
resource "aws_eip" "main" {
  instance = aws_instance.main.id
  domain   = "vpc"

  tags = merge(var.default_tags, {
    Name = "\${var.naming_convention}-eip"
  })

  depends_on = [aws_internet_gateway.main]
}

# CloudWatch Log Group for instance logs
resource "aws_cloudwatch_log_group" "instance_logs" {
  name              = "/aws/ec2/\${var.naming_convention}"
  retention_in_days = 14
  kms_key_id        = null

  tags = var.default_tags
}

`;
};
