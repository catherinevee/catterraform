
-- Azure Key Vault and Lighthouse services
-- This migration focuses on Key Vault and Lighthouse related services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Key Vault
('azurerm_key_vault', 'security', 'Manages a Key Vault', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/key_vault'),
('azurerm_key_vault_secret', 'security', 'Manages a Key Vault Secret', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/key_vault_secret'),
('azurerm_key_vault_key', 'security', 'Manages a Key Vault Key', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/key_vault_key'),
('azurerm_key_vault_certificate', 'security', 'Manages a Key Vault Certificate', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/key_vault_certificate'),

-- Lighthouse
('azurerm_lighthouse_definition', 'management', 'Manages a Lighthouse Definition', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/lighthouse_definition'),
('azurerm_lighthouse_assignment', 'management', 'Manages a Lighthouse Assignment', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/lighthouse_assignment');
