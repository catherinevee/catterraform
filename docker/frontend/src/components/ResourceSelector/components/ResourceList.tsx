
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Resource } from '@/types/Resource';

interface ResourceListProps {
  resources: Resource[];
  selectedResources: string[];
  onResourceToggle: (resourceType: string) => void;
}

export const ResourceList = ({
  resources,
  selectedResources,
  onResourceToggle
}: ResourceListProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
        Select Resources ({selectedResources.length} selected)
      </label>
      <div className="max-h-60 overflow-y-auto border-2 rounded-lg p-4 space-y-2" style={{ borderColor: '#6653e3', backgroundColor: '#f8f7ff' }}>
        {resources.map((resource) => (
          <div key={resource.id} className="flex items-center space-x-3 p-2 hover:bg-white rounded">
            <Checkbox
              id={resource.id}
              checked={selectedResources.includes(resource.type)}
              onCheckedChange={() => onResourceToggle(resource.type)}
            />
            <label htmlFor={resource.id} className="flex-1 cursor-pointer">
              <div className="font-medium text-sm" style={{ color: '#4a3bc7' }}>{resource.type}</div>
              <div className="text-xs text-gray-600">{resource.description}</div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
