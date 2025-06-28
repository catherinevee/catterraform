
-- Azure resource types (DNS and Dashboard services)
-- This migration focuses on DNS and Dashboard related services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- DNS
('azurerm_dns_zone', 'networking', 'Manages a DNS Zone', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/dns_zone'),
('azurerm_dns_a_record', 'networking', 'Manages a DNS A Record', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/dns_a_record'),
('azurerm_dns_cname_record', 'networking', 'Manages a DNS CNAME Record', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/dns_cname_record'),

-- Dashboard
('azurerm_dashboard', 'monitoring', 'Manages a Dashboard', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/dashboard'),
('azurerm_portal_dashboard', 'monitoring', 'Manages a Portal Dashboard', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/portal_dashboard');

-- DNS Zone examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Basic DNS Zone',
  'resource "azurerm_dns_zone" "example" {
  name                = "example.com"
  resource_group_name = azurerm_resource_group.example.name

  tags = {
    environment = "production"
  }
}',
  ARRAY['networking', 'dns', 'zone']
FROM public.azure_resources 
WHERE type = 'azurerm_dns_zone';

INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'DNS A Record',
  'resource "azurerm_dns_a_record" "example" {
  name                = "www"
  zone_name           = azurerm_dns_zone.example.name
  resource_group_name = azurerm_resource_group.example.name
  ttl                 = 300
  records             = ["10.0.180.17"]

  tags = {
    environment = "production"
  }
}',
  ARRAY['networking', 'dns', 'a-record']
FROM public.azure_resources 
WHERE type = 'azurerm_dns_a_record';
