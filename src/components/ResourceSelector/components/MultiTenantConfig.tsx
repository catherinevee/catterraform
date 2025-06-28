
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface AliasValuePair {
  id: string;
  alias: string;
  value: string;
}

interface MultiTenantConfig {
  enabled: boolean;
  aliasValuePairs: AliasValuePair[];
}

interface MultiTenantConfigProps {
  config: MultiTenantConfig;
  onConfigChange: (config: MultiTenantConfig) => void;
  selectedProviders?: string[];
}

export const MultiTenantConfigComponent = ({ config, onConfigChange, selectedProviders = [] }: MultiTenantConfigProps) => {
  const handleEnabledChange = (checked: boolean) => {
    const newConfig: MultiTenantConfig = {
      enabled: checked,
      aliasValuePairs: checked ? config.aliasValuePairs : []
    };
    onConfigChange(newConfig);
  };

  const handleAliasValueChange = (id: string, field: 'alias' | 'value', newValue: string) => {
    const updatedPairs = config.aliasValuePairs.map(pair => 
      pair.id === id ? { ...pair, [field]: newValue } : pair
    );
    
    const newConfig: MultiTenantConfig = {
      enabled: config.enabled,
      aliasValuePairs: updatedPairs
    };
    onConfigChange(newConfig);
  };

  const addAliasValuePair = () => {
    const newPair: AliasValuePair = {
      id: Date.now().toString(),
      alias: 'alias',
      value: ''
    };
    const updatedPairs = [...config.aliasValuePairs, newPair];
    
    const newConfig: MultiTenantConfig = {
      enabled: config.enabled,
      aliasValuePairs: updatedPairs
    };
    onConfigChange(newConfig);
  };

  const removeAliasValuePair = (id: string) => {
    if (config.aliasValuePairs.length > 1) {
      const updatedPairs = config.aliasValuePairs.filter(pair => pair.id !== id);
      
      const newConfig: MultiTenantConfig = {
        enabled: config.enabled,
        aliasValuePairs: updatedPairs
      };
      onConfigChange(newConfig);
    }
  };

  const getProviderDisplayName = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'aws':
        return 'AWS';
      case 'azure':
      case 'azurerm':
        return 'Azure';
      default:
        return provider.toUpperCase();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        id="enable-multi-tenant"
        type="checkbox"
        checked={config.enabled}
        onChange={(e) => handleEnabledChange(e.target.checked)}
        className="h-4 w-4 rounded border-2"
        style={{ borderColor: '#6653e3' }}
      />
      <label
        htmlFor="enable-multi-tenant"
        className="text-sm font-medium cursor-pointer"
        style={{ color: '#4a3bc7' }}
      >
        Enable Multi-subscription/Multi-tenant
      </label>

      {config.enabled && (
        <div className="ml-6 space-y-3 p-4 border rounded-lg" style={{ borderColor: '#6653e3', backgroundColor: '#f8f7ff' }}>
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium" style={{ color: '#4a3bc7' }}>
              Provider Aliases Configuration
            </Label>
            {selectedProviders.length > 0 && (
              <div className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#e0dcff', color: '#4a3bc7' }}>
                {selectedProviders.map(getProviderDisplayName).join(', ')} selected
              </div>
            )}
          </div>
          {config.aliasValuePairs.map((pair) => (
            <div key={pair.id} className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  placeholder="Alias"
                  value="alias"
                  readOnly
                  className="text-sm bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Value (e.g., subscription ID)"
                  value={pair.value}
                  onChange={(e) => handleAliasValueChange(pair.id, 'value', e.target.value)}
                  className="text-sm"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeAliasValuePair(pair.id)}
                disabled={config.aliasValuePairs.length === 1}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addAliasValuePair}
            className="flex items-center space-x-1"
            style={{ borderColor: '#6653e3', color: '#6653e3' }}
          >
            <Plus className="h-4 w-4" />
            <span>Add Another Alias</span>
          </Button>
        </div>
      )}
    </div>
  );
};
