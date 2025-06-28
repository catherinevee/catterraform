
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ComputeCategorySelectorProps {
  selectedComputeTypes: string[];
  onComputeTypeToggle: (computeType: string) => void;
  selectedProviders: string[];
}

export const ComputeCategorySelector = ({
  selectedComputeTypes,
  onComputeTypeToggle,
  selectedProviders
}: ComputeCategorySelectorProps) => {
  const computeOptions = [
    {
      id: 'windows-vm',
      label: 'Windows Virtual Machine',
      description: 'Single Windows VM instance',
      providers: ['azure', 'aws']
    },
    {
      id: 'linux-vm',
      label: 'Linux Virtual Machine',
      description: 'Single Linux VM instance',
      providers: ['azure', 'aws']
    },
    {
      id: 'windows-vmss',
      label: 'Windows VM Scale Set',
      description: 'Scalable Windows VM instances',
      providers: ['azure']
    },
    {
      id: 'linux-vmss',
      label: 'Linux VM Scale Set',
      description: 'Scalable Linux VM instances',
      providers: ['azure']
    }
  ];

  const availableOptions = computeOptions.filter(option => 
    option.providers.some(provider => selectedProviders.includes(provider))
  );

  if (availableOptions.length === 0) {
    return null;
  }

  return (
    <Card className="border-2" style={{ borderColor: '#6653e3' }}>
      <CardHeader className="pb-3" style={{ backgroundColor: '#f0efff' }}>
        <CardTitle className="text-lg" style={{ color: '#4a3bc7' }}>
          Compute Resource Types
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {availableOptions.map((option) => (
          <div key={option.id} className="flex items-start space-x-3">
            <Checkbox
              id={option.id}
              checked={selectedComputeTypes.includes(option.id)}
              onCheckedChange={() => onComputeTypeToggle(option.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <label
                htmlFor={option.id}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {option.label}
              </label>
              <p className="text-xs text-gray-600 mt-1">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
