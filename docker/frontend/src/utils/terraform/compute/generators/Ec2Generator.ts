
import BaseGenerator from '../../BaseGenerator';

export default class Ec2Generator extends BaseGenerator {
  generateSingleInstanceConfig(config: any): string {
    const instanceType = config?.instanceType || this.getDefaultInstanceType();
    
    return `# EC2 Instance with Enforced Tagging
resource "aws_instance" "main" {
  count         = var.compute_instance_count
  ami           = data.aws_ami.ubuntu.id
  instance_type = "${instanceType}"
  
  root_block_device {
    volume_size = var.compute_disk_size
    encrypted   = true
  }
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-instance-\${count.index + 1}"
    Type = "compute"
  })
  
  lifecycle {
    precondition {
      condition     = contains(keys(var.required_tags), "Project") && contains(keys(var.required_tags), "Environment") && contains(keys(var.required_tags), "Team") && contains(keys(var.required_tags), "Owner") && contains(keys(var.required_tags), "CostCenter") && contains(keys(var.required_tags), "ManagedBy") && contains(keys(var.required_tags), "CreatedDate")
      error_message = "Required tags must include 'Project', 'Environment', 'Team', 'Owner', 'CostCenter', 'ManagedBy', and 'CreatedDate' keys."
    }
  }
}

`;
  }
}
