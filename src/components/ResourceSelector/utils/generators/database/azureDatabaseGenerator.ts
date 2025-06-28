
export const generateAzureDatabaseResources = (): string => {
  return `# Azure Cosmos DB Account
resource "azurerm_cosmosdb_account" "example" {
  name                = "\${var.naming_convention}-cosmosdb-account"
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name
  offer_type          = "Standard"
  kind                = "MongoDB"

  enable_automatic_failover       = true
  enable_multiple_write_locations = false
  enable_free_tier               = false
  analytical_storage_enabled     = false
  public_network_access_enabled  = true
  is_virtual_network_filter_enabled = false
  key_vault_key_id               = null
  network_acl_bypass_for_azure_services = false
  network_acl_bypass_ids         = []
  local_authentication_disabled = false
  
  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 300
    max_staleness_prefix    = 100000
  }

  geo_location {
    location          = var.default_region
    failover_priority = 0
    zone_redundant    = false
  }

  capabilities {
    name = "EnableMongo"
  }

  capabilities {
    name = "MongoDBv3.4"
  }

  capabilities {
    name = "mongoEnableDocLevelTTL"
  }

  capabilities {
    name = "DisableRateLimitingResponses"
  }

  backup {
    type                = "Periodic"
    interval_in_minutes = 240
    retention_in_hours  = 8
    storage_redundancy  = "Geo"
  }

  cors_rule {
    allowed_headers    = ["*"]
    allowed_methods    = ["DELETE", "GET", "HEAD", "MERGE", "POST", "OPTIONS", "PUT"]
    allowed_origins    = ["*"]
    exposed_headers    = ["*"]
    max_age_in_seconds = 86400
  }

  identity {
    type = "SystemAssigned"
  }

  tags = var.default_tags
}

# Azure Cosmos DB MongoDB Database
resource "azurerm_cosmosdb_mongo_database" "example" {
  name                = "\${var.naming_convention}-mongodb"
  resource_group_name = azurerm_cosmosdb_account.example.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name

  throughput = 400

  autoscale_settings {
    max_throughput = 4000
  }

  tags = var.default_tags
}

# Azure Cosmos DB MongoDB Collection
resource "azurerm_cosmosdb_mongo_collection" "example" {
  name                = "\${var.naming_convention}-collection"
  resource_group_name = azurerm_cosmosdb_account.example.resource_group_name
  account_name        = azurerm_cosmosdb_account.example.name
  database_name       = azurerm_cosmosdb_mongo_database.example.name

  default_ttl_seconds = 777
  shard_key          = "uniqueKey"
  throughput         = 400

  autoscale_settings {
    max_throughput = 4000
  }

  index {
    keys   = ["_id"]
    unique = true
  }

  index {
    keys   = ["uniqueKey"]
    unique = true
  }

  tags = var.default_tags
}

`;
};
