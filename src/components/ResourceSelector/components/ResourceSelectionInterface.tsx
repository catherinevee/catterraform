
import React from 'react';
import { Button } from '@/components/ui/button';

interface ResourceSelectionInterfaceProps {
  resources: any[];
  categories: string[];
  selectedCategory: string;
  selectedResources: string[];
  onCategoryChange: (category: string) => void;
  onResourceToggle: (resourceType: string) => void;
  onGenerateCode: () => void;
}

export const ResourceSelectionInterface = ({
  selectedResources,
  onGenerateCode
}: ResourceSelectionInterfaceProps) => {
  return (
    <div className="text-center py-12 rounded-lg" style={{ backgroundColor: '#f0efff' }}>
      <p className="mb-4" style={{ color: '#5a4fd1' }}>
        Resource selection has been moved to the Module Designer page.
      </p>
      <p className="mb-6" style={{ color: '#5a4fd1' }}>
        Use the "Open Module Designer" button above to access the resource selection interface.
      </p>
      
      {selectedResources.length > 0 && (
        <Button
          onClick={onGenerateCode}
          className="w-full"
          style={{ backgroundColor: '#6653e3', color: 'white' }}
        >
          Generate Terraform Code for {selectedResources.length} Resource{selectedResources.length !== 1 ? 's' : ''}
        </Button>
      )}
    </div>
  );
};
