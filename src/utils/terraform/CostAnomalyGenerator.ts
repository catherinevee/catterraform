
import BaseGenerator from './BaseGenerator';

export default class CostAnomalyGenerator extends BaseGenerator {
  generateCostAnomalyDetection(): string {
    switch (this.cloudProvider) {
      case 'aws':
        return `
# Cost Anomaly Detection
resource "aws_ce_anomaly_detector" "main" {
  name         = "\${var.project_name}-anomaly-detector"
  detector_type = "DIMENSIONAL"
  
  specification {
    dimension_key           = "SERVICE"
    dimension_value_attributes = ["value", "key"]
  }

  tags = var.required_tags
}

resource "aws_ce_anomaly_subscription" "main" {
  name      = "\${var.project_name}-anomaly-subscription"
  frequency = "DAILY"
  
  monitor_arn_list = [
    aws_ce_anomaly_detector.main.arn
  ]
  
  subscriber {
    type    = "EMAIL"
    address = "admin@company.com"
  }

  threshold_expression {
    and {
      dimension {
        key           = "ANOMALY_TOTAL_IMPACT_ABSOLUTE"
        values        = ["100"]
        match_options = ["GREATER_THAN_OR_EQUAL"]
      }
    }
  }

  tags = var.required_tags
}
`;
      case 'azure':
        return `
# Azure Cost Anomaly Detection with Action Groups and Alerts
resource "azurerm_monitor_action_group" "cost_alerts" {
  name                = "\${var.project_name}-cost-alerts"
  resource_group_name = azurerm_resource_group.main.name
  short_name          = "costalerts"

  email_receiver {
    name          = "admin-email"
    email_address = "admin@company.com"
  }

  tags = var.required_tags
}

resource "azurerm_cost_anomaly_alert" "main" {
  name            = "\${var.project_name}-anomaly-alert"
  display_name    = "\${var.project_name} Cost Anomaly Alert"
  email_subject   = "Cost Anomaly Detected for \${var.project_name}"
  email_addresses = ["admin@company.com"]
  message         = "A cost anomaly has been detected for your Azure resources in project \${var.project_name}."

  tags = var.required_tags
}
`;
      default:
        return '';
    }
  }
}
