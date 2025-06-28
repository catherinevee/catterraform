
-- Add AWS resources to the database
-- Starting with the sections from the uploaded image

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- ACM (Certificate Manager)
('aws_acm_certificate', 'security', 'Provides an ACM certificate resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate'),
('aws_acm_certificate_validation', 'security', 'Represents a successful certificate validation via DNS or EMAIL', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acm_certificate_validation'),

-- ACM PCA (Certificate Manager Private Certificate Authority)
('aws_acmpca_certificate_authority', 'security', 'Provides a resource to manage an AWS Certificate Manager Private Certificate Authority', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acmpca_certificate_authority'),
('aws_acmpca_certificate', 'security', 'Provides a resource to issue an AWS Certificate Manager Private Certificate Authority certificate', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acmpca_certificate'),
('aws_acmpca_certificate_authority_certificate', 'security', 'Associates a certificate with an AWS Certificate Manager Private Certificate Authority', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/acmpca_certificate_authority_certificate'),

-- AMP (Managed Prometheus)
('aws_prometheus_workspace', 'monitoring', 'Manages an Amazon Managed Service for Prometheus workspace', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/prometheus_workspace'),
('aws_prometheus_alert_manager_definition', 'monitoring', 'Manages an Amazon Managed Service for Prometheus alert manager definition', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/prometheus_alert_manager_definition'),
('aws_prometheus_rule_group_namespace', 'monitoring', 'Manages an Amazon Managed Service for Prometheus rule group namespace', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/prometheus_rule_group_namespace'),

-- API Gateway
('aws_api_gateway_rest_api', 'api', 'Manages a REST API in Amazon API Gateway', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_rest_api'),
('aws_api_gateway_resource', 'api', 'Provides an API Gateway Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_resource'),
('aws_api_gateway_method', 'api', 'Provides an HTTP Method for an API Gateway Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_method'),
('aws_api_gateway_integration', 'api', 'Provides an HTTP Method Integration for an API Gateway Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_integration'),
('aws_api_gateway_deployment', 'api', 'Manages a deployment of a REST API', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_deployment'),
('aws_api_gateway_stage', 'api', 'Manages an API Gateway Stage', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/api_gateway_stage'),

-- API Gateway V2
('aws_apigatewayv2_api', 'api', 'Manages an Amazon API Gateway Version 2 API', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_api'),
('aws_apigatewayv2_integration', 'api', 'Manages an Amazon API Gateway Version 2 integration', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_integration'),
('aws_apigatewayv2_route', 'api', 'Manages an Amazon API Gateway Version 2 route', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_route'),
('aws_apigatewayv2_stage', 'api', 'Manages an Amazon API Gateway Version 2 stage', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_stage'),
('aws_apigatewayv2_deployment', 'api', 'Manages an Amazon API Gateway Version 2 deployment', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_deployment'),

-- Account Management
('aws_account_alternate_contact', 'management', 'Manages alternate contact information for an AWS Account', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/account_alternate_contact'),
('aws_account_primary_contact', 'management', 'Manages primary contact information for an AWS Account', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/account_primary_contact'),

-- Amazon Q Business
('aws_qbusiness_application', 'ai', 'Provides an Amazon Q Business application resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/qbusiness_application'),
('aws_qbusiness_index', 'ai', 'Provides an Amazon Q Business index resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/qbusiness_index'),
('aws_qbusiness_data_source', 'ai', 'Provides an Amazon Q Business data source resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/qbusiness_data_source'),

-- Amplify
('aws_amplify_app', 'web', 'Provides an Amplify App resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/amplify_app'),
('aws_amplify_branch', 'web', 'Provides an Amplify Branch resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/amplify_branch'),
('aws_amplify_domain_association', 'web', 'Provides an Amplify Domain Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/amplify_domain_association'),
('aws_amplify_webhook', 'web', 'Provides an Amplify Webhook resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/amplify_webhook'),

-- App Mesh
('aws_appmesh_mesh', 'networking', 'Provides an AWS App Mesh service mesh resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appmesh_mesh'),
('aws_appmesh_virtual_node', 'networking', 'Provides an AWS App Mesh virtual node resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appmesh_virtual_node'),
('aws_appmesh_virtual_service', 'networking', 'Provides an AWS App Mesh virtual service resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appmesh_virtual_service'),
('aws_appmesh_virtual_router', 'networking', 'Provides an AWS App Mesh virtual router resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appmesh_virtual_router'),
('aws_appmesh_route', 'networking', 'Provides an AWS App Mesh route resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appmesh_route'),

-- App Runner
('aws_apprunner_service', 'compute', 'Manages an App Runner Service', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apprunner_service'),
('aws_apprunner_connection', 'compute', 'Manages an App Runner Connection', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apprunner_connection'),
('aws_apprunner_auto_scaling_configuration_version', 'compute', 'Manages an App Runner Auto Scaling Configuration Version', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apprunner_auto_scaling_configuration_version'),

-- AppConfig
('aws_appconfig_application', 'configuration', 'Provides an AppConfig Application resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appconfig_application'),
('aws_appconfig_environment', 'configuration', 'Provides an AppConfig Environment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appconfig_environment'),
('aws_appconfig_configuration_profile', 'configuration', 'Provides an AppConfig Configuration Profile resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appconfig_configuration_profile'),
('aws_appconfig_deployment_strategy', 'configuration', 'Provides an AppConfig Deployment Strategy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appconfig_deployment_strategy'),
('aws_appconfig_deployment', 'configuration', 'Provides an AppConfig Deployment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appconfig_deployment');
