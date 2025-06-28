
-- Add additional AWS services: Neptune, Network Firewall, Network Manager, OpenSearch, Organizations, Outposts, Payment Cryptography, Pinpoint, Polly, and Pricing Calculator

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Neptune (Graph Database)
('aws_neptune_cluster', 'database', 'Provides a Neptune Cluster Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/neptune_cluster'),
('aws_neptune_cluster_instance', 'database', 'Provides a Neptune Cluster Instance Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/neptune_cluster_instance'),
('aws_neptune_cluster_parameter_group', 'database', 'Provides a Neptune Cluster Parameter Group Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/neptune_cluster_parameter_group'),
('aws_neptune_cluster_snapshot', 'database', 'Provides a Neptune Cluster Snapshot Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/neptune_cluster_snapshot'),
('aws_neptune_parameter_group', 'database', 'Provides a Neptune Parameter Group Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/neptune_parameter_group'),
('aws_neptune_subnet_group', 'database', 'Provides a Neptune Subnet Group Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/neptune_subnet_group'),

-- Neptune Analytics (Graph Analytics)
('aws_neptune_analytics_graph', 'analytics', 'Provides a Neptune Analytics Graph', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/neptune_analytics_graph'),
('aws_neptune_analytics_private_graph_endpoint', 'analytics', 'Provides a Neptune Analytics Private Graph Endpoint', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/neptune_analytics_private_graph_endpoint'),

-- Network Firewall (Network Security)
('aws_networkfirewall_firewall', 'security', 'Provides an AWS Network Firewall Firewall Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkfirewall_firewall'),
('aws_networkfirewall_firewall_policy', 'security', 'Provides an AWS Network Firewall Firewall Policy Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkfirewall_firewall_policy'),
('aws_networkfirewall_logging_configuration', 'security', 'Provides an AWS Network Firewall Logging Configuration Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkfirewall_logging_configuration'),
('aws_networkfirewall_rule_group', 'security', 'Provides an AWS Network Firewall Rule Group Resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkfirewall_rule_group'),

-- Network Manager (Global Network Management)
('aws_networkmanager_global_network', 'networking', 'Provides a Network Manager Global Network resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkmanager_global_network'),
('aws_networkmanager_device', 'networking', 'Provides a Network Manager Device resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkmanager_device'),
('aws_networkmanager_site', 'networking', 'Provides a Network Manager Site resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkmanager_site'),
('aws_networkmanager_link', 'networking', 'Provides a Network Manager Link resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkmanager_link'),
('aws_networkmanager_connection', 'networking', 'Provides a Network Manager Connection resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkmanager_connection'),

-- OpenSearch (Search and Analytics Engine)
('aws_opensearch_domain', 'analytics', 'Provides an OpenSearch Domain resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearch_domain'),
('aws_opensearch_domain_policy', 'analytics', 'Provides an OpenSearch Domain Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearch_domain_policy'),
('aws_opensearch_domain_saml_options', 'analytics', 'Provides an OpenSearch Domain SAML Options', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearch_domain_saml_options'),

-- OpenSearch Ingestion (Data Ingestion Pipelines)
('aws_opensearchingestion_pipeline', 'analytics', 'Provides an OpenSearch Ingestion Pipeline', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearchingestion_pipeline'),

-- OpenSearch Serverless (Serverless Search)
('aws_opensearchserverless_collection', 'analytics', 'Provides an OpenSearch Serverless Collection', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearchserverless_collection'),
('aws_opensearchserverless_access_policy', 'analytics', 'Provides an OpenSearch Serverless Access Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearchserverless_access_policy'),
('aws_opensearchserverless_security_policy', 'analytics', 'Provides an OpenSearch Serverless Security Policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearchserverless_security_policy'),
('aws_opensearchserverless_vpc_endpoint', 'analytics', 'Provides an OpenSearch Serverless VPC Endpoint', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearchserverless_vpc_endpoint'),

-- Organizations (Account Management)
('aws_organizations_organization', 'management', 'Provides a resource to create an organization', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/organizations_organization'),
('aws_organizations_account', 'management', 'Provides a resource to create a member account in the current organization', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/organizations_account'),
('aws_organizations_organizational_unit', 'management', 'Provides a resource to create an organizational unit', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/organizations_organizational_unit'),
('aws_organizations_policy', 'management', 'Provides a resource to manage an AWS Organizations policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/organizations_policy'),
('aws_organizations_policy_attachment', 'management', 'Provides a resource to attach an AWS Organizations policy', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/organizations_policy_attachment'),

-- Outposts (Hybrid Cloud Infrastructure)
('aws_outposts_outpost', 'compute', 'Provides an Outpost resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/outposts_outpost'),
('aws_outposts_site', 'compute', 'Provides an Outpost Site resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/outposts_site'),

-- Outposts (EC2) - Additional Outposts resources specific to EC2
('aws_ec2_local_gateway_route', 'networking', 'Provides an EC2 Local Gateway Route resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_local_gateway_route'),
('aws_ec2_local_gateway_route_table_vpc_association', 'networking', 'Provides an EC2 Local Gateway Route Table VPC Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_local_gateway_route_table_vpc_association'),

-- Payment Cryptography Control Plane (Payment Processing Security)
('aws_paymentcryptography_key', 'security', 'Provides a Payment Cryptography Key resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/paymentcryptography_key'),
('aws_paymentcryptography_alias', 'security', 'Provides a Payment Cryptography Alias resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/paymentcryptography_alias'),

-- Pinpoint (Customer Engagement)
('aws_pinpoint_app', 'marketing', 'Provides a Pinpoint App resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_app'),
('aws_pinpoint_adm_channel', 'marketing', 'Provides a Pinpoint ADM Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_adm_channel'),
('aws_pinpoint_apns_channel', 'marketing', 'Provides a Pinpoint APNS Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_apns_channel'),
('aws_pinpoint_apns_sandbox_channel', 'marketing', 'Provides a Pinpoint APNS Sandbox Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_apns_sandbox_channel'),
('aws_pinpoint_apns_voip_channel', 'marketing', 'Provides a Pinpoint APNS VoIP Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_apns_voip_channel'),
('aws_pinpoint_apns_voip_sandbox_channel', 'marketing', 'Provides a Pinpoint APNS VoIP Sandbox Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_apns_voip_sandbox_channel'),
('aws_pinpoint_baidu_channel', 'marketing', 'Provides a Pinpoint Baidu Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_baidu_channel'),
('aws_pinpoint_email_channel', 'marketing', 'Provides a Pinpoint Email Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_email_channel'),
('aws_pinpoint_event_stream', 'marketing', 'Provides a Pinpoint Event Stream resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_event_stream'),
('aws_pinpoint_gcm_channel', 'marketing', 'Provides a Pinpoint GCM Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_gcm_channel'),
('aws_pinpoint_sms_channel', 'marketing', 'Provides a Pinpoint SMS Channel resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/pinpoint_sms_channel'),

-- Polly (Text-to-Speech Service)
('aws_polly_lexicon', 'ai', 'Provides a Polly Lexicon resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/polly_lexicon'),

-- Pricing Calculator (Cost Estimation)
('aws_pricing_product', 'cost-management', 'Provides information about AWS service pricing', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/pricing_product')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
