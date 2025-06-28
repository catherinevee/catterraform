
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ExampleDialog = () => {
  const [isExampleDialogOpen, setIsExampleDialogOpen] = useState(false);

  return (
    <div className="mt-4">
      <Dialog open={isExampleDialogOpen} onOpenChange={setIsExampleDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-2 hover:opacity-90"
            style={{ borderColor: '#6653e3', color: '#6653e3' }}
          >
            AWS+Azure Terraform Example
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AWS+Azure Terraform Example</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>This template supports:</strong><br/>
                • Provider Version Pinning<br/>
                • Multi-account/multi-subscription support<br/>
                • Remote State Backend in Azure<br/>
                • HCL validation blocks for tagging
              </p>
            </div>
            
            <Tabs defaultValue="main" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="main">main.tf</TabsTrigger>
                <TabsTrigger value="backend">backend.tf</TabsTrigger>
                <TabsTrigger value="versions">versions.tf</TabsTrigger>
                <TabsTrigger value="variables">variables.tf</TabsTrigger>
                <TabsTrigger value="networking">networks.tf</TabsTrigger>
                <TabsTrigger value="outputs">outputs.tf</TabsTrigger>
              </TabsList>
              
              <TabsContent value="main" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
} 


provider "aws" {
  alias = "infotech-prod"
  access_key = var.access_key
  secret_key = var.secret_key
} 
provider "aws" {
  alias = "infotech-dev"
  access_key = var.access_key
  secret_key = var.secret_key
}
provider "aws" {
  alias = "infotech-test"
  access_key = var.access_key
  secret_key = var.secret_key
}
provider "azurerm" {
  alias = "infotech-test"
  features {}  
}
provider "azurerm" {
  alias = "infotech-dev"
  features {}  
}
provider "azurerm" {
  alias = "infotech-prod"
  features {}  
}`}</pre>
                </div>
              </TabsContent>
              
              <TabsContent value="backend" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`terraform {
  backend "azurerm" {
      resource_group_name  = "polandcentralrg-1"
      storage_account_name = "tfstatecfriy"
      container_name       = "tfstate-container"
      use_oidc = true
      use_azuread_auth = true
      client_id = "catherinevee_manid" 
      tenant_id = var.AZURE_TENANT_ID
      subscription_id = var.ARM_SUBSCRIPTION_ID

  }
}

resource "azurerm_resource_group" "polandcentralrg-1" {
  name = "polandcentralrg-1"
  location = "polandcentral"
}`}</pre>
                </div>
              </TabsContent>
              
              <TabsContent value="versions" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "4.30.0"
    }
    aws = {
      source = "hashicorp/aws"
      version = "5.97.0"
   }
    google = {
      source = "hashicorp/google"
      version = "6.13.0"
    }
    helm = {
      source = "hashicorp/helm"
      version = "2.9.0"
    } 
    spotinst = {
      source = "spotinst/spotinst"
      version = "1.220.0"
    }    
  }
}`}</pre>
                </div>
              </TabsContent>
              
              <TabsContent value="variables" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`variable "tfstateregion" {
  type = string
  default = "polandcentral"
}

variable "tfstatesa" {
  type = string 
  default = "tfstatecfriy"
}

variable "tfstatecontainer" {
  type = string 
  default = "tfstate-container"  
}

variable "tfstaterg" {
  type = string 
  default = "polandcentral-1"  
}

variable "access_key" {}
variable "secret_key" {}
variable "region" {}
variable "spotinst_token"{}
variable "spotinst_account" {}

variable "defaultaz" {
    type = list(string)
    default = [
      "use1-az1",
      "use1-az2",
      "use1-az3"
    ]
}

variable "defaultvpc" {
    type = string
    default = "10.40.0.0/16"
}

variable "default_privatesubnets" {
    type = list(string)
    default = [
      "10.40.1.0/24",
      "10.40.2.0/24",
      "10.40.3.0/24",
    ]
}

variable "default_publicsubnets" {
    type = list(string)
    default = [
      "10.40.10.0/24",
      "10.40.20.0/24",
      "10.40.30.0/24",
    ]
}`}</pre>
                </div>
              </TabsContent>

              <TabsContent value="networking" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`resource "azurerm_virtual_network" "mexicocentralvnet" {
  name                = "vnet_\${var.defaultlocation}"
  location            = var.defaultlocation
  resource_group_name = var.defaultrg
  address_space       = ["10.30.0.0/16"]
  dns_servers         = ["10.30.0.4", "10.30.0.5"]

  tags = var.default_tags
}

resource "azurerm_subnet" "mexicocentralsubnet_prod" {
  name                 = "subnet-prod_\${var.defaultlocation}"
  resource_group_name  = azurerm_virtual_network.mexicocentralvnet.resource_group_name
  virtual_network_name = azurerm_virtual_network.mexicocentralvnet.name
  address_prefixes     = ["10.30.1.0/24"]
  }

resource "azurerm_subnet" "mexicocentralsubnet_dev" {
  name                 = "subnet-dev_\${var.defaultlocation}"
  resource_group_name  = azurerm_virtual_network.mexicocentralvnet.resource_group_name
  virtual_network_name = azurerm_virtual_network.mexicocentralvnet.name
  address_prefixes     = ["10.30.2.0/24"]
  }
resource "azurerm_subnet" "mexicocentralsubnet_test" {
  name                 = "subnet-test_\${var.defaultlocation}"
  resource_group_name  = azurerm_virtual_network.mexicocentralvnet.resource_group_name
  virtual_network_name = azurerm_virtual_network.mexicocentralvnet.name
  address_prefixes     = ["10.30.3.0/24"]
  }
resource "azurerm_subnet" "expressroute1_subnet" {
  name                 = "GatewaySubnet"
  resource_group_name  = var.mexicocentralresourcegroups[0]
  virtual_network_name = azurerm_virtual_network.mexicocentralvnet.name
  address_prefixes     = ["10.30.254.0/24"]
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "vpc-\${var.defaultenv}"
  cidr = var.defaultvpc

  azs              = var.defaultaz
  private_subnets  = var.default_privatesubnets
  public_subnets   = var.default_publicsubnets

  enable_nat_gateway = true

  enable_ipv6                                   = true
  public_subnet_assign_ipv6_address_on_creation = true

  public_subnet_ipv6_prefixes   = [0, 1, 2]
  private_subnet_ipv6_prefixes  = [3, 4, 5]

  tags = var.default_tags
}`}</pre>
                </div>
              </TabsContent>

              <TabsContent value="outputs" className="mt-4">
                <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`output "output_defaultvpc_id" {
  value = module.vpc.default_vpc_id
}

output "output_subnet_ids" {
    value = module.vpc.private_subnets.*
}`}</pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
