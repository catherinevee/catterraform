
-- Azure Machine Learning and Management services
-- This migration focuses on Machine Learning and Management related services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Machine Learning
('azurerm_machine_learning_workspace', 'ai', 'Manages a Machine Learning Workspace', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/machine_learning_workspace'),
('azurerm_machine_learning_compute_cluster', 'ai', 'Manages a Machine Learning Compute Cluster', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/machine_learning_compute_cluster'),
('azurerm_machine_learning_compute_instance', 'ai', 'Manages a Machine Learning Compute Instance', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/machine_learning_compute_instance'),

-- Maintenance
('azurerm_maintenance_configuration', 'management', 'Manages a Maintenance Configuration', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/maintenance_configuration'),
('azurerm_maintenance_assignment_virtual_machine', 'management', 'Manages a Maintenance Assignment for Virtual Machine', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/maintenance_assignment_virtual_machine'),

-- Managed Applications
('azurerm_managed_application', 'management', 'Manages a Managed Application', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/managed_application'),
('azurerm_managed_application_definition', 'management', 'Manages a Managed Application Definition', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/managed_application_definition'),

-- Management
('azurerm_management_group', 'management', 'Manages a Management Group', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/management_group'),
('azurerm_policy_definition', 'management', 'Manages a Policy Definition', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/policy_definition'),
('azurerm_policy_assignment', 'management', 'Manages a Policy Assignment', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/policy_assignment');
