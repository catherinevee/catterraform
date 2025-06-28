
import BaseGenerator from '../../BaseGenerator';

export default class DataSourcesGenerator extends BaseGenerator {
  generateComputeDataSources(): string {
    return `# Data Sources for Compute
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

`;
  }
}
