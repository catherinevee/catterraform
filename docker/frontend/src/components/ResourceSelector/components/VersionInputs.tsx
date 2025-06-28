
import React from 'react';
import { Input } from '@/components/ui/input';

interface VersionInputsProps {
  terraformVersion: string;
  awsProviderVersion: string;
  azureProviderVersion: string;
  onTerraformVersionChange: (version: string) => void;
  onAwsProviderVersionChange: (version: string) => void;
  onAzureProviderVersionChange: (version: string) => void;
}

export const VersionInputs = ({
  terraformVersion,
  awsProviderVersion,
  azureProviderVersion,
  onTerraformVersionChange,
  onAwsProviderVersionChange,
  onAzureProviderVersionChange
}: VersionInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
          Terraform Version
        </label>
        <Input
          type="text"
          placeholder="1.12"
          value={terraformVersion}
          onChange={(e) => onTerraformVersionChange(e.target.value)}
          className="border-2"
          style={{ borderColor: '#6653e3' }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
          AWS Provider Version
        </label>
        <Input
          type="text"
          placeholder="6.0.0"
          value={awsProviderVersion}
          onChange={(e) => onAwsProviderVersionChange(e.target.value)}
          className="border-2"
          style={{ borderColor: '#6653e3' }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
          Azure Provider Version
        </label>
        <Input
          type="text"
          placeholder="4.34"
          value={azureProviderVersion}
          onChange={(e) => onAzureProviderVersionChange(e.target.value)}
          className="border-2"
          style={{ borderColor: '#6653e3' }}
        />
      </div>
    </div>
  );
};
