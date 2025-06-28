
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface InfrastructureCategorySelectorProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

const STANDARD_INFRASTRUCTURE_CATEGORIES = [
  'Remote State',
  'Cost/Billing',
  'IAM',
  'Compute',
  'Networking',
  'Database',
  'Storage',
  'Virtualization'
];

export const InfrastructureCategorySelector = ({
  selectedCategories,
  onCategoryToggle
}: InfrastructureCategorySelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
        Select Infrastructure Components ({selectedCategories.length} selected)
      </label>
      <div className="border-2 rounded-lg p-4 space-y-2" style={{ borderColor: '#6653e3', backgroundColor: '#f8f7ff' }}>
        {STANDARD_INFRASTRUCTURE_CATEGORIES.map((category) => (
          <div key={category} className="flex items-center space-x-3 p-2 hover:bg-white rounded">
            <Checkbox
              id={`standard-${category}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onCategoryToggle(category)}
            />
            <label htmlFor={`standard-${category}`} className="flex-1 cursor-pointer">
              <div className="font-medium text-sm" style={{ color: '#4a3bc7' }}>{category}</div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
