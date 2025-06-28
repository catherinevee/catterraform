
import React, { useEffect } from 'react';
import GlobalConfigSection from './GlobalConfigSection';
import ComputeConfig from './ComputeConfig';
import StorageConfig from './StorageConfig';
import NetworkingConfig from './NetworkingConfig';
import DatabaseConfig from './DatabaseConfig';
import NamingConventionConfig from './NamingConventionConfig';
import CostAlertsConfig from './CostAlertsConfig';
import AzureRemoteStateConfig from './AzureRemoteStateConfig';

interface ResourceConfigPanelProps {
  selectedResources: string[];
  cloudProvider: string;
  resourceConfigs: any;
  onResourceConfigChange: (resourceType: string, field: string, value: any) => void;
  onGenerateCode?: () => void;
}

const ResourceConfigPanel: React.FC<ResourceConfigPanelProps> = ({
  selectedResources,
  cloudProvider,
  resourceConfigs,
  onResourceConfigChange,
  onGenerateCode
}) => {
  // Trigger code generation whenever configuration changes
  useEffect(() => {
    if (onGenerateCode && Object.keys(resourceConfigs).length > 0) {
      const timeoutId = setTimeout(() => {
        onGenerateCode();
      }, 500); // Debounce to avoid too many calls
      
      return () => clearTimeout(timeoutId);
    }
  }, [resourceConfigs, onGenerateCode]);

  // Check if only remote-state is selected
  const isOnlyRemoteState = selectedResources.length === 1 && selectedResources[0] === 'remote-state';
  const isAzureRemoteState = isOnlyRemoteState && cloudProvider === 'azure';

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#5f4ecc' }}>Resource Configuration</h2>
        
        {isAzureRemoteState ? (
          <AzureRemoteStateConfig 
            onConfigChange={(field, value) => onResourceConfigChange('remote-state', field, value)}
          />
        ) : (
          <>
            <GlobalConfigSection 
              cloudProvider={cloudProvider}
              onConfigChange={(field, value) => onResourceConfigChange('global', field, value)}
            />

            <div className="border-t pt-4">
              <NamingConventionConfig 
                onConfigChange={(field, value) => onResourceConfigChange('global', field, value)}
              />
              
              {selectedResources.includes('compute') && (
                <ComputeConfig 
                  cloudProvider={cloudProvider}
                  onConfigChange={(field, value) => onResourceConfigChange('compute', field, value)}
                />
              )}

              {selectedResources.includes('storage') && (
                <StorageConfig 
                  cloudProvider={cloudProvider}
                  onConfigChange={(field, value) => onResourceConfigChange('storage', field, value)}
                />
              )}

              {selectedResources.includes('networking') && (
                <NetworkingConfig 
                  cloudProvider={cloudProvider}
                  onConfigChange={(field, value) => onResourceConfigChange('networking', field, value)}
                />
              )}

              {selectedResources.includes('database') && (
                <DatabaseConfig 
                  cloudProvider={cloudProvider}
                  onConfigChange={(field, value) => onResourceConfigChange('database', field, value)}
                />
              )}

              {selectedResources.includes('cost-alerts') && (
                <CostAlertsConfig 
                  cloudProvider={cloudProvider}
                  onConfigChange={(field, value) => onResourceConfigChange('cost-alerts', field, value)}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResourceConfigPanel;
