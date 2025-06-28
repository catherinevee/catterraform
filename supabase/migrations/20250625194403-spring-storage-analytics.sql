
-- Azure Spring Cloud, Storage, and Analytics services
-- This migration adds Spring Cloud, Storage, and Analytics related Azure resources

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Additional Spring Cloud services
('azurerm_spring_cloud_gateway', 'compute', 'Manages a Spring Cloud Gateway', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/spring_cloud_gateway'),
('azurerm_spring_cloud_api_portal', 'compute', 'Manages a Spring Cloud API Portal', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/spring_cloud_api_portal'),

-- Additional Storage services
('azurerm_storage_data_lake_gen2_filesystem', 'storage', 'Manages a Storage Data Lake Gen2 Filesystem', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_data_lake_gen2_filesystem'),
('azurerm_storage_sync', 'storage', 'Manages a Storage Sync', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_sync')
ON CONFLICT (type) DO NOTHING;

-- Add HCL examples for Spring Cloud
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Spring Cloud Service with App',
  'resource "azurerm_spring_cloud_service" "example" {
  name                = "example-springcloud"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  sku_name            = "S0"

  config_server_git_setting {
    uri          = "https://github.com/Azure-Samples/piggymetrics"
    label        = "config"
    search_paths = ["dir1", "dir2"]
  }

  tags = {
    environment = "production"
  }
}

resource "azurerm_spring_cloud_app" "example" {
  name                = "example-springcloudapp"
  resource_group_name = azurerm_resource_group.example.name
  service_name        = azurerm_spring_cloud_service.example.name
  is_public           = true
  https_only          = true

  identity {
    type = "SystemAssigned"
  }
}',
  ARRAY['compute', 'springcloud', 'microservices']
FROM public.azure_resources 
WHERE type = 'azurerm_spring_cloud_service';

-- Add Storage examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Storage Account with Containers',
  'resource "azurerm_storage_account" "example" {
  name                     = "examplestorageaccount"
  resource_group_name      = azurerm_resource_group.example.name
  location                 = azurerm_resource_group.example.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    environment = "production"
  }
}

resource "azurerm_storage_container" "example" {
  name                  = "content"
  storage_account_name  = azurerm_storage_account.example.name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "example" {
  name                   = "my-awesome-content.zip"
  storage_account_name   = azurerm_storage_account.example.name
  storage_container_name = azurerm_storage_container.example.name
  type                   = "Block"
  source                 = "some-local-file.zip"
}',
  ARRAY['storage', 'blob', 'container']
FROM public.azure_resources 
WHERE type = 'azurerm_storage_container';
