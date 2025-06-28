
import BaseGenerator from '../../BaseGenerator';

export default class AutoScalingGenerator extends BaseGenerator {
  generateEnvironmentSpecificConfig(environments: any[]): string {
    return `# Launch Template for Auto Scaling Group
resource "aws_launch_template" "main" {
  name_prefix   = "\${var.project_name}-"
  description   = "Launch template for \${var.project_name} instances"
  image_id      = data.aws_ami.ubuntu.id
  instance_type = var.selected_environment_config != null ? var.selected_environment_config.instance_type : var.environment_configs[var.environment].instance_type

  dynamic "instance_market_options" {
    for_each = var.selected_environment_config != null ? (var.selected_environment_config.enable_spot ? [1] : []) : (var.environment_configs[var.environment].enable_spot ? [1] : [])
    content {
      market_type = "spot"
      spot_options {
        max_price = "0.05"
      }
    }
  }

  block_device_mappings {
    device_name = "/dev/sda1"
    ebs {
      volume_size           = var.compute_disk_size
      volume_type          = var.selected_environment_config != null ? var.selected_environment_config.storage_type : var.environment_configs[var.environment].storage_type
      encrypted            = true
      delete_on_termination = true
    }
  }

  network_interfaces {
    associate_public_ip_address = false
    security_groups            = [aws_security_group.compute.id]
    delete_on_termination      = true
  }

  tag_specifications {
    resource_type = "instance"
    tags = merge(var.required_tags, {
      Name        = "\${var.project_name}-\${var.environment}"
      Environment = var.environment
      Type        = "compute"
    })
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Auto Scaling Group
resource "aws_autoscaling_group" "main" {
  name                = "\${var.project_name}-\${var.environment}-asg"
  vpc_zone_identifier = var.selected_environment_config != null ? (var.selected_environment_config.multi_az ? [aws_subnet.private_1.id, aws_subnet.private_2.id] : [aws_subnet.private_1.id]) : (var.environment_configs[var.environment].multi_az ? [aws_subnet.private_1.id, aws_subnet.private_2.id] : [aws_subnet.private_1.id])
  target_group_arns   = []
  health_check_type   = "EC2"
  health_check_grace_period = 300

  min_size         = var.selected_environment_config != null ? var.selected_environment_config.min_size : var.environment_configs[var.environment].min_size
  max_size         = var.selected_environment_config != null ? var.selected_environment_config.max_size : var.environment_configs[var.environment].max_size
  desired_capacity = var.selected_environment_config != null ? var.selected_environment_config.min_size : var.environment_configs[var.environment].min_size

  launch_template {
    id      = aws_launch_template.main.id
    version = "$Latest"
  }

  dynamic "availability_zones" {
    for_each = var.selected_environment_config != null ? (var.selected_environment_config.multi_az ? ["a", "b"] : ["a"]) : (var.environment_configs[var.environment].multi_az ? ["a", "b"] : ["a"])
    content {
      availability_zones = ["\${var.aws_region}\${availability_zones.value}"]
    }
  }

  tag {
    key                 = "Name"
    value               = "\${var.project_name}-\${var.environment}-asg"
    propagate_at_launch = false
  }

  tag {
    key                 = "Environment"
    value               = var.environment
    propagate_at_launch = true
  }

  tag {
    key                 = "Project"
    value               = var.project_name
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
    precondition {
      condition     = contains(keys(var.required_tags), "Project") && contains(keys(var.required_tags), "Environment") && contains(keys(var.required_tags), "Team") && contains(keys(var.required_tags), "Owner") && contains(keys(var.required_tags), "CostCenter") && contains(keys(var.required_tags), "ManagedBy") && contains(keys(var.required_tags), "CreatedDate")
      error_message = "Required tags must include 'Project', 'Environment', 'Team', 'Owner', 'CostCenter', 'ManagedBy', and 'CreatedDate' keys."
    }
  }
}

`;
  }
}
