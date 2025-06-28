
import React from 'react';
import { generateHCLCode } from '../utils/hclCodeGenerator';

interface MultiTenantConfig {
  enabled: boolean;
  aliasValuePairs: { id: string; alias: string; value: string; }[];
}

interface UseCodeGeneratorProps {
  selectedStandardCategories: string[];
  selectedProviders: string[];
  selectedComputeTypes?: string[];
  userDefinedVariables?: string;
  multiTenantConfig: MultiTenantConfig;
}

export const useCodeGenerator = ({ 
  selectedStandardCategories, 
  selectedProviders, 
  selectedComputeTypes, 
  userDefinedVariables,
  multiTenantConfig
}: UseCodeGeneratorProps) => {
  return React.useMemo(() => {
    if (selectedStandardCategories.length === 0 || selectedProviders.length === 0) {
      return '';
    }
    return generateHCLCode(selectedStandardCategories, selectedProviders, selectedComputeTypes, multiTenantConfig);
  }, [selectedStandardCategories, selectedProviders, selectedComputeTypes, userDefinedVariables, multiTenantConfig]);
};
