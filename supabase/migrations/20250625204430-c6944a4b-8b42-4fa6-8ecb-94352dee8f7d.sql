
-- Add final AWS services: VPN, Verified Access, WAF, Wavelength, Web Services Budgets, and WorkSpaces

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- VPN (Client)
('aws_ec2_client_vpn_endpoint', 'networking', 'Provides an AWS Client VPN endpoint resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_client_vpn_endpoint'),
('aws_ec2_client_vpn_network_association', 'networking', 'Provides an AWS Client VPN network association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_client_vpn_network_association'),
('aws_ec2_client_vpn_authorization_rule', 'networking', 'Provides an AWS Client VPN authorization rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_client_vpn_authorization_rule'),
('aws_ec2_client_vpn_route', 'networking', 'Provides an AWS Client VPN route resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_client_vpn_route'),

-- VPN (Site-to-Site)
('aws_vpn_gateway', 'networking', 'Provides a VPN gateway resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpn_gateway'),
('aws_vpn_connection', 'networking', 'Provides a VPN connection resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpn_connection'),
('aws_vpn_connection_route', 'networking', 'Provides a VPN connection route resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpn_connection_route'),
('aws_vpn_gateway_attachment', 'networking', 'Provides a VPN gateway attachment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpn_gateway_attachment'),
('aws_vpn_gateway_route_propagation', 'networking', 'Provides a VPN gateway route propagation resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpn_gateway_route_propagation'),

-- Verified Access (Zero Trust Network Access)
('aws_verifiedaccess_endpoint', 'security', 'Provides a Verified Access endpoint resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedaccess_endpoint'),
('aws_verifiedaccess_group', 'security', 'Provides a Verified Access group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedaccess_group'),
('aws_verifiedaccess_instance', 'security', 'Provides a Verified Access instance resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedaccess_instance'),
('aws_verifiedaccess_instance_logging_configuration', 'security', 'Provides a Verified Access instance logging configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedaccess_instance_logging_configuration'),
('aws_verifiedaccess_instance_trust_provider_attachment', 'security', 'Provides a Verified Access instance trust provider attachment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedaccess_instance_trust_provider_attachment'),
('aws_verifiedaccess_trust_provider', 'security', 'Provides a Verified Access trust provider resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedaccess_trust_provider'),

-- Verified Permissions (Fine-grained Authorization)
('aws_verifiedpermissions_identity_source', 'security', 'Provides a Verified Permissions identity source resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedpermissions_identity_source'),
('aws_verifiedpermissions_policy', 'security', 'Provides a Verified Permissions policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedpermissions_policy'),
('aws_verifiedpermissions_policy_store', 'security', 'Provides a Verified Permissions policy store resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedpermissions_policy_store'),
('aws_verifiedpermissions_policy_template', 'security', 'Provides a Verified Permissions policy template resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedpermissions_policy_template'),
('aws_verifiedpermissions_schema', 'security', 'Provides a Verified Permissions schema resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/verifiedpermissions_schema'),

-- WAF (Web Application Firewall)
('aws_wafv2_web_acl', 'security', 'Provides an AWS WAFv2 Web ACL resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafv2_web_acl'),
('aws_wafv2_rule_group', 'security', 'Provides an AWS WAFv2 Rule Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafv2_rule_group'),
('aws_wafv2_ip_set', 'security', 'Provides an AWS WAFv2 IP Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafv2_ip_set'),
('aws_wafv2_regex_pattern_set', 'security', 'Provides an AWS WAFv2 Regex Pattern Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafv2_regex_pattern_set'),
('aws_wafv2_web_acl_association', 'security', 'Provides an AWS WAFv2 Web ACL Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafv2_web_acl_association'),
('aws_wafv2_web_acl_logging_configuration', 'security', 'Provides an AWS WAFv2 Web ACL logging configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafv2_web_acl_logging_configuration'),

-- WAF Classic (Legacy WAF)
('aws_waf_web_acl', 'security', 'Provides a WAF Web ACL resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_web_acl'),
('aws_waf_rule', 'security', 'Provides a WAF Rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_rule'),
('aws_waf_rule_group', 'security', 'Provides a WAF Rule Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_rule_group'),
('aws_waf_ipset', 'security', 'Provides a WAF IPSet resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_ipset'),
('aws_waf_byte_match_set', 'security', 'Provides a WAF Byte Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_byte_match_set'),
('aws_waf_geo_match_set', 'security', 'Provides a WAF Geo Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_geo_match_set'),
('aws_waf_regex_match_set', 'security', 'Provides a WAF Regex Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_regex_match_set'),
('aws_waf_regex_pattern_set', 'security', 'Provides a WAF Regex Pattern Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_regex_pattern_set'),
('aws_waf_size_constraint_set', 'security', 'Provides a WAF Size Constraint Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_size_constraint_set'),
('aws_waf_sql_injection_match_set', 'security', 'Provides a WAF SQL Injection Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_sql_injection_match_set'),
('aws_waf_xss_match_set', 'security', 'Provides a WAF XSS Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/waf_xss_match_set'),

-- WAF Classic Regional
('aws_wafregional_web_acl', 'security', 'Provides a WAF Regional Web ACL resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_web_acl'),
('aws_wafregional_web_acl_association', 'security', 'Provides a WAF Regional Web ACL Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_web_acl_association'),
('aws_wafregional_rule', 'security', 'Provides a WAF Regional Rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_rule'),
('aws_wafregional_rule_group', 'security', 'Provides a WAF Regional Rule Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_rule_group'),
('aws_wafregional_ipset', 'security', 'Provides a WAF Regional IPSet resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_ipset'),
('aws_wafregional_byte_match_set', 'security', 'Provides a WAF Regional Byte Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_byte_match_set'),
('aws_wafregional_geo_match_set', 'security', 'Provides a WAF Regional Geo Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_geo_match_set'),
('aws_wafregional_regex_match_set', 'security', 'Provides a WAF Regional Regex Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_regex_match_set'),
('aws_wafregional_regex_pattern_set', 'security', 'Provides a WAF Regional Regex Pattern Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_regex_pattern_set'),
('aws_wafregional_size_constraint_set', 'security', 'Provides a WAF Regional Size Constraint Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_size_constraint_set'),
('aws_wafregional_sql_injection_match_set', 'security', 'Provides a WAF Regional SQL Injection Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_sql_injection_match_set'),
('aws_wafregional_xss_match_set', 'security', 'Provides a WAF Regional XSS Match Set resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/wafregional_xss_match_set'),

-- Wavelength (Edge Computing)
('aws_ec2_carrier_gateway', 'networking', 'Provides a resource to create a VPC Carrier Gateway', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_carrier_gateway'),

-- Web Services Budgets (Cost Management)
('aws_budgets_budget', 'cost-management', 'Provides a budgets budget resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/budgets_budget'),
('aws_budgets_budget_action', 'cost-management', 'Provides a budgets budget action resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/budgets_budget_action'),

-- WorkSpaces (Virtual Desktops)
('aws_workspaces_workspace', 'compute', 'Provides a WorkSpaces Workspace resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_workspace'),
('aws_workspaces_directory', 'compute', 'Provides a WorkSpaces directory resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_directory'),
('aws_workspaces_bundle', 'compute', 'Provides a WorkSpaces bundle resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_bundle'),
('aws_workspaces_connection_alias', 'compute', 'Provides a WorkSpaces connection alias resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_connection_alias'),
('aws_workspaces_ip_group', 'compute', 'Provides a WorkSpaces IP group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_ip_group'),

-- WorkSpaces Web (Browser-based Desktops)
('aws_workspaces_web_browser_settings', 'compute', 'Provides a WorkSpaces Web browser settings resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_web_browser_settings'),
('aws_workspaces_web_identity_provider', 'compute', 'Provides a WorkSpaces Web identity provider resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_web_identity_provider'),
('aws_workspaces_web_network_settings', 'compute', 'Provides a WorkSpaces Web network settings resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_web_network_settings'),
('aws_workspaces_web_portal', 'compute', 'Provides a WorkSpaces Web portal resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_web_portal'),
('aws_workspaces_web_trust_store', 'compute', 'Provides a WorkSpaces Web trust store resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_web_trust_store'),
('aws_workspaces_web_user_access_logging_settings', 'compute', 'Provides a WorkSpaces Web user access logging settings resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_web_user_access_logging_settings'),
('aws_workspaces_web_user_settings', 'compute', 'Provides a WorkSpaces Web user settings resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/workspaces_web_user_settings')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
