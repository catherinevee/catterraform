
import React from 'react';

interface MultiTenantConfig {
  enabled: boolean;
  aliasValuePairs: { id: string; alias: string; value: string; }[];
}

export const useStandardInfrastructureState = () => {
  const [selectedProviders, setSelectedProviders] = React.useState<string[]>(['azure']); // Default to Azure
  const [selectedComputeTypes, setSelectedComputeTypes] = React.useState<string[]>(['linux-vm']); // Default to Linux VM
  const [multiTenantConfig, setMultiTenantConfig] = React.useState<MultiTenantConfig>({
    enabled: false,
    aliasValuePairs: [{ id: '1', alias: 'alias', value: '' }]
  });

  const handleProviderToggle = (provider: string) => {
    setSelectedProviders(prev => {
      if (prev.includes(provider)) {
        return prev.filter(p => p !== provider);
      } else {
        return [...prev, provider];
      }
    });
  };

  const handleComputeTypeToggle = (computeType: string) => {
    setSelectedComputeTypes(prev => {
      if (prev.includes(computeType)) {
        return prev.filter(c => c !== computeType);
      } else {
        return [...prev, computeType];
      }
    });
  };

  const handleMultiTenantConfigChange = (config: MultiTenantConfig) => {
    setMultiTenantConfig(config);
  };

  return {
    selectedProviders,
    selectedComputeTypes,
    multiTenantConfig,
    handleProviderToggle,
    handleComputeTypeToggle,
    handleMultiTenantConfigChange
  };
};
