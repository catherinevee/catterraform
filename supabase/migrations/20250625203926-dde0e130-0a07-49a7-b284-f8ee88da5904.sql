
-- Add additional AWS services: SSM, SSO, STS, SWF, SageMaker, Secrets Manager, Security Hub, Security Lake, Serverless Application Repository, and Service Catalog

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- SSM (Systems Manager)
('aws_ssm_activation', 'management', 'Provides an SSM Activation resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_activation'),
('aws_ssm_association', 'management', 'Provides an SSM Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_association'),
('aws_ssm_default_patch_baseline', 'management', 'Provides an SSM Default Patch Baseline resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_default_patch_baseline'),
('aws_ssm_document', 'management', 'Provides an SSM Document resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_document'),
('aws_ssm_maintenance_window', 'management', 'Provides an SSM Maintenance Window resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_maintenance_window'),
('aws_ssm_maintenance_window_target', 'management', 'Provides an SSM Maintenance Window Target resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_maintenance_window_target'),
('aws_ssm_maintenance_window_task', 'management', 'Provides an SSM Maintenance Window Task resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_maintenance_window_task'),
('aws_ssm_parameter', 'management', 'Provides an SSM Parameter resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_parameter'),
('aws_ssm_patch_baseline', 'management', 'Provides an SSM Patch Baseline resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_patch_baseline'),
('aws_ssm_patch_group', 'management', 'Provides an SSM Patch Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_patch_group'),
('aws_ssm_resource_data_sync', 'management', 'Provides an SSM Resource Data Sync resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_resource_data_sync'),
('aws_ssm_service_setting', 'management', 'Provides an SSM Service Setting resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssm_service_setting'),

-- SSM Contacts
('aws_ssmcontacts_contact', 'management', 'Provides an SSM Contacts Contact resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssmcontacts_contact'),
('aws_ssmcontacts_contact_channel', 'management', 'Provides an SSM Contacts Contact Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssmcontacts_contact_channel'),
('aws_ssmcontacts_plan', 'management', 'Provides an SSM Contacts Plan resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssmcontacts_plan'),

-- SSM Incident Manager
('aws_ssmincidents_replication_set', 'management', 'Provides an SSM Incidents Replication Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssmincidents_replication_set'),
('aws_ssmincidents_response_plan', 'management', 'Provides an SSM Incidents Response Plan resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssmincidents_response_plan'),

-- SSM Quick Setup
('aws_ssmquicksetup_configuration_manager', 'management', 'Provides an SSM Quick Setup Configuration Manager resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssmquicksetup_configuration_manager'),

-- SSO Admin (AWS IAM Identity Center)
('aws_ssoadmin_account_assignment', 'security', 'Provides an SSO Admin Account Assignment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_account_assignment'),
('aws_ssoadmin_application', 'security', 'Provides an SSO Admin Application resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_application'),
('aws_ssoadmin_application_access_scope', 'security', 'Provides an SSO Admin Application Access Scope resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_application_access_scope'),
('aws_ssoadmin_application_assignment', 'security', 'Provides an SSO Admin Application Assignment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_application_assignment'),
('aws_ssoadmin_application_assignment_configuration', 'security', 'Provides an SSO Admin Application Assignment Configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_application_assignment_configuration'),
('aws_ssoadmin_customer_managed_policy_attachment', 'security', 'Provides an SSO Admin Customer Managed Policy Attachment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_customer_managed_policy_attachment'),
('aws_ssoadmin_instance_access_control_attributes', 'security', 'Provides an SSO Admin Instance Access Control Attributes resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_instance_access_control_attributes'),
('aws_ssoadmin_managed_policy_attachment', 'security', 'Provides an SSO Admin Managed Policy Attachment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_managed_policy_attachment'),
('aws_ssoadmin_permission_set', 'security', 'Provides an SSO Admin Permission Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_permission_set'),
('aws_ssoadmin_permission_set_inline_policy', 'security', 'Provides an SSO Admin Permission Set Inline Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_permission_set_inline_policy'),
('aws_ssoadmin_permissions_boundary_attachment', 'security', 'Provides an SSO Admin Permissions Boundary Attachment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_permissions_boundary_attachment'),
('aws_ssoadmin_trusted_token_issuer', 'security', 'Provides an SSO Admin Trusted Token Issuer resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ssoadmin_trusted_token_issuer'),

-- SSO Identity Store
('aws_identitystore_group', 'security', 'Provides an Identity Store Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/identitystore_group'),
('aws_identitystore_group_membership', 'security', 'Provides an Identity Store Group Membership resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/identitystore_group_membership'),
('aws_identitystore_user', 'security', 'Provides an Identity Store User resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/identitystore_user'),

-- STS (Security Token Service)
('aws_sts_external_id', 'security', 'Provides an STS External ID resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sts_external_id'),

-- SWF (Simple Workflow Service)
('aws_swf_domain', 'compute', 'Provides an SWF Domain resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/swf_domain'),

-- SageMaker AI
('aws_sagemaker_app', 'machine-learning', 'Provides a SageMaker App resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_app'),
('aws_sagemaker_app_image_config', 'machine-learning', 'Provides a SageMaker App Image Config resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_app_image_config'),
('aws_sagemaker_code_repository', 'machine-learning', 'Provides a SageMaker Code Repository resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_code_repository'),
('aws_sagemaker_device', 'machine-learning', 'Provides a SageMaker Device resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_device'),
('aws_sagemaker_device_fleet', 'machine-learning', 'Provides a SageMaker Device Fleet resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_device_fleet'),
('aws_sagemaker_domain', 'machine-learning', 'Provides a SageMaker Domain resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_domain'),
('aws_sagemaker_endpoint', 'machine-learning', 'Provides a SageMaker Endpoint resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_endpoint'),
('aws_sagemaker_endpoint_configuration', 'machine-learning', 'Provides a SageMaker Endpoint Configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_endpoint_configuration'),
('aws_sagemaker_feature_group', 'machine-learning', 'Provides a SageMaker Feature Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_feature_group'),
('aws_sagemaker_flow_definition', 'machine-learning', 'Provides a SageMaker Flow Definition resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_flow_definition'),
('aws_sagemaker_human_task_ui', 'machine-learning', 'Provides a SageMaker Human Task UI resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_human_task_ui'),
('aws_sagemaker_image', 'machine-learning', 'Provides a SageMaker Image resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_image'),
('aws_sagemaker_image_version', 'machine-learning', 'Provides a SageMaker Image Version resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_image_version'),
('aws_sagemaker_model', 'machine-learning', 'Provides a SageMaker Model resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_model'),
('aws_sagemaker_model_package_group', 'machine-learning', 'Provides a SageMaker Model Package Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_model_package_group'),
('aws_sagemaker_model_package_group_policy', 'machine-learning', 'Provides a SageMaker Model Package Group Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_model_package_group_policy'),
('aws_sagemaker_notebook_instance', 'machine-learning', 'Provides a SageMaker Notebook Instance resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_notebook_instance'),
('aws_sagemaker_notebook_instance_lifecycle_configuration', 'machine-learning', 'Provides a SageMaker Notebook Instance Lifecycle Configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_notebook_instance_lifecycle_configuration'),
('aws_sagemaker_pipeline', 'machine-learning', 'Provides a SageMaker Pipeline resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_pipeline'),
('aws_sagemaker_project', 'machine-learning', 'Provides a SageMaker Project resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_project'),
('aws_sagemaker_space', 'machine-learning', 'Provides a SageMaker Space resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_space'),
('aws_sagemaker_studio_lifecycle_config', 'machine-learning', 'Provides a SageMaker Studio Lifecycle Config resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_studio_lifecycle_config'),
('aws_sagemaker_user_profile', 'machine-learning', 'Provides a SageMaker User Profile resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_user_profile'),
('aws_sagemaker_workforce', 'machine-learning', 'Provides a SageMaker Workforce resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_workforce'),
('aws_sagemaker_workteam', 'machine-learning', 'Provides a SageMaker Workteam resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/sagemaker_workteam'),

-- Secrets Manager
('aws_secretsmanager_secret', 'security', 'Provides a Secrets Manager Secret resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret'),
('aws_secretsmanager_secret_policy', 'security', 'Provides a Secrets Manager Secret Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret_policy'),
('aws_secretsmanager_secret_rotation', 'security', 'Provides a Secrets Manager Secret Rotation resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret_rotation'),
('aws_secretsmanager_secret_version', 'security', 'Provides a Secrets Manager Secret Version resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/secretsmanager_secret_version'),

-- Security Hub
('aws_securityhub_account', 'security', 'Provides a Security Hub Account resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_account'),
('aws_securityhub_action_target', 'security', 'Provides a Security Hub Action Target resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_action_target'),
('aws_securityhub_automation_rule', 'security', 'Provides a Security Hub Automation Rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_automation_rule'),
('aws_securityhub_configuration_policy', 'security', 'Provides a Security Hub Configuration Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_configuration_policy'),
('aws_securityhub_configuration_policy_association', 'security', 'Provides a Security Hub Configuration Policy Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_configuration_policy_association'),
('aws_securityhub_finding_aggregator', 'security', 'Provides a Security Hub Finding Aggregator resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_finding_aggregator'),
('aws_securityhub_insight', 'security', 'Provides a Security Hub Insight resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_insight'),
('aws_securityhub_invite_accepter', 'security', 'Provides a Security Hub Invite Accepter resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_invite_accepter'),
('aws_securityhub_member', 'security', 'Provides a Security Hub Member resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_member'),
('aws_securityhub_organization_admin_account', 'security', 'Provides a Security Hub Organization Admin Account resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_organization_admin_account'),
('aws_securityhub_organization_configuration', 'security', 'Provides a Security Hub Organization Configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_organization_configuration'),
('aws_securityhub_product_subscription', 'security', 'Provides a Security Hub Product Subscription resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_product_subscription'),
('aws_securityhub_standards_control', 'security', 'Provides a Security Hub Standards Control resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_standards_control'),
('aws_securityhub_standards_subscription', 'security', 'Provides a Security Hub Standards Subscription resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securityhub_standards_subscription'),

-- Security Lake
('aws_securitylake_aws_log_source', 'security', 'Provides a Security Lake AWS Log Source resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securitylake_aws_log_source'),
('aws_securitylake_custom_log_source', 'security', 'Provides a Security Lake Custom Log Source resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securitylake_custom_log_source'),
('aws_securitylake_data_lake', 'security', 'Provides a Security Lake Data Lake resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securitylake_data_lake'),
('aws_securitylake_subscriber', 'security', 'Provides a Security Lake Subscriber resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securitylake_subscriber'),
('aws_securitylake_subscriber_notification', 'security', 'Provides a Security Lake Subscriber Notification resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/securitylake_subscriber_notification'),

-- Serverless Application Repository
('aws_serverlessapplicationrepository_cloudformation_stack', 'compute', 'Provides a Serverless Application Repository CloudFormation Stack resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/serverlessapplicationrepository_cloudformation_stack'),

-- Service Catalog
('aws_servicecatalog_budget_resource_association', 'management', 'Provides a Service Catalog Budget Resource Association', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_budget_resource_association'),
('aws_servicecatalog_constraint', 'management', 'Provides a Service Catalog Constraint resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_constraint'),
('aws_servicecatalog_organizations_access', 'management', 'Provides a Service Catalog Organizations Access resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_organizations_access'),
('aws_servicecatalog_portfolio', 'management', 'Provides a Service Catalog Portfolio resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_portfolio'),
('aws_servicecatalog_portfolio_share', 'management', 'Provides a Service Catalog Portfolio Share resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_portfolio_share'),
('aws_servicecatalog_principal_portfolio_association', 'management', 'Provides a Service Catalog Principal Portfolio Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_principal_portfolio_association'),
('aws_servicecatalog_product', 'management', 'Provides a Service Catalog Product resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_product'),
('aws_servicecatalog_product_portfolio_association', 'management', 'Provides a Service Catalog Product Portfolio Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_product_portfolio_association'),
('aws_servicecatalog_provisioned_product', 'management', 'Provides a Service Catalog Provisioned Product resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioned_product'),
('aws_servicecatalog_provisioning_artifact', 'management', 'Provides a Service Catalog Provisioning Artifact resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_provisioning_artifact'),
('aws_servicecatalog_service_action', 'management', 'Provides a Service Catalog Service Action resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_service_action'),
('aws_servicecatalog_tag_option', 'management', 'Provides a Service Catalog Tag Option resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_tag_option'),
('aws_servicecatalog_tag_option_resource_association', 'management', 'Provides a Service Catalog Tag Option Resource Association', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/servicecatalog_tag_option_resource_association')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
