
-- HCL examples for Load Balancer and Analytics services
-- This migration adds HCL examples for Load Balancer, Log Analytics, Logic Apps, and Machine Learning

-- Load Balancer examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Standard Load Balancer',
  'resource "azurerm_lb" "example" {
  name                = "example-lb"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  sku                 = "Standard"

  frontend_ip_configuration {
    name                 = "PublicIPAddress"
    public_ip_address_id = azurerm_public_ip.example.id
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['networking', 'loadbalancer', 'standard']
FROM public.azure_resources 
WHERE type = 'azurerm_lb';

-- Log Analytics examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Log Analytics Workspace',
  'resource "azurerm_log_analytics_workspace" "example" {
  name                = "example-workspace"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = {
    environment = "production"
  }
}',
  ARRAY['monitoring', 'loganalytics', 'workspace']
FROM public.azure_resources 
WHERE type = 'azurerm_log_analytics_workspace';

-- Logic App examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Basic Logic App Workflow',
  'resource "azurerm_logic_app_workflow" "example" {
  name                = "workflow1"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  workflow_schema   = "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#"
  workflow_version  = "1.0.0.0"

  tags = {
    environment = "production"
  }
}',
  ARRAY['integration', 'logicapp', 'workflow']
FROM public.azure_resources 
WHERE type = 'azurerm_logic_app_workflow';

-- Machine Learning examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Machine Learning Workspace',
  'resource "azurerm_machine_learning_workspace" "example" {
  name                    = "example-workspace"
  location                = azurerm_resource_group.example.location
  resource_group_name     = azurerm_resource_group.example.name
  application_insights_id = azurerm_application_insights.example.id
  key_vault_id            = azurerm_key_vault.example.id
  storage_account_id      = azurerm_storage_account.example.id

  identity {
    type = "SystemAssigned"
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['ai', 'machinelearning', 'workspace']
FROM public.azure_resources 
WHERE type = 'azurerm_machine_learning_workspace';
