
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Resource } from '@/types/Resource';

interface ResourceFiltersProps {
  resources: Resource[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onResourceSelect: (resourceType: string) => void;
}

export const ResourceFilters = ({
  resources,
  categories,
  selectedCategory,
  onCategoryChange,
  onResourceSelect
}: ResourceFiltersProps) => {
  const filteredResources = resources.filter(resource => 
    selectedCategory === 'all' || resource.category === selectedCategory
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
          Filter by Category
        </label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="border-2" style={{ borderColor: '#6653e3' }}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
          Select Resource
        </label>
        <Select onValueChange={onResourceSelect}>
          <SelectTrigger className="border-2" style={{ borderColor: '#6653e3' }}>
            <SelectValue placeholder="Choose a resource" />
          </SelectTrigger>
          <SelectContent>
            {filteredResources.map((resource) => (
              <SelectItem key={resource.id} value={resource.type}>
                {resource.type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
