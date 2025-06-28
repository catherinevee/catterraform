
-- Azure Search and Security services
-- This migration adds Search and Security Center related Azure resources

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Additional Search services
('azurerm_search_private_endpoint_connection', 'search', 'Manages a Search Private Endpoint Connection', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/search_private_endpoint_connection'),

-- Additional Security Center services
('azurerm_security_center_subscription_pricing', 'security', 'Manages Security Center Subscription Pricing', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/security_center_subscription_pricing'),
('azurerm_security_center_setting', 'security', 'Manages a Security Center Setting', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/security_center_setting')
ON CONFLICT (type) DO NOTHING;

-- Add HCL examples for Security Center
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Security Center Contact Configuration',
  'resource "azurerm_security_center_contact" "example" {
  email = "contact@example.com"
  phone = "+1-555-555-5555"

  alert_notifications                = true
  alerts_to_admins                   = true
  notification_by_role {
    role                             = "Owner"
    enabled                          = true
  }
}

resource "azurerm_security_center_workspace" "example" {
  scope        = "/subscriptions/00000000-0000-0000-0000-000000000000"
  workspace_id = azurerm_log_analytics_workspace.example.id
}',
  ARRAY['security', 'monitoring', 'alerts']
FROM public.azure_resources 
WHERE type = 'azurerm_security_center_contact';
