
-- Azure resource types (Data and Analytics services)
-- This migration focuses on Data Explorer, Data Factory, Data Share, and Data Protection services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Data Explorer (Azure Data Explorer/Kusto)
('azurerm_kusto_cluster', 'analytics', 'Manages a Kusto Cluster', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/kusto_cluster'),
('azurerm_kusto_database', 'analytics', 'Manages a Kusto Database', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/kusto_database'),

-- Data Factory
('azurerm_data_factory', 'analytics', 'Manages a Data Factory', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/data_factory'),
('azurerm_data_factory_pipeline', 'analytics', 'Manages a Data Factory Pipeline', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/data_factory_pipeline'),
('azurerm_data_factory_dataset_sql_server_table', 'analytics', 'Manages a Data Factory Dataset SQL Server Table', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/data_factory_dataset_sql_server_table'),

-- Data Share
('azurerm_data_share_account', 'analytics', 'Manages a Data Share Account', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/data_share_account'),
('azurerm_data_share', 'analytics', 'Manages a Data Share', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/data_share'),

-- Data Protection
('azurerm_data_protection_backup_vault', 'security', 'Manages a Data Protection Backup Vault', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/data_protection_backup_vault'),
('azurerm_data_protection_backup_policy_blob_storage', 'security', 'Manages a Data Protection Backup Policy for Blob Storage', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/data_protection_backup_policy_blob_storage');

-- Data Factory examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Basic Data Factory',
  'resource "azurerm_data_factory" "example" {
  name                = "example-datafactory"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  github_configuration {
    account_name    = "myaccount"
    branch_name     = "main"
    git_url         = "https://github.com"
    repository_name = "myrepository"
    root_folder     = "/"
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['analytics', 'datafactory', 'etl']
FROM public.azure_resources 
WHERE type = 'azurerm_data_factory';

-- Kusto Cluster examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Kusto Cluster (Azure Data Explorer)',
  'resource "azurerm_kusto_cluster" "example" {
  name                = "example-kusto-cluster"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  sku {
    name     = "Standard_D13_v2"
    capacity = 2
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['analytics', 'kusto', 'cluster']
FROM public.azure_resources 
WHERE type = 'azurerm_kusto_cluster';

-- Data Protection Backup Vault examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'Data Protection Backup Vault',
  'resource "azurerm_data_protection_backup_vault" "example" {
  name                = "example-backup-vault"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  datastore_type      = "VaultStore"
  redundancy          = "LocallyRedundant"

  identity {
    type = "SystemAssigned"
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['security', 'backup', 'vault']
FROM public.azure_resources 
WHERE type = 'azurerm_data_protection_backup_vault';
