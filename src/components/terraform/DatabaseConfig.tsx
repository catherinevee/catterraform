
import React, { useState } from 'react';
import DatabaseBasicConfig from './DatabaseBasicConfig';
import DatabaseSecurityConfig from './DatabaseSecurityConfig';
import DatabaseAccessConfig from './DatabaseAccessConfig';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

interface DatabaseConfigProps {
  cloudProvider: string;
  onConfigChange: (field: string, value: any) => void;
}

const DatabaseConfig: React.FC<DatabaseConfigProps> = ({ cloudProvider, onConfigChange }) => {
  const [useTfModule, setUseTfModule] = useState(false);

  const handleTfModuleChange = (checked: boolean) => {
    setUseTfModule(checked);
    onConfigChange('useTfModule', checked);
  };

  return (
    <div className="mb-8">
      <h3 className="text-md font-medium text-gray-700 mb-4">Database Configuration</h3>
      
      {cloudProvider === 'aws' && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox
              id="useTfModule"
              checked={useTfModule}
              onCheckedChange={handleTfModuleChange}
            />
            <Label htmlFor="useTfModule" className="text-sm font-medium">
              Use TF Module for RDS?
            </Label>
          </div>
          
          {useTfModule && (
            <div className="mt-3">
              <a
                href="https://registry.terraform.io/modules/terraform-aws-modules/rds/aws/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 underline"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Module Source
              </a>
            </div>
          )}
        </div>
      )}
      
      <DatabaseBasicConfig 
        cloudProvider={cloudProvider}
        onConfigChange={onConfigChange}
      />
      
      <DatabaseSecurityConfig 
        onConfigChange={onConfigChange}
      />
      
      <DatabaseAccessConfig 
        onConfigChange={onConfigChange}
      />
    </div>
  );
};

export default DatabaseConfig;
