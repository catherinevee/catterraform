
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RegionSelector from './RegionSelector';

interface GlobalConfigSectionProps {
  cloudProvider: string;
  onConfigChange: (field: string, value: any) => void;
}

const GlobalConfigSection: React.FC<GlobalConfigSectionProps> = ({
  cloudProvider,
  onConfigChange
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div>
        <Label htmlFor="organization" className="text-sm font-medium text-gray-700">
          Organization
        </Label>
        <Input
          id="organization"
          type="text"
          placeholder="my-organization"
          onChange={(e) => onConfigChange('organization', e.target.value)}
          className="mt-1"
        />
      </div>

      <RegionSelector 
        cloudProvider={cloudProvider}
        onConfigChange={onConfigChange}
      />

      <div>
        <Label htmlFor="project" className="text-sm font-medium text-gray-700">
          Project
        </Label>
        <Input
          id="project"
          type="text"
          placeholder="my-project"
          onChange={(e) => onConfigChange('project', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="environment" className="text-sm font-medium text-gray-700">
          Environment
        </Label>
        <Input
          id="environment"
          type="text"
          placeholder="dev"
          onChange={(e) => onConfigChange('environment', e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="location" className="text-sm font-medium text-gray-700">
          Location (Optional)
        </Label>
        <Input
          id="location"
          type="text"
          placeholder="east"
          onChange={(e) => onConfigChange('location', e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default GlobalConfigSection;
