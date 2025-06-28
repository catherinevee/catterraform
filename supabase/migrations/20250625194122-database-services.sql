
-- Azure resource types (Database services)
-- This migration focuses on SQL Database and Database Migration services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Database (SQL Database)
('azurerm_mssql_server', 'database', 'Manages a Microsoft SQL Server', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mssql_server'),
('azurerm_mssql_database', 'database', 'Manages a Microsoft SQL Database', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mssql_database'),
('azurerm_mssql_elasticpool', 'database', 'Manages a Microsoft SQL Elastic Pool', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mssql_elasticpool'),

-- Database Migration
('azurerm_database_migration_project', 'database', 'Manages a Database Migration Project', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/database_migration_project'),
('azurerm_database_migration_service', 'database', 'Manages a Database Migration Service', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/database_migration_service'),

-- Databox Edge
('azurerm_databox_edge_device', 'storage', 'Manages a Databox Edge Device', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/databox_edge_device');

-- SQL Server and Database examples
INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'SQL Server with Azure AD Authentication',
  'resource "azurerm_mssql_server" "example" {
  name                         = "example-sqlserver"
  resource_group_name          = azurerm_resource_group.example.name
  location                     = azurerm_resource_group.example.location
  version                      = "12.0"
  administrator_login          = "sqladmin"
  administrator_login_password = "ThisIsAPassword123!"

  azuread_administrator {
    login_username = "AzureAD Admin"
    object_id      = "00000000-0000-0000-0000-000000000000"
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['database', 'sql', 'server']
FROM public.azure_resources 
WHERE type = 'azurerm_mssql_server';

INSERT INTO public.hcl_examples (resource_id, name, code, tags)
SELECT 
  id,
  'SQL Database with Auto-scaling',
  'resource "azurerm_mssql_database" "example" {
  name           = "example-database"
  server_id      = azurerm_mssql_server.example.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  license_type   = "LicenseIncluded"
  max_size_gb    = 4
  sku_name       = "S0"
  zone_redundant = false

  extended_auditing_policy {
    storage_endpoint                        = azurerm_storage_account.example.primary_blob_endpoint
    storage_account_access_key              = azurerm_storage_account.example.primary_access_key
    storage_account_access_key_is_secondary = true
    retention_in_days                       = 30
  }

  tags = {
    environment = "production"
  }
}',
  ARRAY['database', 'sql', 'database']
FROM public.azure_resources 
WHERE type = 'azurerm_mssql_database';
