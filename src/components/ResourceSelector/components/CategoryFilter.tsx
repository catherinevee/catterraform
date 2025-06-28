
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CategoryFilterProps {
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({
  selectedCategory,
  categories,
  onCategoryChange
}: CategoryFilterProps) => {
  return (
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
  );
};
