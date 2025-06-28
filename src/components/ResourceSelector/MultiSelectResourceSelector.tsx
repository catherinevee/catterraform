
import React, { useState } from 'react';
import { MultiSelectResourceFilters } from './MultiSelectResourceFilters';
import { MultiResourceCodeDisplay } from './MultiResourceCodeDisplay';
import { Resource, MultiSelectResourceSelectorProps } from '@/types/Resource';

export const MultiSelectResourceSelector = ({ resources, categories, loading }: MultiSelectResourceSelectorProps) => {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showGeneratedCode, setShowGeneratedCode] = useState(false);
  const [terraformVersion, setTerraformVersion] = useState<string>('');
  const [awsProviderVersion, setAwsProviderVersion] = useState<string>('');
  const [azureProviderVersion, setAzureProviderVersion] = useState<string>('');
  const [userDefinedVariables, setUserDefinedVariables] = useState<string>('');

  const handleResourceToggle = (resourceType: string) => {
    setSelectedResources(prev => {
      if (prev.includes(resourceType)) {
        return prev.filter(r => r !== resourceType);
      } else {
        return [...prev, resourceType];
      }
    });
  };

  const handleGenerateCode = () => {
    setShowGeneratedCode(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div style={{ color: '#5a4fd1' }}>Loading resources...</div>
      </div>
    );
  }

  const versionConfig = {
    terraformVersion: terraformVersion || '1.12',
    awsProviderVersion: awsProviderVersion || '6.0.0',
    azureProviderVersion: azureProviderVersion || '4.34'
  };

  return (
    <div className="space-y-6">
      <MultiSelectResourceFilters
        resources={resources}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedResources={selectedResources}
        terraformVersion={terraformVersion}
        awsProviderVersion={awsProviderVersion}
        azureProviderVersion={azureProviderVersion}
        userDefinedVariables={userDefinedVariables}
        onCategoryChange={setSelectedCategory}
        onResourceToggle={handleResourceToggle}
        onGenerateCode={handleGenerateCode}
        onTerraformVersionChange={setTerraformVersion}
        onAwsProviderVersionChange={setAwsProviderVersion}
        onAzureProviderVersionChange={setAzureProviderVersion}
        onUserDefinedVariablesChange={setUserDefinedVariables}
      />

      {showGeneratedCode && selectedResources.length > 0 && (
        <MultiResourceCodeDisplay
          selectedResources={selectedResources}
          resources={resources}
          versionConfig={versionConfig}
          userDefinedVariables={userDefinedVariables}
        />
      )}
    </div>
  );
};
