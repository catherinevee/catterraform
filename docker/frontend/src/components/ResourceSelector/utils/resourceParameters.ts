
// Required parameters for specific resource types
export const getRequiredParameters = (resourceType: string): string => {
  const resourceConfigs: { [key: string]: string } = {
    // Azure Virtual Machine
    'azurerm_virtual_machine': `  size                = "Standard_B1s"
  admin_username      = "adminuser"
  disable_password_authentication = false
  admin_password      = "P@ssw0rd123!"

  network_interface_ids = [
    azurerm_network_interface.example.id,
  ]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }`,

    // Azure Storage Account
    'azurerm_storage_account': `  account_tier             = "Standard"
  account_replication_type = "LRS"`,

    // Azure Network Interface
    'azurerm_network_interface': `  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.example.id
    private_ip_address_allocation = "Dynamic"
  }`,

    // Azure Virtual Network
    'azurerm_virtual_network': `  address_space = ["10.0.0.0/16"]`,

    // Azure Subnet
    'azurerm_subnet': `  virtual_network_name = azurerm_virtual_network.example.name
  address_prefixes     = ["10.0.1.0/24"]`,

    // Azure Network Security Group
    'azurerm_network_security_group': `  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }`,

    // Azure Key Vault
    'azurerm_key_vault': `  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  sku_name                    = "standard"`,

    // Azure SQL Database
    'azurerm_mssql_database': `  server_id = azurerm_mssql_server.example.id
  collation = "SQL_Latin1_General_CP1_CI_AS"
  license_type = "LicenseIncluded"
  sku_name = "Basic"`,

    // Azure SQL Server
    'azurerm_mssql_server': `  version                      = "12.0"
  administrator_login          = "sqladmin"
  administrator_login_password = "P@ssw0rd123!"`,

    // AWS EC2 Instance
    'aws_instance': `  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  
  vpc_security_group_ids = [aws_security_group.example.id]
  subnet_id              = aws_subnet.example.id`,

    // AWS VPC
    'aws_vpc': `  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true`,

    // AWS Subnet
    'aws_subnet': `  vpc_id            = aws_vpc.example.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]`,

    // AWS Security Group
    'aws_security_group': `  vpc_id = aws_vpc.example.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }`,

    // AWS S3 Bucket
    'aws_s3_bucket': `  # Note: bucket name must be globally unique
  force_destroy = true`,

    // AWS RDS Instance
    'aws_db_instance': `  allocated_storage      = 20
  storage_type          = "gp2"
  engine                = "mysql"
  engine_version        = "8.0"
  instance_class        = "db.t3.micro"
  username              = "admin"
  password              = "password123"
  parameter_group_name  = "default.mysql8.0"
  skip_final_snapshot   = true`,

    // AWS Lambda Function
    'aws_lambda_function': `  filename         = "lambda_function_payload.zip"
  function_name    = "lambda_function"
  role            = aws_iam_role.lambda_role.arn
  handler         = "index.handler"
  runtime         = "python3.9"`,

    // AWS Load Balancer
    'aws_lb': `  load_balancer_type = "application"
  subnets            = [aws_subnet.example.id, aws_subnet.example2.id]
  security_groups    = [aws_security_group.example.id]`,

    // Azure Application Gateway
    'azurerm_application_gateway': `  sku {
    name     = "Standard_Small"
    tier     = "Standard"
    capacity = 2
  }

  gateway_ip_configuration {
    name      = "appGatewayIpConfig"
    subnet_id = azurerm_subnet.example.id
  }

  frontend_port {
    name = "frontendPort"
    port = 80
  }

  frontend_ip_configuration {
    name                 = "frontendIP"
    public_ip_address_id = azurerm_public_ip.example.id
  }

  backend_address_pool {
    name = "backendPool"
  }

  backend_http_settings {
    name                  = "backendHttpSettings"
    cookie_based_affinity = "Disabled"
    port                  = 80
    protocol              = "Http"
    request_timeout       = 1
  }

  http_listener {
    name                           = "httpListener"
    frontend_ip_configuration_name = "frontendIP"
    frontend_port_name             = "frontendPort"
    protocol                       = "Http"
  }

  request_routing_rule {
    name                       = "routingRule"
    rule_type                  = "Basic"
    http_listener_name         = "httpListener"
    backend_address_pool_name  = "backendPool"
    backend_http_settings_name = "backendHttpSettings"
  }`
  };

  return resourceConfigs[resourceType] || `  # Please configure required parameters
  # Refer to documentation for specific requirements`;
};
