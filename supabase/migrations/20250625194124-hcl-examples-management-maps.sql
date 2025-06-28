
-- HCL examples for Management and Maps services
-- This migration adds HCL examples for Management Groups and Maps Account

-- Management Group examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Management Group',
  'resource "azurerm_management_group" "example" {
  display_name = "Example Management Group"
  
  subscription_ids = [
    data.azurerm_client_config.current.subscription_id,
  ]
}',
  ARRAY['management', 'governance', 'hierarchy']
FROM public.azure_resources 
WHERE type = 'azurerm_management_group';

-- Maps Account examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Maps Account',
  'resource "azurerm_maps_account" "example" {
  name                = "example-maps-account"
  resource_group_name = azurerm_resource_group.example.name
  sku_name            = "S1"

  tags = {
    environment = "production"
  }
}',
  ARRAY['location', 'maps', 'geospatial']
FROM public.azure_resources 
WHERE type = 'azurerm_maps_account';
