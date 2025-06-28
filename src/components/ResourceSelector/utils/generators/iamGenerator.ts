export const generateIAMResources = (selectedProviders: string[]): string => {
  let code = '';
  
  if (selectedProviders.includes('azure')) {
    code += `# Azure IAM Resources
resource "azurerm_user_assigned_identity" "example" {
  name                = "\${var.naming_convention}-identity"
  location            = var.default_region
  resource_group_name = azurerm_resource_group.main.name

  tags = var.default_tags
}

resource "azurerm_role_assignment" "example" {
  scope                            = azurerm_resource_group.main.id
  role_definition_name             = "Contributor"
  principal_id                     = azurerm_user_assigned_identity.example.principal_id
  condition                        = null
  condition_version                = null
  delegated_managed_identity_resource_id = null
  description                      = "Role assignment for example identity"
  principal_type                   = "ServicePrincipal"
  skip_service_principal_aad_check = false
}

resource "azurerm_role_definition" "example" {
  name        = "\${var.naming_convention}-custom-role"
  scope       = azurerm_resource_group.main.id
  description = "Custom role definition for example purposes"

  permissions {
    actions          = [
      "Microsoft.Resources/subscriptions/resourceGroups/read",
      "Microsoft.Resources/subscriptions/resourceGroups/write"
    ]
    not_actions      = []
    data_actions     = []
    not_data_actions = []
  }

  assignable_scopes = [
    azurerm_resource_group.main.id
  ]

  role_definition_id = null
}

resource "azurerm_pim_active_role_assignment" "example" {
  scope              = azurerm_resource_group.main.id
  role_definition_id = azurerm_role_definition.example.role_definition_resource_id
  principal_id       = azurerm_user_assigned_identity.example.principal_id
  
  schedule {
    start_date_time = null
    expiration {
      duration_days  = 30
      duration_hours = null
      end_date_time  = null
    }
  }

  ticket {
    number = null
    system = null
  }

  justification = "Example PIM role assignment for custom role"
}

resource "azurerm_pim_eligible_role_assignment" "example" {
  scope              = azurerm_resource_group.main.id
  role_definition_id = "/subscriptions/\${data.azurerm_client_config.current.subscription_id}/providers/Microsoft.Authorization/roleDefinitions/b24988ac-6180-42a0-ab88-20f7382dd24c"
  principal_id       = azurerm_user_assigned_identity.example.principal_id
  
  schedule {
    start_date_time = null
    expiration {
      duration_days  = 365
      duration_hours = null
      end_date_time  = null
    }
  }

  ticket {
    number = null
    system = null
  }

  justification = "Example PIM eligible role assignment for Contributor role"
}

# Azure AD Application
resource "azuread_application" "example" {
  display_name                   = "\${var.naming_convention}-app"
  description                    = "Example Azure AD Application"
  device_only_auth_enabled       = false
  fallback_public_client_enabled = false
  group_membership_claims        = []
  identifier_uris                = []
  logo_image                     = null
  marketing_url                  = null
  notes                          = null
  oauth2_post_response_required  = false
  owners                         = [data.azurerm_client_config.current.object_id]
  prevent_duplicate_names        = false
  privacy_statement_url          = null
  service_management_reference   = null
  sign_in_audience              = "AzureADMyOrg"
  support_url                   = null
  template_id                   = null
  terms_of_service_url          = null

  api {
    known_client_applications      = []
    mapped_claims_enabled          = false
    requested_access_token_version = 2

    oauth2_permission_scope {
      admin_consent_description  = "Allow the application to access example on behalf of the signed-in user."
      admin_consent_display_name = "Access example"
      enabled                    = true
      id                         = "96183846-204b-4b43-82e1-5d2222eb4b9b"
      type                       = "User"
      user_consent_description   = "Allow the application to access example on your behalf."
      user_consent_display_name  = "Access example"
      value                      = "user_impersonation"
    }
  }

  app_role {
    allowed_member_types = ["User", "Application"]
    description          = "Admins can manage roles and perform all task actions"
    display_name         = "Admin"
    enabled              = true
    id                   = "1b19509b-32b1-4e9f-b71d-4992aa991967"
    value                = "admin"
  }

  feature_tags {
    custom_single_sign_on = false
    enterprise            = false
    gallery               = false
    hide                  = false
  }

  optional_claims {
    access_token {
      name                  = "myclaim"
      source                = null
      essential             = false
      additional_properties = []
    }

    id_token {
      name                  = "userclaim"
      source                = null
      essential             = false
      additional_properties = []
    }

    saml2_token {
      name                  = "samlexample"
      source                = null
      essential             = false
      additional_properties = []
    }
  }

  public_client {
    redirect_uris = []
  }

  required_resource_access {
    resource_app_id = "00000003-0000-0000-c000-000000000000"

    resource_access {
      id   = "df021288-bdef-4463-88db-98f22de89214"
      type = "Role"
    }

    resource_access {
      id   = "b4e74841-8e56-480b-be8b-910348b18b4c"
      type = "Scope"
    }
  }

  single_page_application {
    redirect_uris = ["https://example.com/"]
  }

  web {
    homepage_url  = "https://example.com/"
    logout_url    = "https://example.com/logout"
    redirect_uris = ["https://example.com/"]

    implicit_grant {
      access_token_issuance_enabled = true
      id_token_issuance_enabled     = true
    }
  }

  tags = [for k, v in var.default_tags : "\${k}:\${v}"]
}

# Azure AD Service Principal
resource "azuread_service_principal" "example" {
  client_id                    = azuread_application.example.client_id
  account_enabled              = true
  alternative_names            = []
  app_role_assignment_required = false
  description                  = "Service principal for example application"
  login_url                    = null
  notes                        = null
  notification_email_addresses = []
  owners                       = [data.azurerm_client_config.current.object_id]
  preferred_single_sign_on_mode = null
  use_existing                 = false

  feature_tags {
    custom_single_sign_on = false
    enterprise            = false
    gallery               = false
    hide                  = false
  }

  saml_single_sign_on {
    relay_state = null
  }

  tags = [for k, v in var.default_tags : "\${k}:\${v}"]
}

`;
  }
  
  if (selectedProviders.includes('aws')) {
    code += `# AWS IAM Module - User Management
module "iam_user" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-user"
  version = "~> 5.44"

  name                          = "\${var.naming_convention}-user"
  create_iam_user_login_profile = true
  create_iam_access_key         = true
  force_destroy                 = false
  password_length               = 20
  password_reset_required       = true
  pgp_key                       = null
  permissions_boundary          = null
  upload_iam_user_ssh_key       = false
  ssh_key_encoding              = "SSH"
  ssh_public_key                = null

  tags = var.default_tags
}

# AWS IAM Module - Group Management
module "iam_group_with_policies" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-group-with-policies"
  version = "~> 5.44"

  name                              = "\${var.naming_convention}-group"
  attach_iam_self_management_policy = true
  aws_account_id                    = null
  custom_group_policy_arns          = []
  custom_group_policies             = []
  group_users                       = [module.iam_user.iam_user_name]
  iam_self_management_policy_name_prefix = "SelfManagement-"

  tags = var.default_tags
}

# AWS IAM Module - Role Management
module "iam_assumable_role" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role"
  version = "~> 5.44"

  create_role                   = true
  create_instance_profile       = true
  role_name                     = "\${var.naming_convention}-role"
  role_description              = "IAM role with example permissions"
  role_path                     = "/"
  role_permissions_boundary_arn = null
  role_requires_mfa             = false
  role_session_name             = null
  max_session_duration          = 3600
  force_detach_policies         = false

  trusted_role_actions = ["sts:AssumeRole"]
  trusted_role_arns    = []
  trusted_role_services = ["ec2.amazonaws.com"]

  custom_role_policy_arns = [
    "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess",
  ]

  number_of_custom_role_policy_arns = null

  tags = var.default_tags
}

# AWS IAM Module - Policy Management
module "iam_policy" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-policy"
  version = "~> 5.44"

  name        = "\${var.naming_convention}-policy"
  path        = "/"
  description = "Example IAM policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Effect = "Allow"
        Resource = [
          "arn:aws:s3:::example-bucket",
          "arn:aws:s3:::example-bucket/*"
        ]
      },
      {
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Effect = "Allow"
        Resource = [
          "arn:aws:dynamodb:*:*:table/example-table",
          "arn:aws:dynamodb:*:*:table/example-table/index/*"
        ]
      }
    ]
  })

  tags = var.default_tags
}

# AWS IAM Module - Role with Policies
module "iam_assumable_role_with_oidc" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-assumable-role-with-oidc"
  version = "~> 5.44"

  create_role                   = true
  role_name                     = "\${var.naming_convention}-oidc-role"
  role_description              = "IAM role for OIDC"
  role_path                     = "/"
  role_permissions_boundary_arn = null
  max_session_duration          = 3600
  role_policy_arns              = [module.iam_policy.arn]
  number_of_role_policy_arns    = null

  provider_url = "oidc.eks.us-west-2.amazonaws.com/id/EXAMPLE"
  provider_urls = []

  oidc_fully_qualified_subjects = [
    "system:serviceaccount:default:my-service-account"
  ]
  oidc_subjects_with_wildcards = []
  oidc_fully_qualified_audiences = []

  tags = var.default_tags
}

# AWS IAM Module - Service Account Role for EKS
module "iam_role_for_service_accounts_eks" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.44"

  role_name                              = "\${var.naming_convention}-eks-service-account"
  role_description                       = "IRSA role for EKS service account"
  role_path                              = "/"
  role_permissions_boundary_arn          = null
  role_policy_arns                       = {}
  attach_vpc_cni_policy                  = false
  vpc_cni_enable_ipv4                    = false
  vpc_cni_enable_ipv6                    = false
  attach_ebs_csi_policy                  = false
  attach_efs_csi_policy                  = false
  attach_fsx_lustre_csi_policy           = false
  attach_cert_manager_policy             = false
  cert_manager_hosted_zone_arns          = []
  attach_cluster_autoscaler_policy       = false
  cluster_autoscaler_cluster_names       = []
  attach_karpenter_controller_policy     = false
  karpenter_controller_cluster_name      = null
  karpenter_controller_node_iam_role_arns = []
  attach_load_balancer_controller_policy = false
  attach_load_balancer_controller_targetgroup_binding_only_policy = false
  attach_amazon_managed_service_prometheus_policy = false
  attach_external_dns_policy             = false
  external_dns_hosted_zone_arns          = []
  attach_external_secrets_policy         = false
  attach_node_termination_handler_policy = false
  attach_aws_gateway_controller_policy   = false
  attach_velero_policy                   = false
  velero_s3_bucket_arns                  = []
  attach_cloudwatch_observability_policy = false

  oidc_providers = {
    main = {
      provider_arn               = "arn:aws:iam::123456789012:oidc-provider/oidc.eks.us-west-2.amazonaws.com/id/EXAMPLE"
      namespace_service_accounts = ["default:my-app"]
    }
  }

  tags = var.default_tags
}

# AWS IAM Module - Read Only Role
module "iam_read_only_role" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-read-only-role"
  version = "~> 5.44"

  create_role                   = true
  role_name                     = "\${var.naming_convention}-readonly-role"
  role_description              = "IAM read-only role"
  role_path                     = "/"
  role_permissions_boundary_arn = null
  max_session_duration          = 3600
  require_mfa                   = false
  mfa_age                       = 86400
  allow_self_assume_role        = false

  trusted_role_actions = ["sts:AssumeRole"]
  trusted_role_arns    = []
  trusted_role_services = ["ec2.amazonaws.com"]

  tags = var.default_tags
}

# AWS IAM Module - Account Settings
module "iam_account" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-account"
  version = "~> 5.44"

  account_alias                      = "\${var.naming_convention}-account"
  create_account_password_policy     = true
  max_password_age                   = 90
  minimum_password_length            = 14
  password_reuse_prevention          = 24
  require_lowercase_characters       = true
  require_numbers                    = true
  require_symbols                    = true
  require_uppercase_characters       = true
  allow_users_to_change_password     = true
  hard_expiry                        = false
  get_caller_identity                = true
  create_saml_provider               = false
  saml_provider_name                 = null
  saml_metadata_document             = null
}

`;
  }

  return code;
};
