
-- Simplified Azure resource types table
CREATE TABLE public.azure_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL UNIQUE, -- e.g., "azurerm_virtual_machine"
  category TEXT NOT NULL,
  description TEXT,
  docs_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Combined arguments and validation in one table
CREATE TABLE public.resource_arguments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID REFERENCES public.azure_resources(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- "string", "number", "bool", "list", "map"
  required BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  validation JSONB, -- All validation rules, patterns, examples in one JSON field
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Simplified examples table
CREATE TABLE public.hcl_examples (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID REFERENCES public.azure_resources(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Global validation rules (independent of specific resources)
CREATE TABLE public.validation_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- "syntax", "semantic", "best_practice"
  pattern TEXT,
  message TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'error',
  applies_to TEXT[], -- Resource types this applies to
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Essential indexes only
CREATE INDEX idx_azure_resources_type ON public.azure_resources(type);
CREATE INDEX idx_azure_resources_category ON public.azure_resources(category);
CREATE INDEX idx_resource_arguments_resource_id ON public.resource_arguments(resource_id);
CREATE INDEX idx_hcl_examples_resource_id ON public.hcl_examples(resource_id);

-- Enable RLS with public read access
ALTER TABLE public.azure_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_arguments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hcl_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.validation_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read azure_resources" ON public.azure_resources FOR SELECT USING (true);
CREATE POLICY "Public read resource_arguments" ON public.resource_arguments FOR SELECT USING (true);
CREATE POLICY "Public read hcl_examples" ON public.hcl_examples FOR SELECT USING (true);
CREATE POLICY "Public read validation_rules" ON public.validation_rules FOR SELECT USING (true);

-- Sample data
INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
('azurerm_virtual_machine', 'compute', 'Manages a Virtual Machine', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine'),
('azurerm_storage_account', 'storage', 'Manages a Storage Account', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_account'),
('azurerm_virtual_network', 'networking', 'Manages a Virtual Network', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_network'),
('azurerm_resource_group', 'management', 'Manages a Resource Group', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group');

INSERT INTO public.validation_rules (name, type, pattern, message, severity, applies_to) VALUES
('storage_account_name', 'validation', '^[a-z0-9]{3,24}$', 'Storage account name must be 3-24 characters, lowercase and numbers only', 'error', ARRAY['azurerm_storage_account']),
('required_location', 'semantic', null, 'Resource must specify a location', 'error', ARRAY['azurerm_virtual_machine', 'azurerm_storage_account', 'azurerm_virtual_network']);
