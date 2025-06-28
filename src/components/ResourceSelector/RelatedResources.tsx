
import React from 'react';
import { Button } from '@/components/ui/button';
import { Resource } from '@/types/Resource';

interface RelatedResourcesProps {
  selectedResource: Resource;
  resources: Resource[];
  onResourceSelect: (resourceType: string) => void;
}

export const RelatedResources = ({ selectedResource, resources, onResourceSelect }: RelatedResourcesProps) => {
  const getRelatedResources = (resource: Resource) => {
    // Extract the prefix (e.g., "aws_dx" from "aws_dx_gateway")
    const parts = resource.type.split('_');
    const prefix = parts.slice(0, -1).join('_'); // Remove the last part
    
    return resources.filter(r => 
      r.type !== resource.type && // Exclude the current resource
      r.type.startsWith(prefix + '_') // Match the prefix pattern
    ).slice(0, 5); // Limit to 5 related resources
  };

  const relatedResources = getRelatedResources(selectedResource);

  if (relatedResources.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-3 border-t-2" style={{ backgroundColor: '#f8f7ff', borderColor: '#6653e3' }}>
      <h4 className="text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
        Related resources:
      </h4>
      <div className="flex flex-wrap gap-2">
        {relatedResources.map((relatedResource) => (
          <Button
            key={relatedResource.id}
            variant="outline"
            size="sm"
            onClick={() => onResourceSelect(relatedResource.type)}
            className="text-xs border hover:opacity-90"
            style={{ borderColor: '#6653e3', color: '#6653e3' }}
          >
            {relatedResource.type}
          </Button>
        ))}
      </div>
    </div>
  );
};
