
export const generateAzureCostManagementResources = (): string => {
  return `# Azure Cost Management Resources

# Billing Account Cost Management Export
resource "azurerm_billing_account_cost_management_export" "example" {
  name                         = "\${var.naming_convention}-billing-export"
  billing_account_id          = "/providers/Microsoft.Billing/billingAccounts/\${var.billing_account_id}"
  recurrence_type             = "Monthly"
  recurrence_period_start_date = "2024-01-01T00:00:00Z"
  recurrence_period_end_date   = "2024-12-31T23:59:59Z"

  export_data_storage_location {
    container_id     = azurerm_storage_container.cost_exports.resource_manager_id
    root_folder_path = "/exports"
  }

  export_data_options {
    type       = "ActualCost"
    time_frame = "MonthToDate"
  }

  active = true
}

# Cost Anomaly Alert
resource "azurerm_cost_anomaly_alert" "example" {
  name            = "\${var.naming_convention}-cost-anomaly-alert"
  display_name    = "\${var.naming_convention} Cost Anomaly Alert"
  email_subject   = "Cost Anomaly Detected"
  email_addresses = ["admin@company.com"]
  message         = "A cost anomaly has been detected for your Azure resources."
  
  subscription_id = data.azurerm_client_config.current.subscription_id
}

# Cost Management Scheduled Action
resource "azurerm_cost_management_scheduled_action" "example" {
  name         = "\${var.naming_convention}-scheduled-action"
  display_name = "\${var.naming_convention} Weekly Cost Report"
  view_id      = azurerm_resource_group_cost_management_view.example.id
  
  email_address_sender = "noreply@company.com"
  email_addresses      = ["admin@company.com", "finance@company.com"]
  email_subject        = "Weekly Cost Report for \${var.naming_convention}"
  message              = "Please find attached the weekly cost report for your Azure resources."
  
  schedule {
    frequency           = "Weekly"
    hour_of_day        = 9
    days_of_week       = ["Monday"]
    weeks_of_month     = [1, 2, 3, 4]
    day_of_month       = null
    start_date         = "2024-01-01T00:00:00Z"
    end_date           = "2024-12-31T23:59:59Z"
  }

  file_formats = ["Csv"]
}

# Resource Group Cost Management Export
resource "azurerm_resource_group_cost_management_export" "example" {
  name                         = "\${var.naming_convention}-rg-export"
  resource_group_id           = azurerm_resource_group.main.id
  recurrence_type             = "Monthly"
  recurrence_period_start_date = "2024-01-01T00:00:00Z"
  recurrence_period_end_date   = "2024-12-31T23:59:59Z"

  export_data_storage_location {
    container_id     = azurerm_storage_container.cost_exports.resource_manager_id
    root_folder_path = "/resource-group-exports"
  }

  export_data_options {
    type       = "ActualCost"
    time_frame = "MonthToDate"
  }

  active = true
}

# Resource Group Cost Management View
resource "azurerm_resource_group_cost_management_view" "example" {
  name              = "\${var.naming_convention}-rg-cost-view"
  display_name      = "\${var.naming_convention} Resource Group Cost View"
  resource_group_id = azurerm_resource_group.main.id
  chart_type        = "Table"
  accumulated       = true
  
  pivot {
    name = "ResourceGroup"
    type = "Dimension"
  }

  pivot {
    name = "ServiceName"
    type = "Dimension"
  }

  dataset {
    aggregation {
      name        = "PreTaxCost"
      column_name = "PreTaxCost"
    }
    
    granularity = "Monthly"
    
    grouping {
      name = "ResourceGroup"
      type = "Dimension"
    }

    grouping {
      name = "ServiceName"
      type = "Dimension"
    }

    sorting {
      direction = "Ascending"
      name      = "PreTaxCost"
    }

    filter {
      dimension {
        name     = "ResourceGroup"
        operator = "In"
        values   = [azurerm_resource_group.main.name]
      }
    }
  }

  kpi {
    type = "Budget"
  }

  kpi {
    type = "Forecast"
  }
}

# Subscription Cost Management Export
resource "azurerm_subscription_cost_management_export" "example" {
  name                         = "\${var.naming_convention}-subscription-export"
  subscription_id             = data.azurerm_client_config.current.subscription_id
  recurrence_type             = "Monthly"
  recurrence_period_start_date = "2024-01-01T00:00:00Z"
  recurrence_period_end_date   = "2024-12-31T23:59:59Z"

  export_data_storage_location {
    container_id     = azurerm_storage_container.cost_exports.resource_manager_id
    root_folder_path = "/subscription-exports"
  }

  export_data_options {
    type       = "ActualCost"
    time_frame = "MonthToDate"
  }

  active = true
}

# Subscription Cost Management View
resource "azurerm_subscription_cost_management_view" "example" {
  name            = "\${var.naming_convention}-subscription-cost-view"
  display_name    = "\${var.naming_convention} Subscription Cost View"
  subscription_id = data.azurerm_client_config.current.subscription_id
  chart_type      = "StackedColumn"
  accumulated     = false
  
  pivot {
    name = "ServiceName"
    type = "Dimension"
  }

  pivot {
    name = "ResourceLocation"
    type = "Dimension"
  }

  dataset {
    aggregation {
      name        = "PreTaxCost"
      column_name = "PreTaxCost"
    }
    
    granularity = "Daily"
    
    grouping {
      name = "ServiceName"
      type = "Dimension"
    }

    grouping {
      name = "ResourceLocation"
      type = "Dimension"
    }

    sorting {
      direction = "Descending"
      name      = "PreTaxCost"
    }

    filter {
      dimension {
        name     = "ResourceLocation"
        operator = "In"
        values   = [var.default_region]
      }
    }

    filter {
      tag {
        name     = "Environment"
        operator = "In"
        values   = ["Production", "Staging"]
      }
    }
  }

  kpi {
    type = "Budget"
  }

  kpi {
    type = "Forecast"
  }
}

# Storage Account for Cost Exports
resource "azurerm_storage_account" "cost_exports" {
  name                     = "\${replace(var.naming_convention, "-", "")}costexports"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = var.default_region
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  blob_properties {
    versioning_enabled = true
    
    delete_retention_policy {
      days = 30
    }
    
    container_delete_retention_policy {
      days = 30
    }
  }

  tags = var.default_tags
}

resource "azurerm_storage_container" "cost_exports" {
  name                  = "cost-exports"
  storage_account_name  = azurerm_storage_account.cost_exports.name
  container_access_type = "private"
}

# Variables for cost management
variable "billing_account_id" {
  description = "The billing account ID for cost management exports"
  type        = string
  default     = "12345678-1234-1234-1234-123456789012"
}

`;
};
