
-- Add additional AWS services: ECR, ECS, EFS, EKS, ELB, EMR, ElastiCache, Elastic Beanstalk, Elastic Transcoder, and Elasticsearch

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- ECR (Elastic Container Registry)
('aws_ecr_repository', 'containers', 'Provides an Elastic Container Registry Repository', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_repository'),
('aws_ecr_repository_policy', 'containers', 'Provides an ECR Repository Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_repository_policy'),
('aws_ecr_lifecycle_policy', 'containers', 'Provides an ECR Lifecycle Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_lifecycle_policy'),
('aws_ecr_registry_policy', 'containers', 'Provides an ECR Registry Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_registry_policy'),
('aws_ecr_replication_configuration', 'containers', 'Provides an ECR Replication Configuration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecr_replication_configuration'),

-- ECR Public
('aws_ecrpublic_repository', 'containers', 'Provides an ECR Public Repository', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecrpublic_repository'),
('aws_ecrpublic_repository_policy', 'containers', 'Provides an ECR Public Repository Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecrpublic_repository_policy'),

-- ECS (Elastic Container Service)
('aws_ecs_cluster', 'containers', 'Provides an ECS Cluster', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_cluster'),
('aws_ecs_service', 'containers', 'Provides an ECS Service', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service'),
('aws_ecs_task_definition', 'containers', 'Provides an ECS Task Definition', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_task_definition'),
('aws_ecs_capacity_provider', 'containers', 'Provides an ECS Capacity Provider', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_capacity_provider'),
('aws_ecs_cluster_capacity_providers', 'containers', 'Provides an ECS Cluster Capacity Providers resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_cluster_capacity_providers'),

-- EFS (Elastic File System)
('aws_efs_file_system', 'storage', 'Provides an Elastic File System (EFS)', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system'),
('aws_efs_mount_target', 'storage', 'Provides an EFS Mount Target', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_mount_target'),
('aws_efs_access_point', 'storage', 'Provides an EFS Access Point', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_access_point'),
('aws_efs_file_system_policy', 'storage', 'Provides an EFS File System Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system_policy'),
('aws_efs_backup_policy', 'storage', 'Provides an EFS Backup Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_backup_policy'),

-- EKS (Elastic Kubernetes Service)
('aws_eks_cluster', 'containers', 'Provides an EKS Cluster', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_cluster'),
('aws_eks_node_group', 'containers', 'Provides an EKS Node Group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_node_group'),
('aws_eks_fargate_profile', 'containers', 'Provides an EKS Fargate Profile', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_fargate_profile'),
('aws_eks_addon', 'containers', 'Provides an EKS Addon', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_addon'),
('aws_eks_identity_provider_config', 'containers', 'Provides an EKS Identity Provider Config', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_identity_provider_config'),

-- ELB (Elastic Load Balancing)
('aws_lb', 'networking', 'Provides a Load Balancer resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb'),
('aws_lb_target_group', 'networking', 'Provides a Load Balancer Target Group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group'),
('aws_lb_listener', 'networking', 'Provides a Load Balancer Listener', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener'),
('aws_lb_target_group_attachment', 'networking', 'Provides a Load Balancer Target Group Attachment', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group_attachment'),

-- ELB Classic
('aws_elb', 'networking', 'Provides an Elastic Load Balancer', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb'),
('aws_elb_attachment', 'networking', 'Provides an ELB Attachment', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb_attachment'),

-- EMR (Elastic MapReduce)
('aws_emr_cluster', 'analytics', 'Provides an EMR Cluster', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/emr_cluster'),
('aws_emr_instance_group', 'analytics', 'Provides an EMR Instance Group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/emr_instance_group'),
('aws_emr_instance_fleet', 'analytics', 'Provides an EMR Instance Fleet', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/emr_instance_fleet'),
('aws_emr_security_configuration', 'analytics', 'Provides an EMR Security Configuration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/emr_security_configuration'),
('aws_emr_studio', 'analytics', 'Provides an EMR Studio', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/emr_studio'),

-- EMR Containers
('aws_emrcontainers_virtual_cluster', 'containers', 'Provides an EMR Containers Virtual Cluster', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/emrcontainers_virtual_cluster'),
('aws_emrcontainers_job_template', 'containers', 'Provides an EMR Containers Job Template', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/emrcontainers_job_template'),

-- EMR Serverless
('aws_emrserverless_application', 'analytics', 'Provides an EMR Serverless Application', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/emrserverless_application'),

-- ElastiCache
('aws_elasticache_cluster', 'database', 'Provides an ElastiCache Cluster', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_cluster'),
('aws_elasticache_replication_group', 'database', 'Provides an ElastiCache Replication Group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_replication_group'),
('aws_elasticache_subnet_group', 'database', 'Provides an ElastiCache Subnet Group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_subnet_group'),
('aws_elasticache_parameter_group', 'database', 'Provides an ElastiCache Parameter Group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_parameter_group'),
('aws_elasticache_user', 'database', 'Provides an ElastiCache User', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_user'),
('aws_elasticache_user_group', 'database', 'Provides an ElastiCache User Group', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_user_group'),

-- Elastic Beanstalk
('aws_elastic_beanstalk_application', 'compute', 'Provides an Elastic Beanstalk Application', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elastic_beanstalk_application'),
('aws_elastic_beanstalk_environment', 'compute', 'Provides an Elastic Beanstalk Environment', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elastic_beanstalk_environment'),
('aws_elastic_beanstalk_application_version', 'compute', 'Provides an Elastic Beanstalk Application Version', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elastic_beanstalk_application_version'),
('aws_elastic_beanstalk_configuration_template', 'compute', 'Provides an Elastic Beanstalk Configuration Template', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elastic_beanstalk_configuration_template'),

-- Elastic Transcoder
('aws_elastictranscoder_pipeline', 'media', 'Provides an Elastic Transcoder Pipeline', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elastictranscoder_pipeline'),
('aws_elastictranscoder_preset', 'media', 'Provides an Elastic Transcoder Preset', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elastictranscoder_preset'),

-- Elasticsearch
('aws_elasticsearch_domain', 'analytics', 'Provides an Elasticsearch Domain', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticsearch_domain'),
('aws_elasticsearch_domain_policy', 'analytics', 'Provides an Elasticsearch Domain Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticsearch_domain_policy'),
('aws_elasticsearch_domain_saml_options', 'analytics', 'Provides an Elasticsearch Domain SAML Options', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticsearch_domain_saml_options')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
