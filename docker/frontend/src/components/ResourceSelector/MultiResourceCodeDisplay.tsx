
import React, { useState } from 'react';
import { Resource } from '@/types/Resource';
import { generateCodeSections, VersionConfig, MultiTenantConfig } from './utils/codeGenerator';
import { TabbedCodeDisplay } from './components/TabbedCodeDisplay';

interface MultiResourceCodeDisplayProps {
  selectedResources: string[];
  resources: Resource[];
  versionConfig?: VersionConfig;
  userDefinedVariables?: string;
}

export const MultiResourceCodeDisplay = ({ 
  selectedResources, 
  resources, 
  versionConfig, 
  userDefinedVariables 
}: MultiResourceCodeDisplayProps) => {
  const [removeOptionalParameters, setRemoveOptionalParameters] = useState(false);
  const [multiTenantConfig, setMultiTenantConfig] = useState<MultiTenantConfig>({
    enabled: false,
    aliasValuePairs: []
  });
  
  const codeSections = generateCodeSections(
    selectedResources, 
    resources, 
    versionConfig, 
    userDefinedVariables,
    multiTenantConfig,
    removeOptionalParameters
  );

  const handleMultiTenantChange = (config: MultiTenantConfig) => {
    setMultiTenantConfig(config);
  };

  const handleRemoveOptionalParametersChange = (enabled: boolean) => {
    setRemoveOptionalParameters(enabled);
  };

  return (
    <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: '#6653e3' }}>
      <div className="px-4 py-3 border-b-2 flex items-center justify-between" style={{ backgroundColor: '#f0efff', borderColor: '#6653e3' }}>
        <h3 className="text-lg font-semibold" style={{ color: '#4a3bc7' }}>
          Generated Terraform Code ({selectedResources.length} resources)
        </h3>
      </div>
      
      <div className="p-4">
        <TabbedCodeDisplay 
          codeSections={codeSections} 
          onMultiTenantChange={handleMultiTenantChange}
          onRemoveOptionalParametersChange={handleRemoveOptionalParametersChange}
        />
      </div>
    </div>
  );
};
