
import BaseGenerator from '../BaseGenerator';

export default class GcpNetworkingGenerator extends BaseGenerator {
  generateGcpVpcs(vpcs: any[]): string {
    let resources = `# Multiple VPC Networks with Enforced Labeling
`;

    vpcs.forEach((vpc: any, index: number) => {
      const vpcName = vpc.name || `vpc-${index + 1}`;
      resources += `
resource "google_compute_network" "${vpcName.replace(/-/g, '_')}" {
  name                    = "\${var.project_name}-${vpcName}"
  auto_create_subnetworks = false
  
  lifecycle {
    precondition {
      condition     = var.project_name != "" && var.environment != ""
      error_message = "All networks must have project_name and environment defined."
    }
  }
}

# Subnet for ${vpcName}
resource "google_compute_subnetwork" "${vpcName.replace(/-/g, '_')}_subnet" {
  name          = "\${var.project_name}-${vpcName}-subnet"
  ip_cidr_range = "${vpc.cidr || `10.${index}.0.0/16`}"
  region        = var.gcp_region
  network       = google_compute_network.${vpcName.replace(/-/g, '_')}.id
}

# Firewall Rules for ${vpcName}
resource "google_compute_firewall" "${vpcName.replace(/-/g, '_')}_ssh" {
  name    = "\${var.project_name}-${vpcName}-allow-ssh"
  network = google_compute_network.${vpcName.replace(/-/g, '_')}.name
  
  allow {
    protocol = "tcp"
    ports    = ["22"]
  }
  
  source_ranges = ["0.0.0.0/0"]
}
`;
    });

    return resources;
  }

  generateGcpVpcPeering(vpcs: any[]): string {
    let resources = `
# VPC Peering Connections
`;
    for (let i = 0; i < vpcs.length - 1; i++) {
      const vpc1Name = (vpcs[i].name || `vpc-${i + 1}`).replace(/-/g, '_');
      const vpc2Name = (vpcs[i + 1].name || `vpc-${i + 2}`).replace(/-/g, '_');
      
      resources += `
resource "google_compute_network_peering" "${vpc1Name}_to_${vpc2Name}" {
  name         = "\${var.project_name}-${vpc1Name}-to-${vpc2Name}"
  network      = google_compute_network.${vpc1Name}.id
  peer_network = google_compute_network.${vpc2Name}.id
}

resource "google_compute_network_peering" "${vpc2Name}_to_${vpc1Name}" {
  name         = "\${var.project_name}-${vpc2Name}-to-${vpc1Name}"
  network      = google_compute_network.${vpc2Name}.id
  peer_network = google_compute_network.${vpc1Name}.id
}
`;
    }

    return resources;
  }
}
