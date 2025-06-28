
-- Add more Azure resource types to the database
INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Bot services
('azurerm_bot_service', 'ai', 'Manages a Bot Service', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/bot_service'),
('azurerm_bot_channel_web_chat', 'ai', 'Manages a Bot Channel Web Chat', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/bot_channel_web_chat'),

-- CDN
('azurerm_cdn_profile', 'networking', 'Manages a CDN Profile', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cdn_profile'),
('azurerm_cdn_endpoint', 'networking', 'Manages a CDN Endpoint', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cdn_endpoint'),

-- Cognitive Services
('azurerm_cognitive_account', 'ai', 'Manages a Cognitive Services Account', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cognitive_account'),

-- Communication Services
('azurerm_communication_service', 'communication', 'Manages a Communication Service', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/communication_service'),

-- Container Services
('azurerm_container_registry', 'container', 'Manages a Container Registry', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_registry'),
('azurerm_kubernetes_cluster', 'container', 'Manages a Kubernetes Cluster (AKS)', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/kubernetes_cluster'),
('azurerm_container_group', 'container', 'Manages a Container Group', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_group'),

-- Container Apps
('azurerm_container_app', 'container', 'Manages a Container App', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_app'),
('azurerm_container_app_environment', 'container', 'Manages a Container App Environment', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_app_environment'),

-- CosmosDB
('azurerm_cosmosdb_account', 'database', 'Manages a CosmosDB Account', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cosmosdb_account'),
('azurerm_cosmosdb_sql_database', 'database', 'Manages a CosmosDB SQL Database', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cosmosdb_sql_database'),

-- Cost Management
('azurerm_consumption_budget_resource_group', 'management', 'Manages a Consumption Budget for Resource Group', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/consumption_budget_resource_group'),
('azurerm_cost_anomaly_alert', 'management', 'Manages a Cost Anomaly Alert', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cost_anomaly_alert'),

-- Blueprints
('azurerm_blueprint_assignment', 'management', 'Manages a Blueprint Assignment', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/blueprint_assignment'),

-- Confidential Ledger
('azurerm_confidential_ledger', 'security', 'Manages a Confidential Ledger', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/confidential_ledger'),

-- Connections (Logic Apps)
('azurerm_api_connection', 'integration', 'Manages an API Connection', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/api_connection'),

-- Additional compute resources
('azurerm_virtual_machine_scale_set', 'compute', 'Manages a Virtual Machine Scale Set', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_scale_set'),
('azurerm_availability_set', 'compute', 'Manages an Availability Set', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/availability_set');

-- Add HCL examples for the new resource types

-- Bot Service examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Basic Bot Service',
  'resource "azurerm_bot_service" "example" {
  name                = "example-bot"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  sku                 = "F0"
  microsoft_app_id    = "12345678-1234-1234-1234-123456789012"

  tags = {
    environment = "development"
  }
}',
  ARRAY['ai', 'bot', 'basic']
FROM public.azure_resources 
WHERE type = 'azurerm_bot_service';

-- CDN Profile and Endpoint examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'CDN Profile with Standard Microsoft',
  'resource "azurerm_cdn_profile" "example" {
  name                = "example-cdn-profile"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  sku                 = "Standard_Microsoft"

  tags = {
    environment = "production"
    service     = "cdn"
  }
}',
  ARRAY['networking', 'cdn', 'profile']
FROM public.azure_resources 
WHERE type = 'azurerm_cdn_profile';

INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'CDN Endpoint with Custom Domain',
  'resource "azurerm_cdn_endpoint" "example" {
  name                = "example-cdn-endpoint"
  profile_name        = azurerm_cdn_profile.example.name
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  origin {
    name      = "example"
    host_name = "www.example.com"
  }

  delivery_rule {
    name  = "EnforceHTTPS"
    order = 1

    request_scheme_condition {
      operator     = "Equal"
      match_values = ["HTTP"]
    }

    url_redirect_action {
      redirect_type = "Found"
      protocol      = "Https"
    }
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['networking', 'cdn', 'endpoint']
FROM public.azure_resources 
WHERE type = 'azurerm_cdn_endpoint';

-- Cognitive Services examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'OpenAI Cognitive Service',
  'resource "azurerm_cognitive_account" "openai" {
  name                = "example-openai"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  kind                = "OpenAI"
  sku_name           = "S0"

  custom_subdomain_name = "example-openai"
  
  tags = {
    environment = "production"
    service     = "ai"
  }
}',
  ARRAY['ai', 'cognitive', 'openai']
FROM public.azure_resources 
WHERE type = 'azurerm_cognitive_account';

INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Computer Vision Cognitive Service',
  'resource "azurerm_cognitive_account" "computer_vision" {
  name                = "example-computer-vision"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  kind                = "ComputerVision"
  sku_name           = "F0"

  tags = {
    environment = "development"
    service     = "computer-vision"
  }
}',
  ARRAY['ai', 'cognitive', 'computer-vision']
FROM public.azure_resources 
WHERE type = 'azurerm_cognitive_account';

-- Container Registry examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Basic Container Registry',
  'resource "azurerm_container_registry" "acr" {
  name                = "exampleacr"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  sku                 = "Standard"
  admin_enabled       = false

  georeplications {
    location                = "East US"
    zone_redundancy_enabled = true
    tags = {}
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['container', 'registry', 'basic']
FROM public.azure_resources 
WHERE type = 'azurerm_container_registry';

-- AKS Cluster examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Basic AKS Cluster',
  'resource "azurerm_kubernetes_cluster" "example" {
  name                = "example-aks1"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  dns_prefix          = "exampleaks1"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Production"
  }
}',
  ARRAY['container', 'kubernetes', 'aks']
FROM public.azure_resources 
WHERE type = 'azurerm_kubernetes_cluster';

-- CosmosDB examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'CosmosDB Account with SQL API',
  'resource "azurerm_cosmosdb_account" "db" {
  name                = "example-cosmosdb"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  enable_automatic_failover = true

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 300
    max_staleness_prefix    = 100000
  }

  geo_location {
    location          = azurerm_resource_group.example.location
    failover_priority = 0
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['database', 'cosmosdb', 'nosql']
FROM public.azure_resources 
WHERE type = 'azurerm_cosmosdb_account';

-- Container App examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Container App Environment',
  'resource "azurerm_container_app_environment" "example" {
  name                       = "example-container-app-env"
  location                   = azurerm_resource_group.example.location
  resource_group_name        = azurerm_resource_group.example.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.example.id

  tags = {
    environment = "production"
  }
}',
  ARRAY['container', 'containerapp', 'environment']
FROM public.azure_resources 
WHERE type = 'azurerm_container_app_environment';

INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Basic Container App',
  'resource "azurerm_container_app" "example" {
  name                         = "example-container-app"
  container_app_environment_id = azurerm_container_app_environment.example.id
  resource_group_name          = azurerm_resource_group.example.name
  revision_mode                = "Single"

  template {
    container {
      name   = "examplecontainerapp"
      image  = "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest"
      cpu    = 0.25
      memory = "0.5Gi"
    }
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 80
    
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['container', 'containerapp', 'web']
FROM public.azure_resources 
WHERE type = 'azurerm_container_app';

-- Virtual Machine Scale Set example
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Linux Virtual Machine Scale Set',
  'resource "azurerm_virtual_machine_scale_set" "example" {
  name                = "example-vmss"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  upgrade_policy_mode = "Manual"

  sku {
    name     = "Standard_F2"
    tier     = "Standard"
    capacity = 2
  }

  storage_profile_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "16.04-LTS"
    version   = "latest"
  }

  storage_profile_os_disk {
    name              = ""
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
  }

  os_profile {
    computer_name_prefix = "testvm"
    admin_username       = "myadmin"
  }

  os_profile_linux_config {
    disable_password_authentication = true

    ssh_keys {
      path     = "/home/myadmin/.ssh/authorized_keys"
      key_data = file("~/.ssh/demo_key.pub")
    }
  }

  network_profile {
    name    = "terraformnetworkprofile"
    primary = true

    ip_configuration {
      name                                   = "TestIPConfiguration"
      primary                                = true
      subnet_id                              = azurerm_subnet.internal.id
    }
  }

  tags = {
    environment = "staging"
  }
}',
  ARRAY['compute', 'vmss', 'scaleset']
FROM public.azure_resources 
WHERE type = 'azurerm_virtual_machine_scale_set';

-- Communication Service example
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Communication Service',
  'resource "azurerm_communication_service" "example" {
  name                = "example-communication-service"
  resource_group_name = azurerm_resource_group.example.name
  data_location       = "United States"

  tags = {
    environment = "production"
  }
}',
  ARRAY['communication', 'service']
FROM public.azure_resources 
WHERE type = 'azurerm_communication_service';
