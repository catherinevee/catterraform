
export const generateAzureContainerRegistry = (): string => {
  return `# Azure Container Registry (ACR)
resource "azurerm_container_registry" "example" {
  name                     = "\${replace(var.naming_convention, "-", "")}acr"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = var.default_region
  sku                      = "Premium"
  admin_enabled            = false
  anonymous_pull_enabled   = false
  data_endpoint_enabled    = false
  export_policy_enabled    = true
  network_rule_bypass_option = "AzureServices"
  public_network_access_enabled = true
  quarantine_policy_enabled = false
  retention_policy_enabled  = false
  trust_policy_enabled     = false
  zone_redundancy_enabled  = true

  # Encryption configuration
  encryption {
    enabled            = true
    key_vault_key_id   = azurerm_key_vault_key.acr_encryption.id
    identity_client_id = azurerm_user_assigned_identity.acr_encryption.client_id
  }

  # Georeplications for Premium SKU
  georeplications {
    location                  = "East US"
    zone_redundancy_enabled   = true
    regional_endpoint_enabled = false
    tags                      = var.default_tags
  }

  georeplications {
    location                  = "West Europe"
    zone_redundancy_enabled   = false
    regional_endpoint_enabled = true
    tags                      = var.default_tags
  }

  # Identity configuration
  identity {
    type = "UserAssigned"
    identity_ids = [
      azurerm_user_assigned_identity.acr_encryption.id
    ]
  }

  # Network rule set
  network_rule_set {
    default_action = "Allow"

    ip_rule {
      action   = "Allow"
      ip_range = "203.0.113.0/24"
    }

    ip_rule {
      action   = "Allow"
      ip_range = "198.51.100.0/24"
    }

    virtual_network {
      action    = "Allow"
      subnet_id = azurerm_subnet.example.id
    }
  }

  tags = var.default_tags
}

# User Assigned Identity for ACR encryption
resource "azurerm_user_assigned_identity" "acr_encryption" {
  name                = "\${var.naming_convention}-acr-identity"
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name

  tags = var.default_tags
}

# Key Vault for ACR encryption
resource "azurerm_key_vault" "acr_encryption" {
  name                          = "\${var.naming_convention}-acr-kv"
  location                      = var.default_region
  resource_group_name           = azurerm_resource_group.main.name
  enabled_for_disk_encryption   = true
  enabled_for_deployment        = false
  enabled_for_template_deployment = false
  enable_rbac_authorization     = true
  public_network_access_enabled = true
  purge_protection_enabled      = true
  soft_delete_retention_days    = 7
  tenant_id                     = data.azurerm_client_config.current.tenant_id
  sku_name                      = "premium"

  network_acls {
    default_action             = "Allow"
    bypass                     = "AzureServices"
    ip_rules                   = ["203.0.113.0/24"]
    virtual_network_subnet_ids = [azurerm_subnet.example.id]
  }

  tags = var.default_tags
}

# Key Vault Key for ACR encryption
resource "azurerm_key_vault_key" "acr_encryption" {
  name         = "\${var.naming_convention}-acr-key"
  key_vault_id = azurerm_key_vault.acr_encryption.id
  key_type     = "RSA"
  key_size     = 2048
  key_opts = [
    "decrypt",
    "encrypt",
    "sign",
    "unwrapKey",
    "verify",
    "wrapKey",
  ]

  rotation_policy {
    automatic {
      time_before_expiry = "P30D"
    }

    expire_after         = "P90D"
    notify_before_expiry = "P29D"
  }

  tags = var.default_tags
}

# Role assignment for ACR to access Key Vault
resource "azurerm_role_assignment" "acr_key_vault_crypto" {
  scope                = azurerm_key_vault.acr_encryption.id
  role_definition_name = "Key Vault Crypto Service Encryption User"
  principal_id         = azurerm_user_assigned_identity.acr_encryption.principal_id
}

# Data source for current client configuration
data "azurerm_client_config" "current" {}

`;
};
