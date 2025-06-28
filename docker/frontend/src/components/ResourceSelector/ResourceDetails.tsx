
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { CodeExample } from './CodeExample';
import { RelatedResources } from './RelatedResources';
import { Resource } from '@/types/Resource';

interface ResourceDetailsProps {
  selectedResource: Resource;
  resources: Resource[];
  onResourceSelect: (resourceType: string) => void;
}

export const ResourceDetails = ({ selectedResource, resources, onResourceSelect }: ResourceDetailsProps) => {
  return (
    <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: '#6653e3' }}>
      <div className="px-4 py-3 border-b-2" style={{ backgroundColor: '#f0efff', borderColor: '#6653e3' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold" style={{ color: '#4a3bc7' }}>
              {selectedResource.type}
            </h3>
            <Badge variant="secondary" style={{ backgroundColor: '#e6e3ff', color: '#4a3bc7' }}>
              {selectedResource.category}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a
              href={selectedResource.docs_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 border-2 hover:opacity-90"
              style={{ borderColor: '#6653e3', color: '#6653e3' }}
            >
              <ExternalLink className="h-4 w-4" />
              <span>Docs</span>
            </a>
          </Button>
        </div>
        <p className="mt-2" style={{ color: '#5a4fd1' }}>{selectedResource.description}</p>
      </div>
      
      <CodeExample resource={selectedResource} />

      <RelatedResources 
        selectedResource={selectedResource}
        resources={resources}
        onResourceSelect={onResourceSelect}
      />
    </div>
  );
};
