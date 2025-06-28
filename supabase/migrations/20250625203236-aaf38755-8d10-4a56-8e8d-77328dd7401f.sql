
-- Add additional AWS services: QLDB, QuickSight, RAM, RDS, Recycle Bin, Redshift, Rekognition, Resilience Hub, Resource Explorer, Resource Groups, Roles Anywhere, and Route 53

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- QLDB (Quantum Ledger Database)
('aws_qldb_ledger', 'database', 'Provides an AWS Quantum Ledger Database (QLDB) resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/qldb_ledger'),
('aws_qldb_stream', 'database', 'Provides an AWS QLDB Stream resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/qldb_stream'),

-- QuickSight (Business Intelligence)
('aws_quicksight_account_subscription', 'analytics', 'Provides a QuickSight Account Subscription resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_account_subscription'),
('aws_quicksight_analysis', 'analytics', 'Provides a QuickSight Analysis resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_analysis'),
('aws_quicksight_dashboard', 'analytics', 'Provides a QuickSight Dashboard resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_dashboard'),
('aws_quicksight_data_set', 'analytics', 'Provides a QuickSight Data Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_data_set'),
('aws_quicksight_data_source', 'analytics', 'Provides a QuickSight Data Source resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_data_source'),
('aws_quicksight_folder', 'analytics', 'Provides a QuickSight Folder resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_folder'),
('aws_quicksight_group', 'analytics', 'Provides a QuickSight Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_group'),
('aws_quicksight_template', 'analytics', 'Provides a QuickSight Template resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_template'),
('aws_quicksight_theme', 'analytics', 'Provides a QuickSight Theme resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_theme'),
('aws_quicksight_user', 'analytics', 'Provides a QuickSight User resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/quicksight_user'),

-- RAM (Resource Access Manager)
('aws_ram_resource_association', 'management', 'Provides a Resource Access Manager (RAM) Resource Association', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ram_resource_association'),
('aws_ram_resource_share', 'management', 'Provides a Resource Access Manager (RAM) Resource Share', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ram_resource_share'),
('aws_ram_resource_share_accepter', 'management', 'Provides a Resource Access Manager (RAM) Resource Share Accepter', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ram_resource_share_accepter'),
('aws_ram_principal_association', 'management', 'Provides a Resource Access Manager (RAM) Principal Association', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ram_principal_association'),

-- RDS (Relational Database Service)
('aws_db_instance', 'database', 'Provides an RDS instance resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_instance'),
('aws_db_cluster', 'database', 'Provides an RDS Cluster Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_cluster'),
('aws_db_cluster_instance', 'database', 'Provides an RDS Cluster Instance Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_cluster_instance'),
('aws_db_parameter_group', 'database', 'Provides an RDS DB parameter group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_parameter_group'),
('aws_db_cluster_parameter_group', 'database', 'Provides an RDS DB cluster parameter group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_cluster_parameter_group'),
('aws_db_subnet_group', 'database', 'Provides an RDS DB subnet group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_subnet_group'),
('aws_db_option_group', 'database', 'Provides an RDS DB option group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_option_group'),
('aws_db_snapshot', 'database', 'Provides an RDS DB snapshot resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_snapshot'),
('aws_db_cluster_snapshot', 'database', 'Provides an RDS DB cluster snapshot resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/db_cluster_snapshot'),

-- Recycle Bin (Data Lifecycle Management)
('aws_rbin_rule', 'storage', 'Provides a Recycle Bin Rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/rbin_rule'),

-- Redshift (Data Warehouse)
('aws_redshift_cluster', 'analytics', 'Provides a Redshift Cluster Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshift_cluster'),
('aws_redshift_parameter_group', 'analytics', 'Provides a Redshift Parameter Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshift_parameter_group'),
('aws_redshift_subnet_group', 'analytics', 'Provides a Redshift Subnet Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshift_subnet_group'),
('aws_redshift_security_group', 'analytics', 'Provides a Redshift security group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshift_security_group'),
('aws_redshift_event_subscription', 'analytics', 'Provides a Redshift event subscription resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshift_event_subscription'),
('aws_redshift_snapshot_copy_grant', 'analytics', 'Provides a Redshift Snapshot Copy Grant resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshift_snapshot_copy_grant'),
('aws_redshift_cluster_snapshot', 'analytics', 'Provides a Redshift Cluster Snapshot resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshift_cluster_snapshot'),

-- Redshift Data (Data API)
('aws_redshiftdata_statement', 'analytics', 'Provides a Redshift Data Statement resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshiftdata_statement'),

-- Redshift Serverless
('aws_redshiftserverless_namespace', 'analytics', 'Provides a Redshift Serverless Namespace resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshiftserverless_namespace'),
('aws_redshiftserverless_workgroup', 'analytics', 'Provides a Redshift Serverless Workgroup resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshiftserverless_workgroup'),
('aws_redshiftserverless_endpoint_access', 'analytics', 'Provides a Redshift Serverless Endpoint Access resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshiftserverless_endpoint_access'),
('aws_redshiftserverless_resource_policy', 'analytics', 'Provides a Redshift Serverless Resource Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshiftserverless_resource_policy'),
('aws_redshiftserverless_snapshot', 'analytics', 'Provides a Redshift Serverless Snapshot resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshiftserverless_snapshot'),
('aws_redshiftserverless_usage_limit', 'analytics', 'Provides a Redshift Serverless Usage Limit resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/redshiftserverless_usage_limit'),

-- Rekognition (Computer Vision)
('aws_rekognition_collection', 'ai', 'Provides a Rekognition Collection resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/rekognition_collection'),
('aws_rekognition_project', 'ai', 'Provides a Rekognition Project resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/rekognition_project'),
('aws_rekognition_stream_processor', 'ai', 'Provides a Rekognition Stream Processor resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/rekognition_stream_processor'),

-- Resilience Hub (Application Resilience)
('aws_resiliencehub_app', 'management', 'Provides a Resilience Hub App resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/resiliencehub_app'),
('aws_resiliencehub_resiliency_policy', 'management', 'Provides a Resilience Hub Resiliency Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/resiliencehub_resiliency_policy'),

-- Resource Explorer (Resource Discovery)
('aws_resourceexplorer2_index', 'management', 'Provides a Resource Explorer Index resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/resourceexplorer2_index'),
('aws_resourceexplorer2_view', 'management', 'Provides a Resource Explorer View resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/resourceexplorer2_view'),

-- Resource Groups (Resource Organization)
('aws_resourcegroups_group', 'management', 'Provides a Resource Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/resourcegroups_group'),
('aws_resourcegroups_resource', 'management', 'Provides a Resource Groups Resource resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/resourcegroups_resource'),

-- Resource Groups Tagging (Tag Management)
('aws_resourcegroupstaggingapi_resources', 'management', 'Provides a Resource Groups Tagging API Resources resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/resourcegroupstaggingapi_resources'),

-- Roles Anywhere (Certificate-based Authentication)
('aws_rolesanywhere_profile', 'security', 'Provides a Roles Anywhere Profile resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/rolesanywhere_profile'),
('aws_rolesanywhere_trust_anchor', 'security', 'Provides a Roles Anywhere Trust Anchor resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/rolesanywhere_trust_anchor'),

-- Route 53 (DNS Service)
('aws_route53_zone', 'networking', 'Provides a Route53 Hosted Zone resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_zone'),
('aws_route53_record', 'networking', 'Provides a Route53 record resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record'),
('aws_route53_health_check', 'networking', 'Provides a Route53 health check resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_health_check'),
('aws_route53_delegation_set', 'networking', 'Provides a Route53 delegation set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_delegation_set'),
('aws_route53_zone_association', 'networking', 'Provides a Route53 private hosted zone to VPC association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_zone_association'),
('aws_route53_resolver_endpoint', 'networking', 'Provides a Route53 Resolver Endpoint resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_endpoint'),
('aws_route53_resolver_rule', 'networking', 'Provides a Route53 Resolver Rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_rule'),
('aws_route53_resolver_rule_association', 'networking', 'Provides a Route53 Resolver Rule Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_resolver_rule_association')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
