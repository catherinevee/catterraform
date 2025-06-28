
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface ProviderSelectorProps {
  selectedProviders: string[];
  onProviderToggle: (provider: string) => void;
}

export const ProviderSelector = ({
  selectedProviders,
  onProviderToggle
}: ProviderSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
        Select Cloud Providers
      </label>
      <div className="border-2 rounded-lg p-4 space-y-2" style={{ borderColor: '#6653e3', backgroundColor: '#f8f7ff' }}>
        <div className="flex items-center space-x-3 p-2 hover:bg-white rounded">
          <Checkbox
            id="provider-aws"
            checked={selectedProviders.includes('aws')}
            onCheckedChange={() => onProviderToggle('aws')}
          />
          <label htmlFor="provider-aws" className="flex-1 cursor-pointer">
            <div className="font-medium text-sm" style={{ color: '#4a3bc7' }}>AWS</div>
          </label>
        </div>
        <div className="flex items-center space-x-3 p-2 hover:bg-white rounded">
          <Checkbox
            id="provider-azure"
            checked={selectedProviders.includes('azure')}
            onCheckedChange={() => onProviderToggle('azure')}
          />
          <label htmlFor="provider-azure" className="flex-1 cursor-pointer">
            <div className="font-medium text-sm" style={{ color: '#4a3bc7' }}>Azure</div>
          </label>
        </div>
      </div>
    </div>
  );
};
