
-- Azure Maps services
-- This migration focuses on Maps and location services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Maps
('azurerm_maps_account', 'location', 'Manages a Maps Account', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/maps_account'),
('azurerm_maps_creator', 'location', 'Manages a Maps Creator', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/maps_creator');
