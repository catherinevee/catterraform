
-- Azure Load Balancer and Analytics services
-- This migration focuses on Load Balancer and Analytics related services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Load Balancer
('azurerm_lb', 'networking', 'Manages a Load Balancer', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/lb'),
('azurerm_lb_backend_address_pool', 'networking', 'Manages a Load Balancer Backend Address Pool', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/lb_backend_address_pool'),
('azurerm_lb_rule', 'networking', 'Manages a Load Balancer Rule', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/lb_rule'),

-- Load Test
('azurerm_load_test', 'testing', 'Manages a Load Test', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/load_test'),

-- Log Analytics
('azurerm_log_analytics_workspace', 'monitoring', 'Manages a Log Analytics Workspace', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/log_analytics_workspace'),
('azurerm_log_analytics_solution', 'monitoring', 'Manages a Log Analytics Solution', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/log_analytics_solution'),

-- Logic App
('azurerm_logic_app_workflow', 'integration', 'Manages a Logic App Workflow', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/logic_app_workflow'),
('azurerm_logic_app_trigger_http_request', 'integration', 'Manages a Logic App HTTP Request Trigger', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/logic_app_trigger_http_request');
