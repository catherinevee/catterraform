
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GeneratedCodeSections {
  terraform: string;
  provider: string;
  variables: string;
  data: string;
  resources: string;
  outputs: string;
  validation: string;
  lambda?: string;
  module?: string;
}

interface CodeDisplayPanelProps {
  generatedCode: string;
  codeSections: GeneratedCodeSections;
  validationResults: any;
  selectedResources?: string[];
  resourceConfigs?: any;
}

const CodeWithLineNumbers: React.FC<{ code: string }> = ({ code }) => {
  const lines = code.split('\n');
  
  return (
    <div className="flex border border-gray-200 rounded-md text-sm overflow-x-auto" style={{ backgroundColor: '#c6c0ea' }}>
      {/* Line numbers */}
      <div className="bg-gray-100 px-3 py-4 text-gray-500 select-none border-r border-gray-200 min-w-[3rem] text-right">
        {lines.map((_, index) => (
          <div key={index} className="leading-6">
            {index + 1}
          </div>
        ))}
      </div>
      {/* Code content */}
      <pre className="flex-1 p-4 overflow-x-auto" style={{ color: '#161137' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const CodeDisplayPanel: React.FC<CodeDisplayPanelProps> = ({
  generatedCode,
  codeSections,
  validationResults,
  selectedResources = [],
  resourceConfigs = {}
}) => {
  // Check if only remote-state is selected
  const isOnlyRemoteState = selectedResources.length === 1 && selectedResources[0] === 'remote-state';
  
  // Check if Lambda functions are enabled
  const hasLambdaFunctions = selectedResources.includes('compute') && 
    resourceConfigs?.compute?.enableLambdaFunctions && 
    resourceConfigs?.compute?.lambdaHclCode;

  // Check if any module checkboxes are enabled
  const hasModules = (
    (resourceConfigs?.networking?.useTfModule) ||
    (resourceConfigs?.networking?.transitGateway && resourceConfigs?.networking?.useTransitGatewayModule) ||
    (resourceConfigs?.['cost-alerts']?.usePricingModule) ||
    (resourceConfigs?.compute?.useEc2TfModule) ||
    (resourceConfigs?.compute?.useAzureTfModule)
  );

  // Calculate grid columns based on available tabs
  let gridCols = 6; // base: full, terraform, provider, variables, resources, outputs
  if (hasLambdaFunctions) gridCols++;
  if (hasModules) gridCols++;

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold" style={{ color: '#5f4ecc' }}>Generated Terraform Code</h2>
          {validationResults && (
            <div className="mt-2">
              {validationResults.isValid ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Valid HCL Syntax
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Validation Issues Found
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="p-6">
          {generatedCode ? (
            <div>
              {isOnlyRemoteState ? (
                // Show only the code without tabs for remote-state only
                <CodeWithLineNumbers code={generatedCode} />
              ) : (
                <Tabs defaultValue="full" className="w-full">
                  <TabsList className={`grid w-full grid-cols-${gridCols}`}>
                    <TabsTrigger value="full">Full</TabsTrigger>
                    <TabsTrigger value="terraform">Terraform</TabsTrigger>
                    <TabsTrigger value="provider">Provider</TabsTrigger>
                    <TabsTrigger value="variables">Variables</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="outputs">Outputs</TabsTrigger>
                    {hasLambdaFunctions && (
                      <TabsTrigger value="lambda">Lambda</TabsTrigger>
                    )}
                    {hasModules && (
                      <TabsTrigger value="module">Module</TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="full" className="mt-4">
                    <CodeWithLineNumbers code={generatedCode} />
                  </TabsContent>
                  
                  <TabsContent value="terraform" className="mt-4">
                    <CodeWithLineNumbers code={codeSections.terraform} />
                  </TabsContent>
                  
                  <TabsContent value="provider" className="mt-4">
                    <CodeWithLineNumbers code={codeSections.provider} />
                  </TabsContent>
                  
                  <TabsContent value="variables" className="mt-4">
                    <CodeWithLineNumbers code={codeSections.variables} />
                  </TabsContent>
                  
                  <TabsContent value="resources" className="mt-4">
                    <CodeWithLineNumbers code={codeSections.resources} />
                  </TabsContent>
                  
                  <TabsContent value="outputs" className="mt-4">
                    <CodeWithLineNumbers code={codeSections.outputs} />
                  </TabsContent>
                  
                  {hasLambdaFunctions && (
                    <TabsContent value="lambda" className="mt-4">
                      <CodeWithLineNumbers code={codeSections.lambda || resourceConfigs.compute.lambdaHclCode} />
                    </TabsContent>
                  )}
                  
                  {hasModules && (
                    <TabsContent value="module" className="mt-4">
                      <CodeWithLineNumbers code={codeSections.module || getModuleCode(resourceConfigs)} />
                    </TabsContent>
                  )}
                </Tabs>
              )}
              
              {validationResults && !validationResults.isValid && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <h4 className="text-sm font-medium text-red-800 mb-2">Validation Issues:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {validationResults.errors?.map((error: string, index: number) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>Click "Generate Code" to create your Terraform configuration</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get module code from resource configs
const getModuleCode = (resourceConfigs: any): string => {
  let moduleCode = '';
  
  // Add Azure compute module code if enabled
  if (resourceConfigs?.compute?.useAzureTfModule && resourceConfigs?.compute?.azureModuleCode) {
    moduleCode += resourceConfigs.compute.azureModuleCode + '\n\n';
  }
  
  // Add EC2 module code if enabled
  if (resourceConfigs?.compute?.useEc2TfModule && resourceConfigs?.compute?.ec2ModuleCode) {
    moduleCode += resourceConfigs.compute.ec2ModuleCode + '\n\n';
  }
  
  // Add other existing module codes
  if (resourceConfigs?.networking?.useTfModule || 
      (resourceConfigs?.networking?.transitGateway && resourceConfigs?.networking?.useTransitGatewayModule)) {
    // This would be handled by the existing module code logic
  }
  
  if (resourceConfigs?.['cost-alerts']?.usePricingModule) {
    // This would be handled by the existing module code logic
  }
  
  return moduleCode.trim();
};

export default CodeDisplayPanel;
