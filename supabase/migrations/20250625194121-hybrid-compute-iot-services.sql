
-- Azure Hybrid Compute and IoT services
-- This migration focuses on Hybrid Compute and IoT related services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Hybrid Compute
('azurerm_arc_machine', 'compute', 'Manages an Arc Machine', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/arc_machine'),
('azurerm_arc_kubernetes_cluster', 'compute', 'Manages an Arc Kubernetes Cluster', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/arc_kubernetes_cluster'),

-- IoT Central
('azurerm_iotcentral_application', 'iot', 'Manages an IoT Central Application', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/iotcentral_application'),

-- IoT Hub
('azurerm_iothub', 'iot', 'Manages an IoT Hub', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/iothub'),
('azurerm_iothub_device_update_account', 'iot', 'Manages an IoT Hub Device Update Account', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/iothub_device_update_account'),
('azurerm_iothub_dps', 'iot', 'Manages an IoT Hub Device Provisioning Service', 'https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/iothub_dps');
