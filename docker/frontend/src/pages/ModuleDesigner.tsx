import React, { useState } from 'react';
import { useResourceData } from '@/hooks/useResourceData';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryFilter } from '@/components/ResourceSelector/components/CategoryFilter';
import { ResourceList } from '@/components/ResourceSelector/components/ResourceList';
import { MultiResourceCodeDisplay } from '@/components/ResourceSelector/MultiResourceCodeDisplay';

const ModuleDesigner = () => {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showGeneratedCode, setShowGeneratedCode] = useState(false);
  const [terraformVersion, setTerraformVersion] = useState<string>('');
  const [awsProviderVersion, setAwsProviderVersion] = useState<string>('');
  const [azureProviderVersion, setAzureProviderVersion] = useState<string>('');
  const [userDefinedVariables, setUserDefinedVariables] = useState<string>('');

  const {
    resources,
    categories,
    loading,
    error
  } = useResourceData();

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" style={{ color: '#6653e3' }} />
          <p style={{ color: '#5a4fd1' }}>Loading resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="text-center space-y-4">
          <p className="text-red-600">Error loading resources: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white rounded hover:opacity-90"
            style={{ backgroundColor: '#6653e3' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const versionConfig = {
    terraformVersion: terraformVersion || '1.12',
    awsProviderVersion: awsProviderVersion || '6.0.0',
    azureProviderVersion: azureProviderVersion || '4.34'
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7ff' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#4a3bc7' }}>
            Module Designer
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-6" style={{ color: '#5a4fd1' }}>
            Select and configure resources to build your custom Terraform modules
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            categories={categories}
            onCategoryChange={setSelectedCategory}
          />

          <ResourceList
            resources={resources.filter(resource => 
              selectedCategory === 'all' || resource.category === selectedCategory
            )}
            selectedResources={selectedResources}
            onResourceToggle={handleResourceToggle}
          />

          {selectedResources.length > 0 && (
            <Button
              onClick={handleGenerateCode}
              className="w-full"
              style={{ backgroundColor: '#6653e3', color: 'white' }}
            >
              Generate Terraform Code for {selectedResources.length} Resource{selectedResources.length !== 1 ? 's' : ''}
            </Button>
          )}

          {showGeneratedCode && selectedResources.length > 0 && (
            <MultiResourceCodeDisplay
              selectedResources={selectedResources}
              resources={resources}
              versionConfig={versionConfig}
              userDefinedVariables={userDefinedVariables}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleDesigner;
