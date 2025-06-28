
import BaseGenerator from './BaseGenerator';

export default class DatabaseGenerator extends BaseGenerator {
  generateDatabase(config: any): string {
    if (config?.useTfModule && this.cloudProvider === 'aws') {
      return this.generateAwsRdsModule(config);
    }

    switch (this.cloudProvider) {
      case 'aws':
        return this.generateAwsRds(config);
      case 'azure':
        return this.generateAzureDatabase(config);
      case 'gcp':
        return this.generateGcpDatabase(config);
      default:
        return '';
    }
  }

  private generateAwsRdsModule(config: any): string {
    return `# RDS using Terraform AWS RDS Module
module "db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "\${var.project_name}-db"

  engine            = "mysql"
  engine_version    = "8.0"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_encrypted = true

  db_name  = "appdb"
  username = "admin"
  password = "changeme123!" # Use AWS Secrets Manager in production

  vpc_security_group_ids = [aws_security_group.rds.id]
  subnet_ids             = [aws_subnet.main_vpc_private.id, aws_subnet.main_vpc_public.id]

  backup_retention_period = var.db_backup_retention_period
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  deletion_protection = false
  skip_final_snapshot = true

  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-db"
    Type = "database"
  })
}

resource "aws_security_group" "rds" {
  name        = "\${var.project_name}-rds-sg"
  description = "Security group for RDS instance"
  vpc_id      = aws_vpc.main_vpc.id
  
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main_vpc.cidr_block]
  }
  
  tags = var.required_tags
}

`;
  }

  private generateAwsRds(config: any): string {
    return `# RDS Instance with Enforced Tagging
resource "aws_db_instance" "main" {
  identifier             = "\${var.project_name}-db"
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  max_allocated_storage  = 100
  
  db_name  = "appdb"
  username = "admin"
  password = "changeme123!" # Use AWS Secrets Manager in production
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = var.db_backup_retention_period
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = true
  deletion_protection = false
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-db"
    Type = "database"
  })
  
  lifecycle {
    precondition {
      condition     = contains(keys(self.tags), "Project") && contains(keys(self.tags), "Environment")
      error_message = "All RDS instances must have Project and Environment tags."
    }
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "\${var.project_name}-db-subnet-group"
  subnet_ids = [aws_subnet.main_vpc_private.id, aws_subnet.main_vpc_public.id]
  
  tags = var.required_tags
}

resource "aws_security_group" "rds" {
  name        = "\${var.project_name}-rds-sg"
  description = "Security group for RDS instance"
  vpc_id      = aws_vpc.main_vpc.id
  
  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main_vpc.cidr_block]
  }
  
  tags = var.required_tags
}

`;
  }

  private generateAzureDatabase(config: any): string {
    return `# MySQL Server with Enforced Tagging
resource "azurerm_mysql_server" "main" {
  name                = "\${var.project_name}-mysql"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  
  administrator_login          = "mysqladmin"
  administrator_login_password = "Ch@ngeMe123!"
  
  sku_name   = "B_Gen5_1"
  storage_mb = 5120
  version    = "8.0"
  
  auto_grow_enabled                 = true
  backup_retention_days             = var.db_backup_retention_period
  geo_redundant_backup_enabled      = false
  infrastructure_encryption_enabled = false
  public_network_access_enabled     = false
  ssl_enforcement_enabled           = true
  ssl_minimal_tls_version_enforced  = "TLS1_2"
  
  tags = merge(var.required_tags, {
    Name = "\${var.project_name}-mysql"
    Type = "database"
  })
  
  lifecycle {
    precondition {
      condition     = contains(keys(self.tags), "Project") && contains(keys(self.tags), "Environment")
      error_message = "All MySQL servers must have Project and Environment tags."
    }
  }
}

resource "azurerm_mysql_database" "main" {
  name                = "appdb"
  resource_group_name = azurerm_resource_group.main.name
  server_name         = azurerm_mysql_server.main.name
  charset             = "utf8"
  collation           = "utf8_unicode_ci"
}

`;
  }

  private generateGcpDatabase(config: any): string {
    return `# Cloud SQL Instance with Enforced Labeling
resource "google_sql_database_instance" "main" {
  name             = "\${var.project_name}-db"
  database_version = "MYSQL_8_0"
  region           = var.gcp_region
  
  settings {
    tier = "db-f1-micro"
    
    backup_configuration {
      enabled = true
      start_time = "03:00"
      backup_retention_settings {
        retained_backups = var.db_backup_retention_period
      }
    }
    
    maintenance_window {
      day  = 7
      hour = 4
    }
    
    database_flags {
      name  = "slow_query_log"
      value = "off"
    }
    
    user_labels = merge(var.required_tags, {
      name = replace("\${var.project_name}-db", "-", "_")
      type = "database"
    })
  }
  
  deletion_protection = false
  
  lifecycle {
    precondition {
      condition     = var.project_name != "" && var.environment != ""
      error_message = "All Cloud SQL instances must have project_name and environment defined."
    }
  }
}

resource "google_sql_database" "main" {
  name     = "appdb"
  instance = google_sql_database_instance.main.name
}

resource "google_sql_user" "main" {
  name     = "admin"
  instance = google_sql_database_instance.main.name
  password = "changeme123!"
}

`;
  }
}
