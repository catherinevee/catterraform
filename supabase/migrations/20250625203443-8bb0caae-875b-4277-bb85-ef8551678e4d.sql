
-- Add additional AWS services: Route 53 Advanced, S3, SES, SFN, SNS, and SQS

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Route 53 Advanced Features
('aws_route53_domains_registered_domain', 'networking', 'Provides a Route53 Domains Registered Domain resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_domains_registered_domain'),
('aws_route53_profiles_profile', 'networking', 'Provides a Route53 Profiles Profile resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_profiles_profile'),
('aws_route53_profiles_resource_association', 'networking', 'Provides a Route53 Profiles Resource Association', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_profiles_resource_association'),
('aws_route53_recovery_control_config_cluster', 'networking', 'Provides a Route53 Recovery Control Config Cluster resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_recovery_control_config_cluster'),
('aws_route53_recovery_control_config_control_panel', 'networking', 'Provides a Route53 Recovery Control Config Control Panel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_recovery_control_config_control_panel'),
('aws_route53_recovery_control_config_routing_control', 'networking', 'Provides a Route53 Recovery Control Config Routing Control resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_recovery_control_config_routing_control'),
('aws_route53_recovery_control_config_safety_rule', 'networking', 'Provides a Route53 Recovery Control Config Safety Rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_recovery_control_config_safety_rule'),
('aws_route53_recovery_readiness_cell', 'networking', 'Provides a Route53 Recovery Readiness Cell resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_recovery_readiness_cell'),
('aws_route53_recovery_readiness_readiness_check', 'networking', 'Provides a Route53 Recovery Readiness Readiness Check resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_recovery_readiness_readiness_check'),
('aws_route53_recovery_readiness_recovery_group', 'networking', 'Provides a Route53 Recovery Readiness Recovery Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_recovery_readiness_recovery_group'),
('aws_route53_recovery_readiness_resource_set', 'networking', 'Provides a Route53 Recovery Readiness Resource Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_recovery_readiness_resource_set'),
('aws_route53_resolver_config', 'networking', 'Provides a Route53 Resolver Config resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_config'),
('aws_route53_resolver_dnssec_config', 'networking', 'Provides a Route53 Resolver DNSSEC Config resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_dnssec_config'),
('aws_route53_resolver_firewall_config', 'networking', 'Provides a Route53 Resolver Firewall Config resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_firewall_config'),
('aws_route53_resolver_firewall_domain_list', 'networking', 'Provides a Route53 Resolver Firewall Domain List resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_firewall_domain_list'),
('aws_route53_resolver_firewall_rule', 'networking', 'Provides a Route53 Resolver Firewall Rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_firewall_rule'),
('aws_route53_resolver_firewall_rule_group', 'networking', 'Provides a Route53 Resolver Firewall Rule Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_firewall_rule_group'),
('aws_route53_resolver_firewall_rule_group_association', 'networking', 'Provides a Route53 Resolver Firewall Rule Group Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_firewall_rule_group_association'),
('aws_route53_resolver_query_log_config', 'networking', 'Provides a Route53 Resolver Query Log Config resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_query_log_config'),
('aws_route53_resolver_query_log_config_association', 'networking', 'Provides a Route53 Resolver Query Log Config Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_query_log_config_association'),

-- S3 (Simple Storage Service)
('aws_s3_bucket', 'storage', 'Provides a S3 bucket resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket'),
('aws_s3_bucket_acl', 'storage', 'Provides an S3 bucket ACL resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_acl'),
('aws_s3_bucket_cors_configuration', 'storage', 'Provides an S3 bucket CORS configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_cors_configuration'),
('aws_s3_bucket_encryption', 'storage', 'Provides an S3 bucket server-side encryption configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_server_side_encryption_configuration'),
('aws_s3_bucket_lifecycle_configuration', 'storage', 'Provides an S3 bucket lifecycle configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_lifecycle_configuration'),
('aws_s3_bucket_logging', 'storage', 'Provides an S3 bucket logging resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_logging'),
('aws_s3_bucket_notification', 'storage', 'Provides an S3 bucket notification resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_notification'),
('aws_s3_bucket_object', 'storage', 'Provides an S3 bucket object resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_object'),
('aws_s3_bucket_policy', 'storage', 'Provides an S3 bucket policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_policy'),
('aws_s3_bucket_public_access_block', 'storage', 'Provides an S3 bucket public access block resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_public_access_block'),
('aws_s3_bucket_replication_configuration', 'storage', 'Provides an S3 bucket replication configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_replication_configuration'),
('aws_s3_bucket_request_payment_configuration', 'storage', 'Provides an S3 bucket request payment configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_request_payment_configuration'),
('aws_s3_bucket_versioning', 'storage', 'Provides an S3 bucket versioning resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_versioning'),
('aws_s3_bucket_website_configuration', 'storage', 'Provides an S3 bucket website configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_website_configuration'),

-- S3 Control
('aws_s3_access_point', 'storage', 'Provides an S3 Access Point resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_access_point'),
('aws_s3_access_point_policy', 'storage', 'Provides an S3 Access Point Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_access_point_policy'),
('aws_s3_account_public_access_block', 'storage', 'Provides an S3 account public access block resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_account_public_access_block'),
('aws_s3_bucket_analytics_configuration', 'storage', 'Provides an S3 bucket analytics configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_analytics_configuration'),
('aws_s3_bucket_intelligent_tiering_configuration', 'storage', 'Provides an S3 bucket intelligent tiering configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_intelligent_tiering_configuration'),
('aws_s3_bucket_inventory', 'storage', 'Provides an S3 bucket inventory configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_inventory'),
('aws_s3_bucket_metric', 'storage', 'Provides an S3 bucket metric configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_metric'),
('aws_s3_bucket_object_lock_configuration', 'storage', 'Provides an S3 bucket object lock configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_object_lock_configuration'),
('aws_s3_control_access_point_policy', 'storage', 'Provides an S3 Control Access Point Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3control_access_point_policy'),
('aws_s3_control_bucket', 'storage', 'Provides an S3 Control Bucket resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3control_bucket'),
('aws_s3_control_bucket_lifecycle_configuration', 'storage', 'Provides an S3 Control Bucket Lifecycle Configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3control_bucket_lifecycle_configuration'),
('aws_s3_control_bucket_policy', 'storage', 'Provides an S3 Control Bucket Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3control_bucket_policy'),
('aws_s3_control_multi_region_access_point', 'storage', 'Provides an S3 Control Multi-Region Access Point resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3control_multi_region_access_point'),
('aws_s3_control_multi_region_access_point_policy', 'storage', 'Provides an S3 Control Multi-Region Access Point Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3control_multi_region_access_point_policy'),
('aws_s3_control_object_lambda_access_point', 'storage', 'Provides an S3 Control Object Lambda Access Point resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3control_object_lambda_access_point'),
('aws_s3_control_object_lambda_access_point_policy', 'storage', 'Provides an S3 Control Object Lambda Access Point Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3control_object_lambda_access_point_policy'),
('aws_s3_control_storage_lens_configuration', 'storage', 'Provides an S3 Control Storage Lens Configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3control_storage_lens_configuration'),

-- S3 Glacier
('aws_glacier_vault', 'storage', 'Provides a Glacier Vault resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glacier_vault'),
('aws_glacier_vault_lock', 'storage', 'Provides a Glacier Vault Lock resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/glacier_vault_lock'),

-- S3 Tables
('aws_s3tables_table_bucket', 'storage', 'Provides an S3 Tables Table Bucket resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3tables_table_bucket'),
('aws_s3tables_table_bucket_policy', 'storage', 'Provides an S3 Tables Table Bucket Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3tables_table_bucket_policy'),
('aws_s3tables_namespace', 'storage', 'Provides an S3 Tables Namespace resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3tables_namespace'),
('aws_s3tables_table', 'storage', 'Provides an S3 Tables Table resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3tables_table'),

-- S3 on Outposts
('aws_s3_outposts_bucket', 'storage', 'Provides an S3 Outposts Bucket resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3outposts_bucket'),
('aws_s3_outposts_bucket_policy', 'storage', 'Provides an S3 Outposts Bucket Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3outposts_bucket_policy'),
('aws_s3_outposts_endpoint', 'storage', 'Provides an S3 Outposts Endpoint resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3outposts_endpoint'),

-- SES (Simple Email Service)
('aws_ses_configuration_set', 'messaging', 'Provides an SES configuration set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_configuration_set'),
('aws_ses_domain_identity', 'messaging', 'Provides an SES domain identity resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_domain_identity'),
('aws_ses_domain_identity_verification', 'messaging', 'Provides an SES domain identity verification resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_domain_identity_verification'),
('aws_ses_email_identity', 'messaging', 'Provides an SES email identity resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_email_identity'),
('aws_ses_event_destination', 'messaging', 'Provides an SES event destination resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_event_destination'),
('aws_ses_identity_notification_topic', 'messaging', 'Provides an SES identity notification topic resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_identity_notification_topic'),
('aws_ses_identity_policy', 'messaging', 'Provides an SES identity policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_identity_policy'),
('aws_ses_receipt_filter', 'messaging', 'Provides an SES receipt filter resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_receipt_filter'),
('aws_ses_receipt_rule', 'messaging', 'Provides an SES receipt rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_receipt_rule'),
('aws_ses_receipt_rule_set', 'messaging', 'Provides an SES receipt rule set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_receipt_rule_set'),
('aws_ses_template', 'messaging', 'Provides an SES template resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ses_template'),

-- SESv2 (Simple Email Service V2)
('aws_sesv2_account_suppression_attributes', 'messaging', 'Provides an SESv2 account suppression attributes resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_account_suppression_attributes'),
('aws_sesv2_account_vdm_attributes', 'messaging', 'Provides an SESv2 account VDM attributes resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_account_vdm_attributes'),
('aws_sesv2_configuration_set', 'messaging', 'Provides an SESv2 configuration set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_configuration_set'),
('aws_sesv2_configuration_set_event_destination', 'messaging', 'Provides an SESv2 configuration set event destination resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_configuration_set_event_destination'),
('aws_sesv2_contact_list', 'messaging', 'Provides an SESv2 contact list resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_contact_list'),
('aws_sesv2_dedicated_ip', 'messaging', 'Provides an SESv2 dedicated IP resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_dedicated_ip'),
('aws_sesv2_dedicated_ip_assignment', 'messaging', 'Provides an SESv2 dedicated IP assignment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_dedicated_ip_assignment'),
('aws_sesv2_dedicated_ip_pool', 'messaging', 'Provides an SESv2 dedicated IP pool resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_dedicated_ip_pool'),
('aws_sesv2_email_identity', 'messaging', 'Provides an SESv2 email identity resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_email_identity'),
('aws_sesv2_email_identity_feedback_attributes', 'messaging', 'Provides an SESv2 email identity feedback attributes resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_email_identity_feedback_attributes'),
('aws_sesv2_email_identity_mail_from_attributes', 'messaging', 'Provides an SESv2 email identity mail from attributes resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_email_identity_mail_from_attributes'),
('aws_sesv2_email_identity_policy', 'messaging', 'Provides an SESv2 email identity policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sesv2_email_identity_policy'),

-- SFN (Step Functions)
('aws_sfn_activity', 'compute', 'Provides a Step Functions Activity resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sfn_activity'),
('aws_sfn_state_machine', 'compute', 'Provides a Step Functions State Machine resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sfn_state_machine'),
('aws_sfn_alias', 'compute', 'Provides a Step Functions State Machine Alias resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sfn_alias'),

-- SNS (Simple Notification Service)
('aws_sns_platform_application', 'messaging', 'Provides an SNS platform application resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_platform_application'),
('aws_sns_sms_preferences', 'messaging', 'Provides an SNS SMS preferences resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_sms_preferences'),
('aws_sns_topic', 'messaging', 'Provides an SNS topic resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic'),
('aws_sns_topic_data_protection_policy', 'messaging', 'Provides an SNS topic data protection policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic_data_protection_policy'),
('aws_sns_topic_policy', 'messaging', 'Provides an SNS topic policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic_policy'),
('aws_sns_topic_subscription', 'messaging', 'Provides an SNS topic subscription resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sns_topic_subscription'),

-- SQS (Simple Queue Service)
('aws_sqs_queue', 'messaging', 'Provides an SQS Queue resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sqs_queue'),
('aws_sqs_queue_policy', 'messaging', 'Provides an SQS Queue Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sqs_queue_policy'),
('aws_sqs_queue_redrive_allow_policy', 'messaging', 'Provides an SQS Queue Redrive Allow Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sqs_queue_redrive_allow_policy'),
('aws_sqs_queue_redrive_policy', 'messaging', 'Provides an SQS Queue Redrive Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sqs_queue_redrive_policy')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
