
-- Azure Recovery Services and Redis resources
-- This migration adds Recovery Services and Redis related Azure resources

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Recovery Services (already added in previous migration, but documented here)
('azurerm_backup_policy_file_share', 'backup', 'Manages a Backup Policy for File Share', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/backup_policy_file_share'),
('azurerm_backup_container_storage_account', 'backup', 'Manages a Backup Container Storage Account', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/backup_container_storage_account'),

-- Additional Redis configurations
('azurerm_redis_patch_schedule', 'database', 'Manages a Redis Patch Schedule', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/redis_patch_schedule')
ON CONFLICT (type) DO NOTHING;

-- Add HCL examples for Redis configurations
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Redis with Firewall Rules',
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
    maxmemory_reserved = 10
    maxmemory_delta    = 2
    maxmemory_policy   = "allkeys-lru"
  }

  tags = {
    environment = "production"
  }
}

resource "azurerm_redis_firewall_rule" "example" {
  name                = "someIpRange"
  redis_cache_name    = azurerm_redis_cache.example.name
  resource_group_name = azurerm_resource_group.example.name
  start_ip            = "1.2.3.4"
  end_ip              = "2.3.4.5"
}',
  ARRAY['database', 'redis', 'firewall']
FROM public.azure_resources 
WHERE type = 'azurerm_redis_firewall_rule';
