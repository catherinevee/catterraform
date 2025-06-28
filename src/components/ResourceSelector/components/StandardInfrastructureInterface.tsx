
import React from 'react';
import { ProviderSelector } from './ProviderSelector';
import { InfrastructureCategorySelector } from './InfrastructureCategorySelector';
import { ComputeCategorySelector } from './ComputeCategorySelector';
import { GeneratedCodeDisplay } from './GeneratedCodeDisplay';
import { MultiTenantConfigComponent } from './MultiTenantConfig';
import { generateEnhancedCode } from '../utils/tagValidation';
import { useCodeGenerator } from '../hooks/useCodeGenerator';
import { useCodeSections } from '../hooks/useCodeSections';
import { useStandardInfrastructureState } from '../hooks/useStandardInfrastructureState';

interface StandardInfrastructureInterfaceProps {
  selectedStandardCategories: string[];
  onCategoryToggle: (category: string) => void;
  onGenerateCode: () => void;
  userDefinedVariables?: string;
}

export const StandardInfrastructureInterface = ({
  selectedStandardCategories,
  onCategoryToggle,
  onGenerateCode,
  userDefinedVariables
}: StandardInfrastructureInterfaceProps) => {
  const {
    selectedProviders,
    selectedComputeTypes,
    multiTenantConfig,
    handleProviderToggle,
    handleComputeTypeToggle,
    handleMultiTenantConfigChange
  } = useStandardInfrastructureState();

  const generatedCode = useCodeGenerator({
    selectedStandardCategories,
    selectedProviders,
    selectedComputeTypes,
    userDefinedVariables,
    multiTenantConfig
  });

  // Always apply tagging validation
  const enhancedCode = generateEnhancedCode(generatedCode, true);
  const codeSections = useCodeSections({ enhancedCode });

  return (
    <div className="space-y-6">
      <ProviderSelector
        selectedProviders={selectedProviders}
        onProviderToggle={handleProviderToggle}
      />

      <InfrastructureCategorySelector
        selectedCategories={selectedStandardCategories}
        onCategoryToggle={onCategoryToggle}
      />

      {selectedStandardCategories.includes('compute') && selectedProviders.length > 0 && (
        <ComputeCategorySelector
          selectedComputeTypes={selectedComputeTypes}
          onComputeTypeToggle={handleComputeTypeToggle}
          selectedProviders={selectedProviders}
        />
      )}

      <MultiTenantConfigComponent
        config={multiTenantConfig}
        onConfigChange={handleMultiTenantConfigChange}
        selectedProviders={selectedProviders}
      />

      {enhancedCode && (
        <GeneratedCodeDisplay
          codeSections={codeSections}
          selectedStandardCategories={selectedStandardCategories}
        />
      )}
    </div>
  );
};
