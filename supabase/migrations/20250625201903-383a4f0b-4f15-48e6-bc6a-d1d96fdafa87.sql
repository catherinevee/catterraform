
-- Add more AWS services to the database (excluding duplicates)
-- Adding Data Pipeline, DataSync, DataZone, Detective, DevOps Guru, Device Farm, Direct Connect, Directory Service, DocumentDB, DynamoDB, EBS, and EC2 services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Data Pipeline
('aws_datapipeline_pipeline', 'analytics', 'Provides a Data Pipeline resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datapipeline_pipeline'),

-- DataSync
('aws_datasync_agent', 'migration', 'Provides a DataSync Agent resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datasync_agent'),
('aws_datasync_location_efs', 'migration', 'Provides a DataSync EFS Location resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datasync_location_efs'),
('aws_datasync_location_fsx_lustre_file_system', 'migration', 'Provides a DataSync FSx Lustre Location resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datasync_location_fsx_lustre_file_system'),
('aws_datasync_location_fsx_windows_file_system', 'migration', 'Provides a DataSync FSx Windows Location resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datasync_location_fsx_windows_file_system'),
('aws_datasync_location_s3', 'migration', 'Provides a DataSync S3 Location resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datasync_location_s3'),
('aws_datasync_task', 'migration', 'Provides a DataSync Task resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datasync_task'),

-- DataZone
('aws_datazone_domain', 'analytics', 'Provides a DataZone Domain resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datazone_domain'),
('aws_datazone_project', 'analytics', 'Provides a DataZone Project resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datazone_project'),
('aws_datazone_environment', 'analytics', 'Provides a DataZone Environment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/datazone_environment'),

-- Detective
('aws_detective_graph', 'security', 'Provides a Detective Graph resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/detective_graph'),
('aws_detective_invitation_accepter', 'security', 'Provides a Detective Invitation Accepter resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/detective_invitation_accepter'),
('aws_detective_member', 'security', 'Provides a Detective Member resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/detective_member'),

-- DevOps Guru
('aws_devopsguru_notification_channel', 'monitoring', 'Provides a DevOps Guru Notification Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/devopsguru_notification_channel'),
('aws_devopsguru_resource_collection', 'monitoring', 'Provides a DevOps Guru Resource Collection resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/devopsguru_resource_collection'),

-- Device Farm
('aws_devicefarm_project', 'testing', 'Provides a Device Farm Project resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/devicefarm_project'),
('aws_devicefarm_device_pool', 'testing', 'Provides a Device Farm Device Pool resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/devicefarm_device_pool'),
('aws_devicefarm_upload', 'testing', 'Provides a Device Farm Upload resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/devicefarm_upload'),

-- Direct Connect
('aws_dx_connection', 'networking', 'Provides a Direct Connect connection resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dx_connection'),
('aws_dx_gateway', 'networking', 'Provides a Direct Connect Gateway resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dx_gateway'),
('aws_dx_virtual_interface', 'networking', 'Provides a Direct Connect Virtual Interface resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dx_virtual_interface'),
('aws_dx_lag', 'networking', 'Provides a Direct Connect Link Aggregation Group (LAG) resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dx_lag'),

-- Directory Service
('aws_directory_service_directory', 'identity', 'Provides a Directory Service directory resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/directory_service_directory'),
('aws_directory_service_conditional_forwarder', 'identity', 'Provides a Directory Service Conditional Forwarder resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/directory_service_conditional_forwarder'),
('aws_directory_service_log_subscription', 'identity', 'Provides a Directory Service Log Subscription resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/directory_service_log_subscription'),

-- DocumentDB
('aws_docdb_cluster', 'database', 'Provides a DocumentDB Cluster resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/docdb_cluster'),
('aws_docdb_cluster_instance', 'database', 'Provides a DocumentDB Cluster Instance resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/docdb_cluster_instance'),
('aws_docdb_cluster_parameter_group', 'database', 'Provides a DocumentDB Cluster Parameter Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/docdb_cluster_parameter_group'),
('aws_docdb_subnet_group', 'database', 'Provides a DocumentDB Subnet Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/docdb_subnet_group'),

-- DocumentDB Elastic
('aws_docdbelastic_cluster', 'database', 'Provides a DocumentDB Elastic Cluster resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/docdbelastic_cluster'),

-- DynamoDB
('aws_dynamodb_table', 'database', 'Provides a DynamoDB table resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table'),
('aws_dynamodb_global_table', 'database', 'Provides a DynamoDB Global Table resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_global_table'),
('aws_dynamodb_backup', 'database', 'Provides a DynamoDB Backup resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_backup'),
('aws_dynamodb_table_item', 'database', 'Provides a DynamoDB Table Item resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table_item'),

-- DynamoDB Accelerator (DAX)
('aws_dax_cluster', 'database', 'Provides a DynamoDB Accelerator (DAX) Cluster resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dax_cluster'),
('aws_dax_parameter_group', 'database', 'Provides a DynamoDB Accelerator (DAX) Parameter Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dax_parameter_group'),
('aws_dax_subnet_group', 'database', 'Provides a DynamoDB Accelerator (DAX) Subnet Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dax_subnet_group'),

-- EBS (Elastic Block Store)
('aws_ebs_volume', 'storage', 'Provides an Elastic Block Store (EBS) volume resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ebs_volume'),
('aws_ebs_snapshot', 'storage', 'Provides an Elastic Block Store (EBS) snapshot resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ebs_snapshot'),
('aws_volume_attachment', 'storage', 'Provides an EBS Volume Attachment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/volume_attachment'),
('aws_ebs_encryption_by_default', 'storage', 'Provides a resource to manage whether default EBS encryption is enabled', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ebs_encryption_by_default'),

-- EC2 (Elastic Compute Cloud) - excluding aws_autoscaling_group which already exists
('aws_instance', 'compute', 'Provides an EC2 instance resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance'),
('aws_launch_configuration', 'compute', 'Provides a Launch Configuration resource for Auto Scaling Groups', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/launch_configuration'),
('aws_launch_template', 'compute', 'Provides an EC2 Launch Template resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/launch_template'),
('aws_key_pair', 'compute', 'Provides an EC2 Key Pair resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair'),
('aws_placement_group', 'compute', 'Provides an EC2 Placement Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/placement_group'),
('aws_spot_instance_request', 'compute', 'Provides an EC2 Spot Instance Request resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/spot_instance_request'),
('aws_spot_fleet_request', 'compute', 'Provides an EC2 Spot Fleet Request resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/spot_fleet_request')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
