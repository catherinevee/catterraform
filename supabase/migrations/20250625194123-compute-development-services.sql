
-- Azure resource types (Compute and Development services)
-- This migration focuses on Databricks, Desktop Virtualization, Dev Center, Dev Test, and Digital Twins

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Databricks
('azurerm_databricks_workspace', 'analytics', 'Manages a Databricks Workspace', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/databricks_workspace'),
('azurerm_databricks_virtual_network_peering', 'analytics', 'Manages a Databricks Virtual Network Peering', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/databricks_virtual_network_peering'),

-- Datadog
('azurerm_datadog_monitor', 'monitoring', 'Manages a Datadog Monitor', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitor'),

-- Desktop Virtualization (Azure Virtual Desktop)
('azurerm_virtual_desktop_workspace', 'compute', 'Manages a Virtual Desktop Workspace', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_desktop_workspace'),
('azurerm_virtual_desktop_host_pool', 'compute', 'Manages a Virtual Desktop Host Pool', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_desktop_host_pool'),
('azurerm_virtual_desktop_application_group', 'compute', 'Manages a Virtual Desktop Application Group', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_desktop_application_group'),

-- Dev Center
('azurerm_dev_center', 'development', 'Manages a Dev Center', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/dev_center'),
('azurerm_dev_center_project', 'development', 'Manages a Dev Center Project', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/dev_center_project'),

-- Dev Test
('azurerm_dev_test_lab', 'development', 'Manages a Dev Test Lab', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/dev_test_lab'),
('azurerm_dev_test_virtual_machine', 'development', 'Manages a Dev Test Virtual Machine', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/dev_test_virtual_machine'),

-- Digital Twins
('azurerm_digital_twins_instance', 'iot', 'Manages a Digital Twins Instance', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/digital_twins_instance'),
('azurerm_digital_twins_endpoint_eventgrid', 'iot', 'Manages a Digital Twins Event Grid Endpoint', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/digital_twins_endpoint_eventgrid');

-- Databricks Workspace examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Databricks Workspace with Custom VNet',
  'resource "azurerm_databricks_workspace" "example" {
  name                = "example-workspace"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  sku                 = "premium"

  custom_parameters {
    no_public_ip        = true
    virtual_network_id  = azurerm_virtual_network.example.id
    private_subnet_name = "private-subnet"
    public_subnet_name  = "public-subnet"

    public_subnet_network_security_group_association_id  = azurerm_subnet_network_security_group_association.public.id
    private_subnet_network_security_group_association_id = azurerm_subnet_network_security_group_association.private.id
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['analytics', 'databricks', 'workspace']
FROM public.azure_resources 
WHERE type = 'azurerm_databricks_workspace';

-- Virtual Desktop examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Virtual Desktop Host Pool',
  'resource "azurerm_virtual_desktop_host_pool" "example" {
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  name                 = "example-hostpool"
  friendly_name        = "Example Host Pool"
  validate_environment = true
  description          = "Example Host Pool for demonstration purposes"

  type               = "Pooled"
  maximum_sessions_allowed = 50
  load_balancer_type = "BreadthFirst"

  tags = {
    environment = "production"
  }
}',
  ARRAY['compute', 'vdi', 'hostpool']
FROM public.azure_resources 
WHERE type = 'azurerm_virtual_desktop_host_pool';

-- Dev Test Lab examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Dev Test Lab',
  'resource "azurerm_dev_test_lab" "example" {
  name                = "example-devtestlab"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  tags = {
    environment = "development"
    purpose     = "testing"
  }
}',
  ARRAY['development', 'devtest', 'lab']
FROM public.azure_resources 
WHERE type = 'azurerm_dev_test_lab';

-- Digital Twins examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Digital Twins Instance',
  'resource "azurerm_digital_twins_instance" "example" {
  name                = "example-dt"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location

  identity {
    type = "SystemAssigned"
  }

  tags = {
    environment = "production"
    service     = "iot"
  }
}',
  ARRAY['iot', 'digitaltwins', 'instance']
FROM public.azure_resources 
WHERE type = 'azurerm_digital_twins_instance';
