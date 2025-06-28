
-- Add additional AWS services: Shield, Signer, Storage Gateway, Timestream, Transcribe, Transfer Family, Transit Gateway, User Notifications, VPC, and VPC-related services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Shield (DDoS Protection)
('aws_shield_protection', 'security', 'Provides a Shield Protection resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/shield_protection'),
('aws_shield_protection_group', 'security', 'Provides a Shield Protection Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/shield_protection_group'),
('aws_shield_protection_health_check_association', 'security', 'Provides a Shield Protection Health Check Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/shield_protection_health_check_association'),
('aws_shield_proactive_engagement', 'security', 'Provides a Shield Proactive Engagement resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/shield_proactive_engagement'),

-- Signer (Code Signing)
('aws_signer_signing_job', 'security', 'Provides a Signer signing job resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/signer_signing_job'),
('aws_signer_signing_profile', 'security', 'Provides a Signer signing profile resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/signer_signing_profile'),
('aws_signer_signing_profile_permission', 'security', 'Provides a Signer signing profile permission resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/signer_signing_profile_permission'),

-- Storage Gateway (Hybrid Cloud Storage)
('aws_storagegateway_gateway', 'storage', 'Provides a Storage Gateway resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_gateway'),
('aws_storagegateway_cache', 'storage', 'Provides a Storage Gateway cache resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_cache'),
('aws_storagegateway_cached_iscsi_volume', 'storage', 'Provides a Storage Gateway cached iSCSI volume resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_cached_iscsi_volume'),
('aws_storagegateway_file_system_association', 'storage', 'Provides a Storage Gateway file system association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_file_system_association'),
('aws_storagegateway_nfs_file_share', 'storage', 'Provides a Storage Gateway NFS file share resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_nfs_file_share'),
('aws_storagegateway_smb_file_share', 'storage', 'Provides a Storage Gateway SMB file share resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_smb_file_share'),
('aws_storagegateway_stored_iscsi_volume', 'storage', 'Provides a Storage Gateway stored iSCSI volume resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_stored_iscsi_volume'),
('aws_storagegateway_tape_pool', 'storage', 'Provides a Storage Gateway tape pool resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_tape_pool'),
('aws_storagegateway_upload_buffer', 'storage', 'Provides a Storage Gateway upload buffer resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_upload_buffer'),
('aws_storagegateway_working_storage', 'storage', 'Provides a Storage Gateway working storage resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/storagegateway_working_storage'),

-- Timestream Query (Time Series Analytics)
('aws_timestreamquery_scheduled_query', 'analytics', 'Provides a Timestream Query scheduled query resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/timestreamquery_scheduled_query'),

-- Timestream Write (Time Series Database)
('aws_timestreamwrite_database', 'database', 'Provides a Timestream Write database resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/timestreamwrite_database'),
('aws_timestreamwrite_table', 'database', 'Provides a Timestream Write table resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/timestreamwrite_table'),

-- Timestream for InfluxDB (Time Series Database)
('aws_timestreaminfluxdb_db_instance', 'database', 'Provides a Timestream for InfluxDB instance resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/timestreaminfluxdb_db_instance'),

-- Transcribe (Speech-to-Text)
('aws_transcribe_language_model', 'ai', 'Provides a Transcribe Language Model resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transcribe_language_model'),
('aws_transcribe_medical_vocabulary', 'ai', 'Provides a Transcribe Medical Vocabulary resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transcribe_medical_vocabulary'),
('aws_transcribe_vocabulary', 'ai', 'Provides a Transcribe Vocabulary resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transcribe_vocabulary'),
('aws_transcribe_vocabulary_filter', 'ai', 'Provides a Transcribe Vocabulary Filter resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transcribe_vocabulary_filter'),

-- Transfer Family (Managed File Transfer)
('aws_transfer_server', 'storage', 'Provides a Transfer Family server resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transfer_server'),
('aws_transfer_user', 'storage', 'Provides a Transfer Family user resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transfer_user'),
('aws_transfer_ssh_key', 'storage', 'Provides a Transfer Family SSH key resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transfer_ssh_key'),
('aws_transfer_access', 'storage', 'Provides a Transfer Family access resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transfer_access'),
('aws_transfer_agreement', 'storage', 'Provides a Transfer Family agreement resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transfer_agreement'),
('aws_transfer_certificate', 'storage', 'Provides a Transfer Family certificate resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transfer_certificate'),
('aws_transfer_connector', 'storage', 'Provides a Transfer Family connector resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transfer_connector'),
('aws_transfer_profile', 'storage', 'Provides a Transfer Family profile resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transfer_profile'),
('aws_transfer_workflow', 'storage', 'Provides a Transfer Family workflow resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/transfer_workflow'),

-- Transit Gateway (Already exists in previous migrations, but adding additional resources)
('aws_ec2_transit_gateway_multicast_domain', 'networking', 'Provides an EC2 Transit Gateway Multicast Domain resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_multicast_domain'),
('aws_ec2_transit_gateway_multicast_domain_association', 'networking', 'Provides an EC2 Transit Gateway Multicast Domain Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_multicast_domain_association'),
('aws_ec2_transit_gateway_multicast_group_member', 'networking', 'Provides an EC2 Transit Gateway Multicast Group Member resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_multicast_group_member'),
('aws_ec2_transit_gateway_multicast_group_source', 'networking', 'Provides an EC2 Transit Gateway Multicast Group Source resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_multicast_group_source'),
('aws_ec2_transit_gateway_connect', 'networking', 'Provides an EC2 Transit Gateway Connect resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_connect'),
('aws_ec2_transit_gateway_connect_peer', 'networking', 'Provides an EC2 Transit Gateway Connect Peer resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_connect_peer'),
('aws_ec2_transit_gateway_peering_attachment', 'networking', 'Provides an EC2 Transit Gateway Peering Attachment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_peering_attachment'),
('aws_ec2_transit_gateway_peering_attachment_accepter', 'networking', 'Provides an EC2 Transit Gateway Peering Attachment Accepter resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_peering_attachment_accepter'),
('aws_ec2_transit_gateway_policy_table', 'networking', 'Provides an EC2 Transit Gateway Policy Table resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_policy_table'),
('aws_ec2_transit_gateway_policy_table_association', 'networking', 'Provides an EC2 Transit Gateway Policy Table Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_policy_table_association'),
('aws_ec2_transit_gateway_prefix_list_reference', 'networking', 'Provides an EC2 Transit Gateway Prefix List Reference resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_prefix_list_reference'),
('aws_ec2_transit_gateway_route', 'networking', 'Provides an EC2 Transit Gateway Route resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_route'),
('aws_ec2_transit_gateway_route_table', 'networking', 'Provides an EC2 Transit Gateway Route Table resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_route_table'),
('aws_ec2_transit_gateway_route_table_association', 'networking', 'Provides an EC2 Transit Gateway Route Table Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_route_table_association'),
('aws_ec2_transit_gateway_route_table_propagation', 'networking', 'Provides an EC2 Transit Gateway Route Table Propagation resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ec2_transit_gateway_route_table_propagation'),

-- User Notifications (Centralized Notifications)
('aws_usernotifications_notification_configuration', 'messaging', 'Provides a User Notifications configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/usernotifications_notification_configuration'),

-- User Notifications Contacts (Contact Management)
('aws_usernotificationscontacts_contact', 'messaging', 'Provides a User Notifications contact resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/usernotificationscontacts_contact'),

-- VPC (Virtual Private Cloud) - Core networking resources
('aws_vpc', 'networking', 'Provides a VPC resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc'),
('aws_subnet', 'networking', 'Provides a VPC subnet resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/subnet'),
('aws_internet_gateway', 'networking', 'Provides a resource to create a VPC Internet Gateway', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/internet_gateway'),
('aws_nat_gateway', 'networking', 'Provides a resource to create a VPC NAT Gateway', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/nat_gateway'),
('aws_route_table', 'networking', 'Provides a resource to create a VPC routing table', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route_table'),
('aws_route', 'networking', 'Provides a resource to create a routing table entry', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route'),
('aws_route_table_association', 'networking', 'Provides a resource to create an association between a route table and a subnet', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route_table_association'),
('aws_security_group', 'networking', 'Provides a security group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group'),
('aws_security_group_rule', 'networking', 'Provides a security group rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group_rule'),
('aws_network_acl', 'networking', 'Provides an network ACL resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/network_acl'),
('aws_network_acl_rule', 'networking', 'Provides a network ACL Rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/network_acl_rule'),
('aws_network_acl_association', 'networking', 'Provides an network ACL association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/network_acl_association'),
('aws_vpc_dhcp_options', 'networking', 'Provides a VPC DHCP Options resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_dhcp_options'),
('aws_vpc_dhcp_options_association', 'networking', 'Provides a VPC DHCP Options Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_dhcp_options_association'),
('aws_vpc_endpoint', 'networking', 'Provides a VPC Endpoint resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_endpoint'),
('aws_vpc_endpoint_service', 'networking', 'Provides a VPC endpoint service resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_endpoint_service'),
('aws_vpc_endpoint_service_allowed_principal', 'networking', 'Provides a VPC endpoint service allowed principal resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_endpoint_service_allowed_principal'),
('aws_vpc_peering_connection', 'networking', 'Provides a resource to manage a VPC peering connection', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_peering_connection'),
('aws_vpc_peering_connection_accepter', 'networking', 'Provides a resource to manage the accepter side of a VPC peering connection', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_peering_connection_accepter'),
('aws_vpc_peering_connection_options', 'networking', 'Provides a resource to manage VPC peering connection options', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_peering_connection_options'),

-- VPC IPAM (IP Address Manager)
('aws_vpc_ipam', 'networking', 'Provides a VPC IPAM resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_ipam'),
('aws_vpc_ipam_organization_admin_account', 'networking', 'Provides a VPC IPAM Organization Admin Account resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_ipam_organization_admin_account'),
('aws_vpc_ipam_pool', 'networking', 'Provides a VPC IPAM Pool resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_ipam_pool'),
('aws_vpc_ipam_pool_cidr', 'networking', 'Provides a VPC IPAM Pool CIDR resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_ipam_pool_cidr'),
('aws_vpc_ipam_pool_cidr_allocation', 'networking', 'Provides a VPC IPAM Pool CIDR allocation resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_ipam_pool_cidr_allocation'),
('aws_vpc_ipam_preview_next_cidr', 'networking', 'Provides a VPC IPAM Preview Next CIDR resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_ipam_preview_next_cidr'),
('aws_vpc_ipam_resource_discovery', 'networking', 'Provides a VPC IPAM Resource Discovery resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_ipam_resource_discovery'),
('aws_vpc_ipam_resource_discovery_association', 'networking', 'Provides a VPC IPAM Resource Discovery Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_ipam_resource_discovery_association'),
('aws_vpc_ipam_scope', 'networking', 'Provides a VPC IPAM Scope resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpc_ipam_scope'),

-- VPC Lattice (Application Networking)
('aws_vpclattice_access_log_subscription', 'networking', 'Provides a VPC Lattice Access Log Subscription resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_access_log_subscription'),
('aws_vpclattice_auth_policy', 'networking', 'Provides a VPC Lattice Auth Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_auth_policy'),
('aws_vpclattice_listener', 'networking', 'Provides a VPC Lattice Listener resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_listener'),
('aws_vpclattice_listener_rule', 'networking', 'Provides a VPC Lattice Listener Rule resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_listener_rule'),
('aws_vpclattice_resource_policy', 'networking', 'Provides a VPC Lattice Resource Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_resource_policy'),
('aws_vpclattice_service', 'networking', 'Provides a VPC Lattice Service resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_service'),
('aws_vpclattice_service_network', 'networking', 'Provides a VPC Lattice Service Network resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_service_network'),
('aws_vpclattice_service_network_service_association', 'networking', 'Provides a VPC Lattice Service Network Service Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_service_network_service_association'),
('aws_vpclattice_service_network_vpc_association', 'networking', 'Provides a VPC Lattice Service Network VPC Association resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_service_network_vpc_association'),
('aws_vpclattice_target_group', 'networking', 'Provides a VPC Lattice Target Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_target_group'),
('aws_vpclattice_target_group_attachment', 'networking', 'Provides a VPC Lattice Target Group Attachment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/vpclattice_target_group_attachment')

-- Handle conflicts with ON CONFLICT clause for any remaining duplicates
ON CONFLICT (type) DO NOTHING;
