
import BaseGenerator from '../BaseGenerator';

export default class GcpComputeGenerator extends BaseGenerator {
  generateGcpCompute(config: any): string {
    return `# Compute Instance with Enforced Labeling
resource "google_compute_instance" "main" {
  count        = var.compute_instance_count
  name         = "\${var.project_name}-instance-\${count.index + 1}"
  machine_type = "${config?.instanceType || this.getDefaultInstanceType()}"
  zone         = "\${var.gcp_region}-a"
  
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
      type  = "pd-standard"
      size  = var.compute_disk_size
    }
  }
  
  network_interface {
    network = "default"
    access_config {}
  }
  
  labels = merge(var.required_tags, {
    name = replace("\${var.project_name}-instance-\${count.index + 1}", "-", "_")
    type = "compute"
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
