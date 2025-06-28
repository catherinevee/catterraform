
-- Add more AWS Cloud services to the database
-- Adding Cloud9, CloudFormation, CloudFront, CloudHSM, CloudSearch, CloudTrail, and CloudWatch services

INSERT INTO public.azure_resources (type, category, description, docs_url) VALUES
-- Cloud9
('aws_cloud9_environment_ec2', 'development', 'Provides an AWS Cloud9 EC2 development environment', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloud9_environment_ec2'),
('aws_cloud9_environment_membership', 'development', 'Provides an AWS Cloud9 environment membership', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloud9_environment_membership'),

-- CloudFormation
('aws_cloudformation_stack', 'infrastructure', 'Provides a CloudFormation Stack resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudformation_stack'),
('aws_cloudformation_stack_set', 'infrastructure', 'Manages a CloudFormation StackSet', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudformation_stack_set'),
('aws_cloudformation_stack_set_instance', 'infrastructure', 'Manages a CloudFormation StackSet Instance', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudformation_stack_set_instance'),
('aws_cloudformation_type', 'infrastructure', 'Manages a CloudFormation Type', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudformation_type'),

-- CloudFront
('aws_cloudfront_distribution', 'cdn', 'Provides a CloudFront web distribution resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution'),
('aws_cloudfront_origin_access_identity', 'cdn', 'Provides a CloudFront origin access identity', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_origin_access_identity'),
('aws_cloudfront_origin_access_control', 'cdn', 'Manages a CloudFront origin access control', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_origin_access_control'),
('aws_cloudfront_cache_policy', 'cdn', 'Provides a CloudFront cache policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_cache_policy'),
('aws_cloudfront_origin_request_policy', 'cdn', 'Provides a CloudFront origin request policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_origin_request_policy'),
('aws_cloudfront_response_headers_policy', 'cdn', 'Provides a CloudFront response headers policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_response_headers_policy'),
('aws_cloudfront_function', 'cdn', 'Provides a CloudFront Function resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_function'),
('aws_cloudfront_key_group', 'cdn', 'Provides a CloudFront Key Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_key_group'),
('aws_cloudfront_public_key', 'cdn', 'Provides a CloudFront Public Key resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_public_key'),
('aws_cloudfront_realtime_log_config', 'cdn', 'Provides a CloudFront real-time log configuration resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_realtime_log_config'),

-- CloudFront KeyValueStore
('aws_cloudfront_key_value_store', 'cdn', 'Provides a CloudFront KeyValueStore resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_key_value_store'),

-- CloudHSM
('aws_cloudhsm_v2_cluster', 'security', 'Creates a CloudHSM v2 cluster', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudhsm_v2_cluster'),
('aws_cloudhsm_v2_hsm', 'security', 'Creates a CloudHSM v2 HSM module', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudhsm_v2_hsm'),

-- CloudSearch
('aws_cloudsearch_domain', 'search', 'Provides an AWS CloudSearch domain resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudsearch_domain'),
('aws_cloudsearch_domain_service_access_policy', 'search', 'Provides an AWS CloudSearch domain service access policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudsearch_domain_service_access_policy'),

-- CloudTrail
('aws_cloudtrail', 'logging', 'Provides a CloudTrail resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail'),
('aws_cloudtrail_event_data_store', 'logging', 'Provides a CloudTrail Event Data Store resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudtrail_event_data_store'),

-- CloudWatch
('aws_cloudwatch_metric_alarm', 'monitoring', 'Provides a CloudWatch Metric Alarm resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_metric_alarm'),
('aws_cloudwatch_dashboard', 'monitoring', 'Provides a CloudWatch Dashboard resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_dashboard'),
('aws_cloudwatch_log_group', 'monitoring', 'Provides a CloudWatch Log Group resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group'),
('aws_cloudwatch_log_stream', 'monitoring', 'Provides a CloudWatch Log Stream resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_stream'),
('aws_cloudwatch_log_destination', 'monitoring', 'Provides a CloudWatch Log Destination resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_destination'),
('aws_cloudwatch_log_destination_policy', 'monitoring', 'Provides a CloudWatch Log Destination Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_destination_policy'),
('aws_cloudwatch_log_metric_filter', 'monitoring', 'Provides a CloudWatch Log Metric Filter resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_metric_filter'),
('aws_cloudwatch_log_resource_policy', 'monitoring', 'Provides a CloudWatch Log Resource Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_resource_policy'),
('aws_cloudwatch_log_retention_policy', 'monitoring', 'Provides a CloudWatch Log Group retention policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_retention_policy'),
('aws_cloudwatch_log_subscription_filter', 'monitoring', 'Provides a CloudWatch Log Subscription Filter resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter'),
('aws_cloudwatch_composite_alarm', 'monitoring', 'Provides a CloudWatch Composite Alarm resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_composite_alarm'),
('aws_cloudwatch_metric_stream', 'monitoring', 'Provides a CloudWatch Metric Stream resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_metric_stream'),
('aws_cloudwatch_query_definition', 'monitoring', 'Provides a CloudWatch Logs query definition resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_query_definition'),

-- CloudWatch Application Insights
('aws_applicationinsights_application', 'monitoring', 'Provides a CloudWatch Application Insights application resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/applicationinsights_application'),

-- CloudWatch Evidently
('aws_evidently_project', 'monitoring', 'Provides a CloudWatch Evidently Project resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/evidently_project'),
('aws_evidently_feature', 'monitoring', 'Provides a CloudWatch Evidently Feature resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/evidently_feature'),
('aws_evidently_launch', 'monitoring', 'Provides a CloudWatch Evidently Launch resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/evidently_launch'),
('aws_evidently_metric', 'monitoring', 'Provides a CloudWatch Evidently Metric resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/evidently_metric'),
('aws_evidently_segment', 'monitoring', 'Provides a CloudWatch Evidently Segment resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/evidently_segment'),

-- CloudWatch Internet Monitor
('aws_internetmonitor_monitor', 'monitoring', 'Provides a CloudWatch Internet Monitor resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/internetmonitor_monitor'),

-- CloudWatch Logs
('aws_cloudwatch_log_anomaly_detector', 'monitoring', 'Provides a CloudWatch Log Anomaly Detector resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_anomaly_detector'),
('aws_cloudwatch_log_data_protection_policy', 'monitoring', 'Provides a CloudWatch Log Data Protection Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_data_protection_policy'),

-- CloudWatch Network Monitor
('aws_networkmonitor_monitor', 'monitoring', 'Provides a CloudWatch Network Monitor resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkmonitor_monitor'),
('aws_networkmonitor_probe', 'monitoring', 'Provides a CloudWatch Network Monitor Probe resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/networkmonitor_probe'),

-- CloudWatch Observability Access Manager
('aws_oam_link', 'monitoring', 'Provides a CloudWatch Observability Access Manager Link resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/oam_link'),
('aws_oam_sink', 'monitoring', 'Provides a CloudWatch Observability Access Manager Sink resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/oam_sink'),
('aws_oam_sink_policy', 'monitoring', 'Provides a CloudWatch Observability Access Manager Sink Policy resource', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/oam_sink_policy');
