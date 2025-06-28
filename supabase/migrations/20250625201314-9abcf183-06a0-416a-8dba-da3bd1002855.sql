
-- Add more AWS services to the database
-- Adding Cognito, Comprehend, Compute Optimizer, Config, Connect, Control Tower, Cost Optimization Hub, Cost and Usage Report, DLM, DMS, and DRS services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Cognito IDP (Identity Provider)
('aws_cognito_identity_provider', 'identity', 'Provides a Cognito User Pool Identity Provider resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_identity_provider'),
('aws_cognito_user_pool', 'identity', 'Provides a Cognito User Pool resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool'),
('aws_cognito_user_pool_client', 'identity', 'Provides a Cognito User Pool Client resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_client'),
('aws_cognito_user_pool_domain', 'identity', 'Provides a Cognito User Pool Domain resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_domain'),

-- Cognito Identity
('aws_cognito_identity_pool', 'identity', 'Provides an AWS Cognito Identity Pool', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_identity_pool'),
('aws_cognito_identity_pool_roles_attachment', 'identity', 'Provides an AWS Cognito Identity Pool Roles Attachment', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_identity_pool_roles_attachment'),

-- Comprehend
('aws_comprehend_document_classifier', 'ai', 'Provides a Comprehend Document Classifier resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/comprehend_document_classifier'),
('aws_comprehend_entity_recognizer', 'ai', 'Provides a Comprehend Entity Recognizer resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/comprehend_entity_recognizer'),
('aws_comprehend_flywheel', 'ai', 'Provides a Comprehend Flywheel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/comprehend_flywheel'),

-- Compute Optimizer
('aws_computeoptimizer_enrollment_status', 'optimization', 'Manages AWS Compute Optimizer enrollment status', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/computeoptimizer_enrollment_status'),

-- Config
('aws_config_configuration_recorder', 'compliance', 'Provides an AWS Config Configuration Recorder', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_configuration_recorder'),
('aws_config_delivery_channel', 'compliance', 'Provides an AWS Config Delivery Channel', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_delivery_channel'),
('aws_config_config_rule', 'compliance', 'Provides an AWS Config Rule', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_config_rule'),
('aws_config_configuration_aggregator', 'compliance', 'Manages an AWS Config Configuration Aggregator', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_configuration_aggregator'),
('aws_config_conformance_pack', 'compliance', 'Manages an AWS Config Conformance Pack', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_conformance_pack'),
('aws_config_organization_conformance_pack', 'compliance', 'Manages an AWS Config Organization Conformance Pack', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_organization_conformance_pack'),
('aws_config_remediation_configuration', 'compliance', 'Provides an AWS Config Remediation Configuration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/config_remediation_configuration'),

-- Connect
('aws_connect_instance', 'communication', 'Provides an Amazon Connect instance resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/connect_instance'),
('aws_connect_contact_flow', 'communication', 'Provides an Amazon Connect Contact Flow resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/connect_contact_flow'),
('aws_connect_hours_of_operation', 'communication', 'Provides an Amazon Connect Hours of Operation resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/connect_hours_of_operation'),
('aws_connect_queue', 'communication', 'Provides an Amazon Connect Queue resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/connect_queue'),
('aws_connect_routing_profile', 'communication', 'Provides an Amazon Connect Routing Profile resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/connect_routing_profile'),
('aws_connect_security_profile', 'communication', 'Provides an Amazon Connect Security Profile resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/connect_security_profile'),
('aws_connect_user', 'communication', 'Provides an Amazon Connect User resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/connect_user'),
('aws_connect_user_hierarchy_structure', 'communication', 'Provides an Amazon Connect User Hierarchy Structure resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/connect_user_hierarchy_structure'),

-- Connect Customer Profiles
('aws_customerprofiles_domain', 'communication', 'Provides an Amazon Connect Customer Profiles Domain resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/customerprofiles_domain'),
('aws_customerprofiles_profile', 'communication', 'Provides an Amazon Connect Customer Profiles Profile resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/customerprofiles_profile'),

-- Control Tower
('aws_controltower_control', 'governance', 'Provides an AWS Control Tower Control resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/controltower_control'),
('aws_controltower_landing_zone', 'governance', 'Provides an AWS Control Tower Landing Zone resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/controltower_landing_zone'),

-- Cost Optimization Hub
('aws_costoptimizationhub_enrollment_status', 'billing', 'Manages AWS Cost Optimization Hub enrollment status', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/costoptimizationhub_enrollment_status'),
('aws_costoptimizationhub_preferences', 'billing', 'Manages AWS Cost Optimization Hub preferences', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/costoptimizationhub_preferences'),

-- Cost and Usage Report
('aws_cur_report_definition', 'billing', 'Manages Cost and Usage Report definitions', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cur_report_definition'),

-- DLM (Data Lifecycle Manager)
('aws_dlm_lifecycle_policy', 'storage', 'Provides a Data Lifecycle Manager (DLM) lifecycle policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dlm_lifecycle_policy'),

-- DMS (Database Migration Service)
('aws_dms_replication_instance', 'migration', 'Provides a DMS (Database Migration Service) replication instance resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dms_replication_instance'),
('aws_dms_endpoint', 'migration', 'Provides a DMS (Database Migration Service) endpoint resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dms_endpoint'),
('aws_dms_replication_task', 'migration', 'Provides a DMS (Database Migration Service) replication task resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dms_replication_task'),
('aws_dms_replication_subnet_group', 'migration', 'Provides a DMS replication subnet group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dms_replication_subnet_group'),
('aws_dms_certificate', 'migration', 'Provides a DMS (Database Migration Service) certificate resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dms_certificate'),
('aws_dms_event_subscription', 'migration', 'Provides a DMS (Database Migration Service) event subscription resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dms_event_subscription'),
('aws_dms_replication_config', 'migration', 'Provides a DMS Serverless replication config resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dms_replication_config'),

-- DRS (Elastic Disaster Recovery)
('aws_drs_replication_configuration_template', 'backup', 'Provides an AWS DRS Replication Configuration Template resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/drs_replication_configuration_template');
