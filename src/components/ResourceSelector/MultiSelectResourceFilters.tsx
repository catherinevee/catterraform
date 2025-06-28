import React from 'react';
import { Resource } from '@/types/Resource';
import { RegionSelector } from './components/RegionSelector';
import { VersionInputs } from './components/VersionInputs';
import { StandardInfrastructureInterface } from './components/StandardInfrastructureInterface';
import { ResourceNamingConvention } from './components/ResourceNamingConvention';

interface TagPair {
  key: string;
  value: string;
}

interface MultiSelectResourceFiltersProps {
  resources: Resource[];
  categories: string[];
  selectedCategory: string;
  selectedResources: string[];
  terraformVersion: string;
  awsProviderVersion: string;
  azureProviderVersion: string;
  userDefinedVariables: string;
  onCategoryChange: (category: string) => void;
  onResourceToggle: (resourceType: string) => void;
  onGenerateCode: () => void;
  onTerraformVersionChange: (version: string) => void;
  onAwsProviderVersionChange: (version: string) => void;
  onAzureProviderVersionChange: (version: string) => void;
  onUserDefinedVariablesChange: (variables: string) => void;
}

export const MultiSelectResourceFilters = ({
  resources,
  categories,
  selectedCategory,
  selectedResources,
  terraformVersion,
  awsProviderVersion,
  azureProviderVersion,
  userDefinedVariables,
  onCategoryChange,
  onResourceToggle,
  onGenerateCode,
  onTerraformVersionChange,
  onAwsProviderVersionChange,
  onAzureProviderVersionChange,
  onUserDefinedVariablesChange
}: MultiSelectResourceFiltersProps) => {
  const [selectedRegion, setSelectedRegion] = React.useState<string>('polandcentral');
  const [customRegion, setCustomRegion] = React.useState<string>('');
  const [useCustomRegion, setUseCustomRegion] = React.useState<boolean>(false);
  const [selectedStandardCategories, setSelectedStandardCategories] = React.useState<string[]>(['Compute']);
  const [namingConfig, setNamingConfig] = React.useState({
    organization: '',
    projectName: '',
    environment: '',
    namingConvention: '',
    customPattern: ''
  });
  const [tags, setTags] = React.useState<TagPair[]>([
    { key: 'environment', value: 'production' },
    { key: 'project', value: 'terraform-generator' },
    { key: 'managed_by', value: 'terraform' },
    { key: 'owner', value: 'devops-team' },
    { key: 'cost_center', value: 'engineering' },
    { key: 'application', value: 'web-app' }
  ]);

  const generateTagsHCL = (tags: TagPair[]) => {
    const validTags = tags.filter(tag => tag.key.trim() && tag.value.trim());
    if (validTags.length === 0) return '';
    
    const tagsMap = validTags.map(tag => `    ${tag.key} = "${tag.value}"`).join('\n');
    return `variable "default_tags" {\n  type = map(string)\n  default = {\n${tagsMap}\n  }\n}`;
  };

  const generateNamingConfigHCL = (config: typeof namingConfig) => {
    let variables = '';
    
    if (config.organization) {
      variables += `variable "organization" {\n  type    = string\n  default = "${config.organization}"\n}\n\n`;
    }
    
    if (config.projectName) {
      variables += `variable "project_name" {\n  type    = string\n  default = "${config.projectName}"\n}\n\n`;
    }
    
    if (config.environment) {
      variables += `variable "environment" {\n  type    = string\n  default = "${config.environment}"\n}\n\n`;
    }
    
    if (config.namingConvention) {
      variables += `variable "naming_convention" {\n  type    = string\n  default = "${config.namingConvention}"\n}\n\n`;
    }
    
    if (config.customPattern) {
      variables += `variable "custom_naming_pattern" {\n  type    = string\n  default = "${config.customPattern}"\n}\n\n`;
    }
    
    return variables.trim();
  };

  const handleRegionChange = (value: string) => {
    if (value === 'custom') {
      setUseCustomRegion(true);
      const regionValue = customRegion || 'polandcentral';
      updateVariables(regionValue, tags, namingConfig);
    } else {
      setUseCustomRegion(false);
      setSelectedRegion(value);
      updateVariables(value, tags, namingConfig);
    }
  };

  const handleCustomRegionChange = (value: string) => {
    setCustomRegion(value);
    updateVariables(value, tags, namingConfig);
  };

  const handleTagsChange = (newTags: TagPair[]) => {
    setTags(newTags);
    const currentRegion = useCustomRegion ? customRegion : selectedRegion;
    updateVariables(currentRegion, newTags, namingConfig);
  };

  const handleNamingConfigChange = (config: typeof namingConfig) => {
    setNamingConfig(config);
    const currentRegion = useCustomRegion ? customRegion : selectedRegion;
    updateVariables(currentRegion, tags, config);
  };

  const handleStandardCategoryToggle = (category: string) => {
    setSelectedStandardCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const updateVariables = (region: string, currentTags: TagPair[], currentNamingConfig: typeof namingConfig) => {
    const regionVariable = `variable "default_region" {\n  type    = string\n  default = "${region}"\n}`;
    const tagsVariable = generateTagsHCL(currentTags);
    const namingVariable = generateNamingConfigHCL(currentNamingConfig);
    
    const allVariables = [regionVariable, namingVariable, tagsVariable].filter(Boolean).join('\n\n');
    onUserDefinedVariablesChange(allVariables);
  };

  React.useEffect(() => {
    if (!userDefinedVariables) {
      updateVariables(selectedRegion, tags, namingConfig);
    }
  }, []);

  return (
    <div className="space-y-6">
      <RegionSelector
        selectedRegion={selectedRegion}
        customRegion={customRegion}
        useCustomRegion={useCustomRegion}
        tags={tags}
        onRegionChange={handleRegionChange}
        onCustomRegionChange={handleCustomRegionChange}
        onTagsChange={handleTagsChange}
      />

      <ResourceNamingConvention
        onConfigChange={handleNamingConfigChange}
      />

      <VersionInputs
        terraformVersion={terraformVersion}
        awsProviderVersion={awsProviderVersion}
        azureProviderVersion={azureProviderVersion}
        onTerraformVersionChange={onTerraformVersionChange}
        onAwsProviderVersionChange={onAwsProviderVersionChange}
        onAzureProviderVersionChange={onAzureProviderVersionChange}
      />

      <StandardInfrastructureInterface
        selectedStandardCategories={selectedStandardCategories}
        onCategoryToggle={handleStandardCategoryToggle}
        onGenerateCode={onGenerateCode}
        userDefinedVariables={userDefinedVariables}
      />
    </div>
  );
};
