
-- Add only new Azure resource types that don't already exist
INSERT INTO public.azure_resources (type, category, description, docs_url) 
VALUES
-- Recovery Services
('azurerm_recovery_services_vault', 'backup', 'Manages a Recovery Services Vault', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/recovery_services_vault'),
('azurerm_backup_policy_vm', 'backup', 'Manages a Backup Policy for Virtual Machines', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/backup_policy_vm'),
('azurerm_backup_protected_vm', 'backup', 'Manages a Backup Protected Virtual Machine', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/backup_protected_vm'),
('azurerm_site_recovery_fabric', 'backup', 'Manages a Site Recovery Fabric', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/site_recovery_fabric'),

-- Red Hat OpenShift
('azurerm_redhat_openshift_cluster', 'compute', 'Manages a Red Hat OpenShift Cluster', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/redhat_openshift_cluster'),
('azurerm_redhat_openshift_domain', 'compute', 'Manages a Red Hat OpenShift Domain', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/redhat_openshift_domain'),

-- Redis
('azurerm_redis_cache', 'database', 'Manages a Redis Cache', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/redis_cache'),
('azurerm_redis_firewall_rule', 'database', 'Manages a Redis Firewall Rule', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/redis_firewall_rule'),
('azurerm_redis_linked_server', 'database', 'Manages a Redis Linked Server', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/redis_linked_server'),

-- Redis Enterprise
('azurerm_redis_enterprise_cluster', 'database', 'Manages a Redis Enterprise Cluster', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/redis_enterprise_cluster'),
('azurerm_redis_enterprise_database', 'database', 'Manages a Redis Enterprise Database', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/redis_enterprise_database'),

-- Search
('azurerm_search_service', 'search', 'Manages a Search Service', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/search_service'),
('azurerm_search_shared_private_link_service', 'search', 'Manages a Search Shared Private Link Service', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/search_shared_private_link_service'),

-- Security Center
('azurerm_security_center_contact', 'security', 'Manages Security Center Contact', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/security_center_contact'),
('azurerm_security_center_workspace', 'security', 'Manages Security Center Workspace', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/security_center_workspace'),
('azurerm_security_center_assessment', 'security', 'Manages a Security Center Assessment', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/security_center_assessment'),
('azurerm_security_center_auto_provisioning', 'security', 'Manages Security Center Auto Provisioning', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/security_center_auto_provisioning'),

-- Sentinel
('azurerm_sentinel_data_connector_aws_cloud_trail', 'security', 'Manages a Sentinel AWS CloudTrail Data Connector', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/sentinel_data_connector_aws_cloud_trail'),
('azurerm_sentinel_data_connector_azure_active_directory', 'security', 'Manages a Sentinel Azure Active Directory Data Connector', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/sentinel_data_connector_azure_active_directory'),
('azurerm_sentinel_alert_rule_scheduled', 'security', 'Manages a Sentinel Scheduled Alert Rule', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/sentinel_alert_rule_scheduled'),
('azurerm_sentinel_watchlist', 'security', 'Manages a Sentinel Watchlist', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/sentinel_watchlist'),

-- Service Fabric
('azurerm_service_fabric_cluster', 'compute', 'Manages a Service Fabric Cluster', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/service_fabric_cluster'),
('azurerm_service_fabric_node_type', 'compute', 'Manages a Service Fabric Node Type', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/service_fabric_node_type'),

-- Service Fabric Managed Clusters
('azurerm_service_fabric_managed_cluster', 'compute', 'Manages a Service Fabric Managed Cluster', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/service_fabric_managed_cluster'),
('azurerm_service_fabric_managed_node_type', 'compute', 'Manages a Service Fabric Managed Node Type', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/service_fabric_managed_node_type'),

-- Service Networking
('azurerm_application_load_balancer', 'networking', 'Manages an Application Load Balancer', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/application_load_balancer'),
('azurerm_application_load_balancer_frontend', 'networking', 'Manages an Application Load Balancer Frontend', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/application_load_balancer_frontend'),

-- Spring Cloud
('azurerm_spring_cloud_service', 'compute', 'Manages a Spring Cloud Service', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/spring_cloud_service'),
('azurerm_spring_cloud_app', 'compute', 'Manages a Spring Cloud App', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/spring_cloud_app'),
('azurerm_spring_cloud_java_deployment', 'compute', 'Manages a Spring Cloud Java Deployment', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/spring_cloud_java_deployment'),

-- Additional Storage types not already in DB
('azurerm_storage_container', 'storage', 'Manages a Storage Container', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container'),
('azurerm_storage_blob', 'storage', 'Manages a Storage Blob', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_blob'),
('azurerm_storage_queue', 'storage', 'Manages a Storage Queue', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_queue'),
('azurerm_storage_table', 'storage', 'Manages a Storage Table', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_table'),
('azurerm_storage_share', 'storage', 'Manages a Storage File Share', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_share'),

-- Storage Mover
('azurerm_storage_mover', 'storage', 'Manages a Storage Mover', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_mover'),
('azurerm_storage_mover_agent', 'storage', 'Manages a Storage Mover Agent', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_mover_agent'),
('azurerm_storage_mover_job_definition', 'storage', 'Manages a Storage Mover Job Definition', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_mover_job_definition'),

-- Stream Analytics
('azurerm_stream_analytics_job', 'analytics', 'Manages a Stream Analytics Job', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/stream_analytics_job'),
('azurerm_stream_analytics_output_blob', 'analytics', 'Manages a Stream Analytics Output Blob', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/stream_analytics_output_blob'),
('azurerm_stream_analytics_stream_input_blob', 'analytics', 'Manages a Stream Analytics Stream Input Blob', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/stream_analytics_stream_input_blob'),
('azurerm_stream_analytics_function_javascript_uda', 'analytics', 'Manages a Stream Analytics JavaScript UDA Function', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/stream_analytics_function_javascript_uda'),

-- Synapse
('azurerm_synapse_workspace', 'analytics', 'Manages a Synapse Workspace', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/synapse_workspace'),
('azurerm_synapse_sql_pool', 'analytics', 'Manages a Synapse SQL Pool', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/synapse_sql_pool'),
('azurerm_synapse_spark_pool', 'analytics', 'Manages a Synapse Spark Pool', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/synapse_spark_pool'),
('azurerm_synapse_firewall_rule', 'analytics', 'Manages a Synapse Firewall Rule', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/synapse_firewall_rule'),
('azurerm_synapse_integration_runtime_azure', 'analytics', 'Manages a Synapse Azure Integration Runtime', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/synapse_integration_runtime_azure')
ON CONFLICT (type) DO NOTHING;

-- Add HCL examples for key resource types

-- Recovery Services Vault example
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Recovery Services Vault with VM Backup',
  'resource "azurerm_recovery_services_vault" "example" {
  name                = "example-recovery-vault"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  sku                 = "Standard"

  soft_delete_enabled = true

  tags = {
    environment = "production"
  }
}

resource "azurerm_backup_policy_vm" "example" {
  name                = "example-recovery-vault-policy"
  resource_group_name = azurerm_resource_group.example.name
  recovery_vault_name = azurerm_recovery_services_vault.example.name

  backup {
    frequency = "Daily"
    time      = "23:00"
  }

  retention_daily {
    count = 10
  }

  retention_weekly {
    count    = 42
    weekdays = ["Sunday", "Wednesday", "Friday", "Saturday"]
  }

  retention_monthly {
    count    = 7
    weekdays = ["Sunday", "Wednesday"]
    weeks    = ["First", "Last"]
  }

  retention_yearly {
    count    = 77
    weekdays = ["Sunday"]
    weeks    = ["Last"]
    months   = ["January"]
  }
}',
  ARRAY['backup', 'recovery', 'vault']
FROM public.azure_resources 
WHERE type = 'azurerm_recovery_services_vault';

-- Redis Cache example
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Redis Cache with SSL',
  'resource "azurerm_redis_cache" "example" {
  name                = "example-cache"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  capacity            = 2
  family              = "C"
  sku_name            = "Standard"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"

  redis_configuration {
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['database', 'cache', 'redis']
FROM public.azure_resources 
WHERE type = 'azurerm_redis_cache';

-- Search Service example
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Search Service',
  'resource "azurerm_search_service" "example" {
  name                = "example-search-service"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  sku                 = "standard"

  tags = {
    environment = "production"
  }
}',
  ARRAY['search', 'cognitive', 'service']
FROM public.azure_resources 
WHERE type = 'azurerm_search_service';

-- Synapse Workspace example
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Synapse Workspace with SQL Pool',
  'resource "azurerm_synapse_workspace" "example" {
  name                                 = "example"
  resource_group_name                  = azurerm_resource_group.example.name
  location                             = azurerm_resource_group.example.location
  storage_data_lake_gen2_filesystem_id = azurerm_storage_data_lake_gen2_filesystem.example.id
  sql_administrator_login              = "sqladminuser"
  sql_administrator_login_password     = "H@Sh1CoR3!"

  tags = {
    environment = "production"
  }
}

resource "azurerm_synapse_sql_pool" "example" {
  name                 = "examplesqlpool"
  synapse_workspace_id = azurerm_synapse_workspace.example.id
  sku_name             = "DW100c"
  create_mode          = "Default"

  tags = {
    environment = "production"
  }
}',
  ARRAY['analytics', 'synapse', 'datawarehouse']
FROM public.azure_resources 
WHERE type = 'azurerm_synapse_workspace';

-- Stream Analytics Job example
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Stream Analytics Job',
  'resource "azurerm_stream_analytics_job" "example" {
  name                                     = "example-job"
  resource_group_name                      = azurerm_resource_group.example.name
  location                                 = azurerm_resource_group.example.location
  compatibility_level                      = "1.2"
  data_locale                              = "en-GB"
  events_late_arrival_max_delay_in_seconds = 60
  events_out_of_order_max_delay_in_seconds = 50
  events_out_of_order_policy               = "Adjust"
  output_error_policy                      = "Drop"
  streaming_units                          = 3

  tags = {
    environment = "production"
  }

  transformation_query = <<QUERY
    SELECT *
    INTO [YourOutputAlias]
    FROM [YourInputAlias]
QUERY

}',
  ARRAY['analytics', 'streaming', 'realtime']
FROM public.azure_resources 
WHERE type = 'azurerm_stream_analytics_job';
