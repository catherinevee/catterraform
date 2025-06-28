
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ResourceFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  totalResources: number;
  filteredCount: number;
  onClearFilters: () => void;
}

export const ResourceFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  totalResources,
  filteredCount,
  onClearFilters
}: ResourceFiltersProps) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search AWS resources..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
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
        
        {(searchTerm || selectedCategory !== 'all') && (
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-600">
          Showing {filteredCount} of {totalResources} resources
        </span>
        {selectedCategory !== 'all' && (
          <Badge variant="secondary">
            {selectedCategory}
          </Badge>
        )}
        {searchTerm && (
          <Badge variant="secondary">
            Search: "{searchTerm}"
          </Badge>
        )}
      </div>
    </div>
  );
};
