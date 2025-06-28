
import React, { useState } from 'react';
import TerraformModuleToggle from './storage/TerraformModuleToggle';
import StorageBasicConfig from './storage/StorageBasicConfig';
import StorageSecurityConfig from './storage/StorageSecurityConfig';
import StorageAccessConfig from './storage/StorageAccessConfig';

interface StorageConfigProps {
  cloudProvider: string;
  onConfigChange: (field: string, value: any) => void;
}

const StorageConfig: React.FC<StorageConfigProps> = ({ cloudProvider, onConfigChange }) => {
  const [useTfModule, setUseTfModule] = useState(false);

  const handleTfModuleToggle = (checked: boolean) => {
    setUseTfModule(checked);
    onConfigChange('useTfModule', checked);
  };

  return (
    <div className="mb-8">
      <h3 className="text-md font-medium text-gray-700 mb-4">Storage Resources</h3>
      
      <TerraformModuleToggle 
        cloudProvider={cloudProvider}
        useTfModule={useTfModule}
        onToggle={handleTfModuleToggle}
      />

      <StorageBasicConfig 
        cloudProvider={cloudProvider}
        onConfigChange={onConfigChange}
      />

      <StorageSecurityConfig 
        onConfigChange={onConfigChange}
      />
      
      <StorageAccessConfig 
        onConfigChange={onConfigChange}
      />
    </div>
  );
};

export default StorageConfig;
