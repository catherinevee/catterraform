
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CodeSections } from '../utils/codeGenerator';
import { CodeSection } from './CodeSection';

interface TabbedCodeDisplayProps {
  codeSections: CodeSections;
  onMultiTenantChange?: (config: MultiTenantConfig) => void;
  onRemoveOptionalParametersChange?: (enabled: boolean) => void;
}

interface AliasValuePair {
  id: string;
  alias: string;
  value: string;
}

interface MultiTenantConfig {
  enabled: boolean;
  aliasValuePairs: AliasValuePair[];
}

export const TabbedCodeDisplay = ({ 
  codeSections, 
  onMultiTenantChange,
  onRemoveOptionalParametersChange 
}: TabbedCodeDisplayProps) => {
  const [isSecretsDialogOpen, setIsSecretsDialogOpen] = useState(false);
  const [isMultiTenantDialogOpen, setIsMultiTenantDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4 gap-2">
        <Dialog open={isSecretsDialogOpen} onOpenChange={setIsSecretsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-2 hover:opacity-90"
              style={{ borderColor: '#6653e3', color: '#6653e3' }}
            >
              Handling Secrets
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Handling Secrets</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p>Secrets should be defined as environment secrets within the user's platform.</p>
              <p>An alternative to using Secrets is to not use them at all and use a method like OIDC for authorization and authentication calls.</p>
              <p>Many methods for handling sensitive token and authentication data exist.</p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isMultiTenantDialogOpen} onOpenChange={setIsMultiTenantDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-2 hover:opacity-90"
              style={{ borderColor: '#6653e3', color: '#6653e3' }}
            >
              Multi-subscription/Multi-tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Multi-subscription/Multi-tenant</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">
              <div>
                <p className="mb-2"><strong>Note:</strong></p>
                <p>Items like Subscription IDs, Access Keys, and Secret Keys, should be defined as an environment secret or a runtime variable within a CI/CD pipeline.</p>
              </div>
              
              <div>
                <p className="mb-2">Terraform (HCL) is able to handle cloud resources belonging to different subscriptions by using the <code className="bg-gray-100 px-1 rounded">alias</code> syntax within a provider block:</p>
              </div>

              <div>
                <p className="font-semibold mb-2">For Azure:</p>
                <pre className="bg-gray-100 p-3 rounded border text-sm overflow-x-auto">
                  <code>{`provider "azurerm" {
  alias = "it-finance-admin-sub"
  features {}  
}`}</code>
                </pre>
              </div>

              <div>
                <p className="font-semibold mb-2">For AWS:</p>
                <pre className="bg-gray-100 p-3 rounded border text-sm overflow-x-auto">
                  <code>{`provider "aws" {
  alias = "it-finance-admin-sub"
  access_key = var.access_key
  secret_key = var.secret_key
}`}</code>
                </pre>
              </div>

              <div>
                <p>With access_key and secret_key being variables whose values are defined in a .tfvars file (using values of secret variables defined in the CI/CD pipeline) and executed during run-time.</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="full" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="full">Full</TabsTrigger>
          <TabsTrigger value="variables">Variables</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="outputs">Outputs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="full" className="mt-4">
          <CodeSection code={codeSections.full} filename="terraform-multi-resource.tf" />
        </TabsContent>
        
        <TabsContent value="variables" className="mt-4">
          <CodeSection code={codeSections.variables} filename="variables.tf" />
        </TabsContent>
        
        <TabsContent value="resources" className="mt-4">
          <CodeSection code={codeSections.resources} filename="resources.tf" />
        </TabsContent>
        
        <TabsContent value="outputs" className="mt-4">
          <CodeSection code={codeSections.outputs} filename="outputs.tf" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
