
-- Add additional AWS services: Global Accelerator, Glue, GuardDuty, IAM, IVS, Inspector, IoT Core, KMS, Kendra, Keyspaces, and Kinesis

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Global Accelerator
('aws_globalaccelerator_accelerator', 'networking', 'Provides a Global Accelerator accelerator', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/globalaccelerator_accelerator'),
('aws_globalaccelerator_listener', 'networking', 'Provides a Global Accelerator listener', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/globalaccelerator_listener'),
('aws_globalaccelerator_endpoint_group', 'networking', 'Provides a Global Accelerator endpoint group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/globalaccelerator_endpoint_group'),

-- Glue (Data Catalog and ETL)
('aws_glue_catalog_database', 'analytics', 'Provides a Glue Catalog Database', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glue_catalog_database'),
('aws_glue_catalog_table', 'analytics', 'Provides a Glue Catalog Table', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glue_catalog_table'),
('aws_glue_job', 'analytics', 'Provides a Glue Job', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glue_job'),
('aws_glue_crawler', 'analytics', 'Provides a Glue Crawler', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glue_crawler'),
('aws_glue_trigger', 'analytics', 'Provides a Glue Trigger', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glue_trigger'),
('aws_glue_workflow', 'analytics', 'Provides a Glue Workflow', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glue_workflow'),
('aws_glue_connection', 'analytics', 'Provides a Glue Connection', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glue_connection'),
('aws_glue_classifier', 'analytics', 'Provides a Glue Classifier', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glue_classifier'),

-- GuardDuty (Threat Detection)
('aws_guardduty_detector', 'security', 'Provides a GuardDuty detector', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_detector'),
('aws_guardduty_ipset', 'security', 'Provides a GuardDuty IPSet', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_ipset'),
('aws_guardduty_threatintelset', 'security', 'Provides a GuardDuty ThreatIntelSet', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_threatintelset'),
('aws_guardduty_member', 'security', 'Provides a GuardDuty member', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_member'),
('aws_guardduty_invite_accepter', 'security', 'Provides a GuardDuty invite accepter', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/guardduty_invite_accepter'),

-- IAM (Identity & Access Management)
('aws_iam_role', 'security', 'Provides an IAM role', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role'),
('aws_iam_policy', 'security', 'Provides an IAM policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy'),
('aws_iam_user', 'security', 'Provides an IAM user', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_user'),
('aws_iam_group', 'security', 'Provides an IAM group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_group'),
('aws_iam_role_policy_attachment', 'security', 'Attaches a Managed IAM Policy to an IAM role', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment'),
('aws_iam_user_policy_attachment', 'security', 'Attaches a Managed IAM Policy to an IAM user', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_user_policy_attachment'),
('aws_iam_group_policy_attachment', 'security', 'Attaches a Managed IAM Policy to an IAM group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_group_policy_attachment'),
('aws_iam_instance_profile', 'security', 'Provides an IAM instance profile', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_instance_profile'),

-- IAM Access Analyzer
('aws_accessanalyzer_analyzer', 'security', 'Provides an Access Analyzer analyzer', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/accessanalyzer_analyzer'),
('aws_accessanalyzer_archive_rule', 'security', 'Provides an Access Analyzer archive rule', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/accessanalyzer_archive_rule'),

-- IVS (Interactive Video Service)
('aws_ivs_channel', 'media', 'Provides an IVS Channel', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ivs_channel'),
('aws_ivs_recording_configuration', 'media', 'Provides an IVS Recording Configuration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ivs_recording_configuration'),
('aws_ivs_playback_key_pair', 'media', 'Provides an IVS Playback Key Pair', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ivs_playback_key_pair'),

-- IVS Chat
('aws_ivschat_room', 'media', 'Provides an IVS Chat Room', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ivschat_room'),
('aws_ivschat_logging_configuration', 'media', 'Provides an IVS Chat Logging Configuration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ivschat_logging_configuration'),

-- Inspector (Security Assessment)
('aws_inspector_assessment_target', 'security', 'Provides an Inspector Assessment Target', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/inspector_assessment_target'),
('aws_inspector_assessment_template', 'security', 'Provides an Inspector Assessment Template', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/inspector_assessment_template'),
('aws_inspector_rules_package', 'security', 'Provides an Inspector Rules Package data source', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/inspector_rules_packages'),

-- Inspector v2 (Classic)
('aws_inspector2_enabler', 'security', 'Provides an Inspector v2 enabler', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/inspector2_enabler'),
('aws_inspector2_organization_configuration', 'security', 'Provides an Inspector v2 organization configuration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/inspector2_organization_configuration'),

-- IoT Core
('aws_iot_thing', 'iot', 'Provides an IoT Thing', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iot_thing'),
('aws_iot_thing_type', 'iot', 'Provides an IoT Thing Type', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iot_thing_type'),
('aws_iot_policy', 'iot', 'Provides an IoT policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iot_policy'),
('aws_iot_certificate', 'iot', 'Provides an IoT certificate', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iot_certificate'),
('aws_iot_topic_rule', 'iot', 'Provides an IoT topic rule', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iot_topic_rule'),

-- KMS (Key Management Service)
('aws_kms_key', 'security', 'Provides a KMS customer master key', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kms_key'),
('aws_kms_alias', 'security', 'Provides a KMS key alias', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kms_alias'),
('aws_kms_grant', 'security', 'Provides a KMS grant', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kms_grant'),
('aws_kms_external_key', 'security', 'Provides a KMS external key', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kms_external_key'),

-- Kendra (Intelligent Search)
('aws_kendra_index', 'analytics', 'Provides a Kendra Index', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kendra_index'),
('aws_kendra_data_source', 'analytics', 'Provides a Kendra Data Source', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kendra_data_source'),
('aws_kendra_faq', 'analytics', 'Provides a Kendra FAQ', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kendra_faq'),

-- Keyspaces (Apache Cassandra)
('aws_keyspaces_keyspace', 'database', 'Provides a Keyspaces keyspace', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/keyspaces_keyspace'),
('aws_keyspaces_table', 'database', 'Provides a Keyspaces table', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/keyspaces_table'),

-- Kinesis (Streaming Data)
('aws_kinesis_stream', 'analytics', 'Provides a Kinesis Stream', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kinesis_stream'),
('aws_kinesis_firehose_delivery_stream', 'analytics', 'Provides a Kinesis Firehose Delivery Stream', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kinesis_firehose_delivery_stream'),
('aws_kinesis_analytics_application', 'analytics', 'Provides a Kinesis Analytics Application', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kinesis_analytics_application'),
('aws_kinesisanalyticsv2_application', 'analytics', 'Provides a Kinesis Analytics v2 Application', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/kinesisanalyticsv2_application')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
