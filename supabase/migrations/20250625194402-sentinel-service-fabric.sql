
-- Azure Sentinel and Service Fabric services
-- This migration adds Sentinel and Service Fabric related Azure resources

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Additional Sentinel connectors
('azurerm_sentinel_data_connector_microsoft_cloud_app_security', 'security', 'Manages a Sentinel Microsoft Cloud App Security Data Connector', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/sentinel_data_connector_microsoft_cloud_app_security'),
('azurerm_sentinel_data_connector_office_365', 'security', 'Manages a Sentinel Office 365 Data Connector', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/sentinel_data_connector_office_365'),

-- Additional Service Fabric resources
('azurerm_service_fabric_application', 'compute', 'Manages a Service Fabric Application', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/service_fabric_application')
ON CONFLICT (type) DO NOTHING;

-- Add HCL examples for Service Fabric
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Service Fabric Cluster with Certificate',
  'resource "azurerm_service_fabric_cluster" "example" {
  name                 = "example-servicefabric"
  resource_group_name  = azurerm_resource_group.example.name
  location             = azurerm_resource_group.example.location
  reliability_level    = "Bronze"
  upgrade_mode         = "Manual"
  vm_image             = "Windows"
  management_endpoint  = "https://example:80"

  node_type {
    name                 = "first"
    instance_count       = 3
    is_primary           = true
    client_endpoint_port = 2020
    http_endpoint_port   = 80
  }

  certificate {
    thumbprint      = "33CC66CC77AA11AA22BB44DD77AA11AA22BB44DD"
    x509_store_name = "My"
  }

  fabric_settings {
    name = "Security"
    parameters = {
      "ClusterCredentialType" = "X509"
    }
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['compute', 'servicefabric', 'cluster']
FROM public.azure_resources 
WHERE type = 'azurerm_service_fabric_cluster';

-- Add Sentinel example
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Sentinel Scheduled Alert Rule',
  'resource "azurerm_sentinel_alert_rule_scheduled" "example" {
  name                       = "example"
  log_analytics_workspace_id = azurerm_log_analytics_workspace.example.id
  display_name               = "example"
  severity                   = "High"
  query                      = <<QUERY
AzureActivity |
  where OperationName == "Create or Update Virtual Machine" or OperationName =="Create Deployment" |
  where ActivityStatus == "Succeeded" |
  make-series dcount(ResourceId) default=0 on EventSubmissionTimestamp in range(ago(7d), now(), 1d) by Caller
QUERY

  query_frequency   = "PT5H"
  query_period      = "PT6H"
  trigger_operator  = "GreaterThan"
  trigger_threshold = 0
  suppression_enabled = false
  tactics           = ["Persistence"]
}',
  ARRAY['security', 'sentinel', 'alert']
FROM public.azure_resources 
WHERE type = 'azurerm_sentinel_alert_rule_scheduled';
