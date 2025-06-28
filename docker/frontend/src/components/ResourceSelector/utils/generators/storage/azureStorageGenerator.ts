
export const generateAzureStorageResources = (): string => {
  return `# Azure Storage Account
resource "azurerm_storage_account" "example" {
  name                     = "\${var.naming_convention}storageacct"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = var.default_region
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  access_tier              = "Hot"

  # Security and access control
  allow_nested_items_to_be_public   = false
  shared_access_key_enabled         = true
  public_network_access_enabled     = true
  default_to_oauth_authentication   = false
  cross_tenant_replication_enabled  = true
  edge_zone                         = null
  enable_https_traffic_only         = true
  min_tls_version                   = "TLS1_2"
  infrastructure_encryption_enabled = false
  large_file_share_enabled          = false
  nfsv3_enabled                     = false
  is_hns_enabled                    = false
  sftp_enabled                      = false
  queue_encryption_key_type         = "Service"
  table_encryption_key_type         = "Service"

  # Network rules
  network_rules {
    default_action             = "Allow"
    bypass                     = ["AzureServices"]
    ip_rules                   = []
    virtual_network_subnet_ids = []
    
    private_link_access {
      endpoint_resource_id = "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myresourcegroup/providers/Microsoft.Synapse/workspaces/myworkspace"
      endpoint_tenant_id   = data.azurerm_client_config.current.tenant_id
    }
  }

  # Blob properties
  blob_properties {
    versioning_enabled       = false
    change_feed_enabled      = false
    change_feed_retention_in_days = 7
    default_service_version  = "2020-06-12"
    last_access_time_enabled = false

    cors_rule {
      allowed_headers    = ["*"]
      allowed_methods    = ["DELETE", "GET", "HEAD", "MERGE", "POST", "OPTIONS", "PUT", "PATCH"]
      allowed_origins    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 3600
    }

    delete_retention_policy {
      days = 7
    }

    restore_policy {
      days = 6
    }

    container_delete_retention_policy {
      days = 7
    }
  }

  # Queue properties
  queue_properties {
    cors_rule {
      allowed_headers    = ["*"]
      allowed_methods    = ["GET", "HEAD", "MERGE", "POST", "OPTIONS", "PUT", "DELETE"]
      allowed_origins    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 3600
    }

    logging {
      delete                = false
      read                  = false
      write                 = false
      version               = "1.0"
      retention_policy_days = 10
    }

    minute_metrics {
      enabled               = false
      version               = "1.0"
      include_apis          = false
      retention_policy_days = 10
    }

    hour_metrics {
      enabled               = false
      version               = "1.0"
      include_apis          = false
      retention_policy_days = 10
    }
  }

  # Share properties
  share_properties {
    cors_rule {
      allowed_headers    = ["*"]
      allowed_methods    = ["GET", "HEAD", "MERGE", "POST", "OPTIONS", "PUT", "DELETE"]
      allowed_origins    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 3600
    }

    retention_policy {
      days = 7
    }

    smb {
      versions                        = ["SMB2.1"]
      authentication_types            = ["NTLMv2"]
      kerberos_ticket_encryption_type = ["RC4-HMAC"]
      channel_encryption_type         = ["AES-128-CCM"]
      multichannel_enabled            = false
    }
  }

  # Static website
  static_website {
    index_document     = "index.html"
    error_404_document = "404.html"
  }

  # Identity
  identity {
    type = "SystemAssigned"
  }

  # Customer managed key
  customer_managed_key {
    key_vault_key_id          = null
    user_assigned_identity_id = null
  }

  # Azure Files Authentication
  azure_files_authentication {
    directory_type = "None"
  }

  # Routing
  routing {
    publish_internet_endpoints  = false
    publish_microsoft_endpoints = false
    choice                      = "MicrosoftRouting"
  }

  # Immutability policy
  immutability_policy {
    allow_protected_append_writes = false
    state                         = "Unlocked"
    period_since_creation_in_days = 7
  }

  # SAS policy
  sas_policy {
    expiration_period = "90.00:00:00"
    expiration_action = "Log"
  }

  # Allowed copy scope
  allowed_copy_scope = "AAD"

  tags = var.default_tags
}

# Azure Storage Container
resource "azurerm_storage_container" "example" {
  name                  = "\${var.naming_convention}-container"
  storage_account_name  = azurerm_storage_account.example.name
  container_access_type = "private"

  metadata = {
    environment = "production"
  }
}

# Azure Storage Blob
resource "azurerm_storage_blob" "example" {
  name                   = "\${var.naming_convention}-blob"
  storage_account_name   = azurerm_storage_account.example.name
  storage_container_name = azurerm_storage_container.example.name
  type                   = "Block"
  size                   = 5120
  content_type           = "application/octet-stream"
  content_encoding       = "UTF-8"
  content_language       = "en-US"
  content_disposition    = "attachment"
  cache_control          = "max-age=3600"
  source_content         = "Hello, World!"
  content_md5            = null
  parallelism            = 8
  access_tier            = "Hot"

  metadata = {
    environment = "production"
  }
}

`;
};
