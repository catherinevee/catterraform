
-- Add more AWS resources to the database
-- Adding Audit Manager, Auto Scaling, Backup, Batch, Bedrock, Billing, and Cost Explorer services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Audit Manager
('aws_auditmanager_assessment', 'compliance', 'Provides an AWS Audit Manager assessment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/auditmanager_assessment'),
('aws_auditmanager_framework', 'compliance', 'Provides an AWS Audit Manager framework resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/auditmanager_framework'),
('aws_auditmanager_control', 'compliance', 'Provides an AWS Audit Manager control resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/auditmanager_control'),

-- Auto Scaling
('aws_autoscaling_group', 'compute', 'Provides an Auto Scaling Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_group'),
('aws_autoscaling_policy', 'compute', 'Provides an Auto Scaling Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_policy'),
('aws_autoscaling_schedule', 'compute', 'Provides an Auto Scaling Schedule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_schedule'),
('aws_autoscaling_lifecycle_hook', 'compute', 'Provides an Auto Scaling Lifecycle Hook resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_lifecycle_hook'),
('aws_autoscaling_notification', 'compute', 'Provides an Auto Scaling Group notification resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscaling_notification'),

-- Auto Scaling Plans
('aws_autoscalingplans_scaling_plan', 'compute', 'Manages an AWS Auto Scaling scaling plan', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/autoscalingplans_scaling_plan'),

-- BCM Data Exports
('aws_bcmdataexports_export', 'billing', 'Provides a BCM Data Exports export resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bcmdataexports_export'),

-- Backup
('aws_backup_vault', 'backup', 'Provides an AWS Backup vault resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/backup_vault'),
('aws_backup_plan', 'backup', 'Provides an AWS Backup plan resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/backup_plan'),
('aws_backup_selection', 'backup', 'Provides an AWS Backup selection resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/backup_selection'),
('aws_backup_vault_policy', 'backup', 'Provides an AWS Backup vault policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/backup_vault_policy'),
('aws_backup_vault_lock_configuration', 'backup', 'Provides an AWS Backup vault lock configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/backup_vault_lock_configuration'),
('aws_backup_vault_notifications', 'backup', 'Provides an AWS Backup vault notifications resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/backup_vault_notifications'),
('aws_backup_framework', 'backup', 'Provides an AWS Backup framework resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/backup_framework'),
('aws_backup_report_plan', 'backup', 'Provides an AWS Backup report plan resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/backup_report_plan'),

-- Batch
('aws_batch_compute_environment', 'compute', 'Provides an AWS Batch compute environment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/batch_compute_environment'),
('aws_batch_job_queue', 'compute', 'Provides an AWS Batch job queue resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/batch_job_queue'),
('aws_batch_job_definition', 'compute', 'Provides an AWS Batch job definition resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/batch_job_definition'),
('aws_batch_scheduling_policy', 'compute', 'Provides an AWS Batch scheduling policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/batch_scheduling_policy'),

-- Bedrock
('aws_bedrock_model_customization_job', 'ai', 'Provides an AWS Bedrock model customization job resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrock_model_customization_job'),
('aws_bedrock_provisioned_model_throughput', 'ai', 'Provides an AWS Bedrock provisioned model throughput resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrock_provisioned_model_throughput'),
('aws_bedrock_custom_model', 'ai', 'Provides an AWS Bedrock custom model resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrock_custom_model'),

-- Bedrock Agents
('aws_bedrockagent_agent', 'ai', 'Provides an AWS Bedrock Agent resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrockagent_agent'),
('aws_bedrockagent_agent_alias', 'ai', 'Provides an AWS Bedrock Agent alias resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrockagent_agent_alias'),
('aws_bedrockagent_knowledge_base', 'ai', 'Provides an AWS Bedrock Agent knowledge base resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrockagent_knowledge_base'),
('aws_bedrockagent_data_source', 'ai', 'Provides an AWS Bedrock Agent data source resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/bedrockagent_data_source'),

-- Billing
('aws_billing_budget', 'billing', 'Provides a budgets budget resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/budgets_budget'),
('aws_billing_budget_action', 'billing', 'Provides a budgets budget action resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/budgets_budget_action'),

-- CE (Cost Explorer)
('aws_ce_anomaly_detector', 'billing', 'Provides a CE Anomaly Detector resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ce_anomaly_detector'),
('aws_ce_anomaly_monitor', 'billing', 'Provides a CE Anomaly Monitor resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ce_anomaly_monitor'),
('aws_ce_anomaly_subscription', 'billing', 'Provides a CE Anomaly Subscription resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ce_anomaly_subscription'),
('aws_ce_cost_category', 'billing', 'Provides a CE Cost Category resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ce_cost_category');
