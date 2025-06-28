
-- Add additional AWS services: Lake Formation, Lambda, Lex, License Manager, Lightsail, Location, MQ, MWAA, Macie, Mainframe Modernization, and Managed Grafana

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Lake Formation (Data Lake Security)
('aws_lakeformation_data_lake_settings', 'analytics', 'Provides Lake Formation data lake settings', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lakeformation_data_lake_settings'),
('aws_lakeformation_permissions', 'analytics', 'Provides Lake Formation permissions', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lakeformation_permissions'),
('aws_lakeformation_resource', 'analytics', 'Provides Lake Formation resource registration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lakeformation_resource'),

-- Lambda (Serverless Computing)
('aws_lambda_function', 'compute', 'Provides a Lambda Function resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function'),
('aws_lambda_permission', 'compute', 'Provides a Lambda permission to allow external sources invoking the Lambda function', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission'),
('aws_lambda_alias', 'compute', 'Provides a Lambda alias', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_alias'),
('aws_lambda_event_source_mapping', 'compute', 'Provides a Lambda event source mapping', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_event_source_mapping'),
('aws_lambda_layer_version', 'compute', 'Provides a Lambda Layer Version', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_layer_version'),
('aws_lambda_provisioned_concurrency_config', 'compute', 'Provides a Lambda Provisioned Concurrency Config', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_provisioned_concurrency_config'),

-- Lex Model Building (Conversational AI)
('aws_lex_bot', 'ai', 'Provides a Lex bot', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lex_bot'),
('aws_lex_bot_alias', 'ai', 'Provides a Lex bot alias', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lex_bot_alias'),
('aws_lex_intent', 'ai', 'Provides a Lex intent', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lex_intent'),
('aws_lex_slot_type', 'ai', 'Provides a Lex slot type', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lex_slot_type'),

-- Lex V2 Models (Next Generation Conversational AI)
('aws_lexv2models_bot', 'ai', 'Provides a Lex V2 bot', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lexv2models_bot'),
('aws_lexv2models_bot_locale', 'ai', 'Provides a Lex V2 bot locale', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lexv2models_bot_locale'),
('aws_lexv2models_bot_version', 'ai', 'Provides a Lex V2 bot version', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lexv2models_bot_version'),
('aws_lexv2models_intent', 'ai', 'Provides a Lex V2 intent', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lexv2models_intent'),
('aws_lexv2models_slot', 'ai', 'Provides a Lex V2 slot', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lexv2models_slot'),
('aws_lexv2models_slot_type', 'ai', 'Provides a Lex V2 slot type', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lexv2models_slot_type'),

-- License Manager (Software License Management)
('aws_licensemanager_license_configuration', 'management', 'Provides a License Manager license configuration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/licensemanager_license_configuration'),
('aws_licensemanager_association', 'management', 'Provides a License Manager association', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/licensemanager_association'),

-- Lightsail (Virtual Private Servers)
('aws_lightsail_instance', 'compute', 'Provides a Lightsail Instance', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_instance'),
('aws_lightsail_key_pair', 'compute', 'Provides a Lightsail Key Pair', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_key_pair'),
('aws_lightsail_static_ip', 'networking', 'Provides a Lightsail Static IP', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_static_ip'),
('aws_lightsail_static_ip_attachment', 'networking', 'Provides a Lightsail Static IP Attachment', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_static_ip_attachment'),
('aws_lightsail_domain', 'networking', 'Provides a Lightsail Domain', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lightsail_domain'),

-- Location (Location Services)
('aws_location_geofence_collection', 'location', 'Provides a Location Service Geofence Collection', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/location_geofence_collection'),
('aws_location_map', 'location', 'Provides a Location Service Map', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/location_map'),
('aws_location_place_index', 'location', 'Provides a Location Service Place Index', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/location_place_index'),
('aws_location_route_calculator', 'location', 'Provides a Location Service Route Calculator', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/location_route_calculator'),
('aws_location_tracker', 'location', 'Provides a Location Service Tracker', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/location_tracker'),

-- MQ (Managed Message Broker)
('aws_mq_broker', 'messaging', 'Provides an MQ Broker', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/mq_broker'),
('aws_mq_configuration', 'messaging', 'Provides an MQ Configuration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/mq_configuration'),

-- MWAA (Managed Workflows for Apache Airflow)
('aws_mwaa_environment', 'analytics', 'Provides a MWAA Environment', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/mwaa_environment'),

-- Macie (Data Security and Privacy)
('aws_macie2_account', 'security', 'Provides a Macie account', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/macie2_account'),
('aws_macie2_classification_job', 'security', 'Provides a Macie classification job', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/macie2_classification_job'),
('aws_macie2_custom_data_identifier', 'security', 'Provides a Macie custom data identifier', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/macie2_custom_data_identifier'),
('aws_macie2_findings_filter', 'security', 'Provides a Macie findings filter', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/macie2_findings_filter'),

-- Mainframe Modernization (Legacy Application Migration)
('aws_m2_application', 'compute', 'Provides a Mainframe Modernization Application', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/m2_application'),
('aws_m2_environment', 'compute', 'Provides a Mainframe Modernization Environment', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/m2_environment'),

-- Managed Grafana (Observability Platform)
('aws_grafana_workspace', 'monitoring', 'Provides a Grafana workspace', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/grafana_workspace'),
('aws_grafana_license_association', 'monitoring', 'Provides a Grafana license association', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/grafana_license_association'),
('aws_grafana_role_association', 'monitoring', 'Provides a Grafana role association', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/grafana_role_association')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
