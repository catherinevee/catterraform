
-- HCL examples for IoT and Key Vault services
-- This migration adds HCL examples for IoT Hub and Key Vault resources

-- IoT Hub examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Basic IoT Hub',
  'resource "azurerm_iothub" "example" {
  name                = "example-iothub"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location

  sku {
    name     = "B1"
    capacity = "1"
  }

  endpoint {
    type                       = "AzureIotHub.StorageContainer"
    connection_string          = azurerm_storage_account.example.primary_blob_connection_string
    name                       = "export"
    batch_frequency_in_seconds = 60
    max_chunk_size_in_bytes    = 10485760
    container_name             = "iothubdata"
    encoding                   = "Avro"
    file_name_format           = "{iothub}/{partition}_{YYYY}_{MM}_{DD}_{HH}_{mm}"
  }

  route {
    name           = "export"
    source         = "DeviceMessages"
    condition      = "true"
    endpoint_names = ["export"]
    enabled        = true
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['iot', 'hub', 'messaging']
FROM public.azure_resources 
WHERE type = 'azurerm_iothub';

-- Key Vault examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Key Vault with RBAC',
  'resource "azurerm_key_vault" "example" {
  name                        = "example-keyvault"
  location                    = azurerm_resource_group.example.location
  resource_group_name         = azurerm_resource_group.example.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  enable_rbac_authorization = true

  tags = {
    environment = "production"
  }
}',
  ARRAY['security', 'keyvault', 'rbac']
FROM public.azure_resources 
WHERE type = 'azurerm_key_vault';

INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Key Vault Secret',
  'resource "azurerm_key_vault_secret" "example" {
  name         = "secret-sauce"
  value        = "szechuan"
  key_vault_id = azurerm_key_vault.example.id

  tags = {
    environment = "production"
  }
}',
  ARRAY['security', 'keyvault', 'secret']
FROM public.azure_resources 
WHERE type = 'azurerm_key_vault_secret';
