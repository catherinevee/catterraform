
export const generateAzureKubernetesService = (): string => {
  return `# Azure Kubernetes Service (AKS)
resource "azurerm_kubernetes_cluster" "example" {
  name                = "\${var.naming_convention}-aks"
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "\${var.naming_convention}-aks"
  
  # Basic Configuration
  kubernetes_version                  = "1.28.0"
  sku_tier                           = "Standard"
  api_server_access_profile          = null
  automatic_channel_upgrade          = "patch"
  azure_policy_enabled               = true
  disk_encryption_set_id             = null
  edge_zone                          = null
  http_application_routing_enabled   = false
  image_cleaner_enabled              = true
  image_cleaner_interval_hours       = 48
  local_account_disabled             = false
  node_os_channel_upgrade            = "NodeImage"
  oidc_issuer_enabled                = true
  open_service_mesh_enabled          = false
  private_cluster_enabled            = false
  private_dns_zone_id                = null
  private_cluster_public_fqdn_enabled = false
  public_network_access_enabled      = true
  role_based_access_control_enabled  = true
  run_command_enabled                = true
  support_plan                       = "KubernetesOfficial"
  workload_identity_enabled          = true

  # Default Node Pool
  default_node_pool {
    name                         = "default"
    vm_size                      = "Standard_DS2_v2"
    node_count                   = 2
    auto_scaling_enabled         = true
    min_count                    = 1
    max_count                    = 5
    max_pods                     = 30
    os_disk_size_gb             = 128
    os_disk_type                = "Managed"
    os_sku                      = "Ubuntu"
    scale_down_mode             = "Delete"
    temporary_name_for_rotation = "defaulttemp"
    type                        = "VirtualMachineScaleSets"
    ultra_ssd_enabled           = false
    vnet_subnet_id              = azurerm_subnet.example.id
    zones                       = ["1", "2", "3"]
    
    # Node Pool Configuration
    enable_auto_scaling          = true
    enable_host_encryption      = false
    enable_node_public_ip       = false
    fips_enabled                = false
    kubelet_disk_type           = "OS"
    node_public_ip_prefix_id    = null
    only_critical_addons_enabled = false
    orchestrator_version        = "1.28.0"
    pod_subnet_id               = null
    proximity_placement_group_id = null
    workload_runtime            = "OCIContainer"

    # Upgrade Settings
    upgrade_settings {
      drain_timeout_in_minutes      = 0
      max_surge                     = "10%"
      node_soak_duration_in_minutes = 0
    }

    # Kubelet Configuration
    kubelet_config {
      allowed_unsafe_sysctls    = []
      container_log_max_line    = 100000
      container_log_max_size_mb = 100
      cpu_cfs_quota_enabled     = true
      cpu_cfs_quota_period      = "100ms"
      cpu_manager_policy        = "none"
      image_gc_high_threshold   = 85
      image_gc_low_threshold    = 80
      pod_max_pid               = -1
      topology_manager_policy   = "none"
    }

    # Linux OS Configuration
    linux_os_config {
      swap_file_size_mb = 0
      
      sysctl_config {
        fs_aio_max_nr                      = 65536
        fs_file_max                        = 100000
        fs_inotify_max_user_watches        = 1000000
        fs_nr_open                         = 1000000
        kernel_threads_max                 = 1000000
        net_core_netdev_max_backlog        = 1000
        net_core_optmem_max                = 20480
        net_core_rmem_default              = 262144
        net_core_rmem_max                  = 16777216
        net_core_somaxconn                 = 32768
        net_core_wmem_default              = 262144
        net_core_wmem_max                  = 16777216
        net_ipv4_ip_local_port_range_max   = 65000
        net_ipv4_ip_local_port_range_min   = 1024
        net_ipv4_neigh_default_gc_thresh1  = 4096
        net_ipv4_neigh_default_gc_thresh2  = 8192
        net_ipv4_neigh_default_gc_thresh3  = 16384
        net_ipv4_tcp_fin_timeout           = 60
        net_ipv4_tcp_keepalive_intvl       = 75
        net_ipv4_tcp_keepalive_probes      = 9
        net_ipv4_tcp_keepalive_time        = 7200
        net_ipv4_tcp_max_syn_backlog       = 16384
        net_ipv4_tcp_max_tw_buckets        = 32768
        net_ipv4_tcp_tw_reuse              = false
        net_netfilter_nf_conntrack_buckets = 65536
        net_netfilter_nf_conntrack_max     = 131072
        vm_max_map_count                   = 65530
        vm_swappiness                      = 60
        vm_vfs_cache_pressure              = 100
      }
    }

    node_labels = {
      "environment" = "production"
      "nodepool"    = "default"
    }

    node_taints = []

    tags = var.default_tags
  }

  # Identity Configuration
  identity {
    type         = "SystemAssigned"
    identity_ids = []
  }

  # Network Profile
  network_profile {
    network_plugin      = "azure"
    network_mode        = null
    network_policy      = "azure"
    dns_service_ip      = "10.2.0.10"
    service_cidr        = "10.2.0.0/24"
    pod_cidr            = null
    load_balancer_sku   = "standard"
    outbound_type       = "loadBalancer"
    pod_cidrs           = []
    service_cidrs       = ["10.2.0.0/24"]
    ip_versions         = ["IPv4"]

    load_balancer_profile {
      idle_timeout_in_minutes     = 30
      managed_outbound_ip_count   = 1
      managed_outbound_ipv6_count = 0
      outbound_ip_address_ids     = []
      outbound_ip_prefix_ids      = []
      outbound_ports_allocated    = 0
    }

    nat_gateway_profile {
      idle_timeout_in_minutes   = 4
      managed_outbound_ip_count = 1
    }
  }

  # Auto Scaler Profile
  auto_scaler_profile {
    balance_similar_node_groups      = false
    expander                         = "random"
    max_graceful_termination_sec     = 600
    max_node_provisioning_time       = "15m"
    max_unready_nodes                = 3
    max_unready_percentage           = 45
    new_pod_scale_up_delay           = "10s"
    scale_down_delay_after_add       = "10m"
    scale_down_delay_after_delete    = "10s"
    scale_down_delay_after_failure   = "3m"
    scan_interval                    = "10s"
    scale_down_unneeded              = "10m"
    scale_down_unready               = "20m"
    scale_down_utilization_threshold = 0.5
    empty_bulk_delete_max            = 10
    skip_nodes_with_local_storage    = true
    skip_nodes_with_system_pods      = true
  }

  # Azure Active Directory Role Based Access Control
  azure_active_directory_role_based_access_control {
    managed                = true
    tenant_id              = data.azurerm_client_config.current.tenant_id
    admin_group_object_ids = []
    azure_rbac_enabled     = true
    client_app_id          = null
    server_app_id          = null
    server_app_secret      = null
  }

  # HTTP Proxy Configuration
  http_proxy_config {
    http_proxy  = null
    https_proxy = null
    no_proxy    = []
    trusted_ca  = null
  }

  # Key Management Service
  key_management_service {
    key_vault_key_id         = null
    key_vault_network_access = "Public"
  }

  # Key Vault Secrets Provider
  key_vault_secrets_provider {
    secret_rotation_enabled  = false
    secret_rotation_interval = "2m"
  }

  # Kubelet Identity
  kubelet_identity {
    client_id                 = null
    object_id                 = null
    user_assigned_identity_id = null
  }

  # Linux Profile
  linux_profile {
    admin_username = "azureuser"
    
    ssh_key {
      key_data = file("~/.ssh/id_rsa.pub")
    }
  }

  # Maintenance Window
  maintenance_window {
    allowed {
      day   = "Sunday"
      hours = [22, 23]
    }
    
    not_allowed {
      end   = "2024-12-31T12:00:00Z"
      start = "2024-12-25T12:00:00Z"
    }
  }

  # Maintenance Window for Node OS
  maintenance_window_auto_upgrade {
    frequency    = "Weekly"
    interval     = 1
    duration     = 4
    day_of_week  = "Sunday"
    day_of_month = null
    week_index   = "First"
    start_time   = "00:00"
    utc_offset   = "+00:00"
    start_date   = null

    not_allowed {
      end   = "2024-12-31T12:00:00Z"
      start = "2024-12-25T12:00:00Z"
    }
  }

  # Maintenance Window for Node OS
  maintenance_window_node_os {
    frequency    = "Weekly"
    interval     = 1
    duration     = 4
    day_of_week  = "Sunday"
    day_of_month = null
    week_index   = "First"
    start_time   = "00:00"
    utc_offset   = "+00:00"
    start_date   = null

    not_allowed {
      end   = "2024-12-31T12:00:00Z"
      start = "2024-12-25T12:00:00Z"
    }
  }

  # Microsoft Defender
  microsoft_defender {
    log_analytics_workspace_id = azurerm_log_analytics_workspace.example.id
  }

  # Monitor Metrics
  monitor_metrics {
    annotations_allowed = null
    labels_allowed      = null
  }

  # OMS Agent
  oms_agent {
    log_analytics_workspace_id      = azurerm_log_analytics_workspace.example.id
    msi_auth_for_monitoring_enabled = true
  }

  # Service Mesh Profile
  service_mesh_profile {
    mode                             = "Istio"
    revisions                        = ["asm-1-17"]
    external_ingress_gateway_enabled = true
    internal_ingress_gateway_enabled = false
  }

  # Storage Profile
  storage_profile {
    blob_driver_enabled         = true
    disk_driver_enabled         = true
    disk_driver_version         = "v1"
    file_driver_enabled         = true
    snapshot_controller_enabled = true
  }

  # Web App Routing
  web_app_routing {
    dns_zone_id = null
  }

  # Workload Autoscaler Profile
  workload_autoscaler_profile {
    keda_enabled                    = false
    vertical_pod_autoscaler_enabled = false
  }

  tags = var.default_tags
}

# Log Analytics Workspace for AKS monitoring
resource "azurerm_log_analytics_workspace" "example" {
  name                = "\${var.naming_convention}-log-analytics"
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
  daily_quota_gb      = 1
  
  tags = var.default_tags
}

# Required networking resources for AKS
resource "azurerm_virtual_network" "example" {
  name                = "\${var.naming_convention}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name

  tags = var.default_tags
}

resource "azurerm_subnet" "example" {
  name                 = "\${var.naming_convention}-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.1.0/24"]
}

`;
};
