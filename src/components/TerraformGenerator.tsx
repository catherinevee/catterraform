import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import TerraformCodeGenerator from "@/utils/TerraformCodeGenerator";
import ValidationUtils from "@/utils/terraform/ValidationUtils";
import TerraformHeader from "./terraform/TerraformHeader";
import ResourceConfigPanel from "./terraform/ResourceConfigPanel";
import CodeDisplayPanel from "./terraform/CodeDisplayPanel";

interface TerraformGeneratorProps {
  projectName: string;
  cloudProvider: string;
  selectedResources: string[];
  onBack: () => void;
}

interface GeneratedCodeSections {
  terraform: string;
  provider: string;
  variables: string;
  data: string;
  resources: string;
  outputs: string;
  validation: string;
}

const TerraformGenerator: React.FC<TerraformGeneratorProps> = ({
  projectName,
  cloudProvider,
  selectedResources,
  onBack
}) => {
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [codeSections, setCodeSections] = useState<GeneratedCodeSections>({
    terraform: '',
    provider: '',
    variables: '',
    data: '',
    resources: '',
    outputs: '',
    validation: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [validationResults, setValidationResults] = useState<any>(null);
  const [resourceConfigs, setResourceConfigs] = useState<any>({});

  const handleResourceConfigChange = (resourceType: string, field: string, value: any) => {
    setResourceConfigs(prev => ({
      ...prev,
      [resourceType]: {
        ...prev[resourceType],
        [field]: value
      }
    }));
  };

  const generateTerraformCode = async () => {
    setIsGenerating(true);
    
    try {
      const generator = new TerraformCodeGenerator(cloudProvider);
      const { fullCode, sections } = await generator.generateCodeWithSections(projectName, selectedResources, resourceConfigs);
      
      setGeneratedCode(fullCode);
      setCodeSections(sections);

      // First do basic validation
      const basicValidation = generator.validateHCL(fullCode);
      
      // Then do enhanced database validation for both Azure and AWS resources
      if (cloudProvider === 'azure' || cloudProvider === 'aws') {
        console.log(`Running database validation for ${cloudProvider} resources...`);
        try {
          const dbValidation = await generator.validateHCLWithDatabase(fullCode);
          setValidationResults({
            ...basicValidation,
            ...dbValidation,
            warnings: [...(basicValidation.warnings || []), ...(dbValidation.warnings || [])],
            errors: [...(basicValidation.errors || []), ...(dbValidation.errors || [])],
            info: dbValidation.info || [],
            suggestions: dbValidation.suggestions || []
          });
        } catch (error) {
          console.error('Database validation failed, using basic validation:', error);
          setValidationResults(basicValidation);
        }
      } else {
        setValidationResults(basicValidation);
      }

    } catch (error) {
      console.error('Generation error:', error);
      
      toast({
        title: "Generation Failed",
        description: "An error occurred while generating the Terraform code.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadHCLFiles = () => {
    if (!generatedCode) return;

    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}-terraform.tf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "File Downloaded",
      description: "Terraform configuration file has been downloaded successfully."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TerraformHeader
        projectName={projectName}
        cloudProvider={cloudProvider}
        selectedResources={selectedResources}
        onBack={onBack}
        onDownloadFiles={downloadHCLFiles}
        hasGeneratedCode={!!generatedCode}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ResourceConfigPanel
            selectedResources={selectedResources}
            cloudProvider={cloudProvider}
            resourceConfigs={resourceConfigs}
            onResourceConfigChange={handleResourceConfigChange}
            onGenerateCode={generateTerraformCode}
          />

          <CodeDisplayPanel
            generatedCode={generatedCode}
            codeSections={codeSections}
            validationResults={validationResults}
            selectedResources={selectedResources}
            resourceConfigs={resourceConfigs}
          />
        </div>
      </div>
    </div>
  );
};

export default TerraformGenerator;
