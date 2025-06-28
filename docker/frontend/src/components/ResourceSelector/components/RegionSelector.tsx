
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { REGIONS } from '../constants/regions';

interface TagPair {
  key: string;
  value: string;
}

interface RegionSelectorProps {
  selectedRegion: string;
  customRegion: string;
  useCustomRegion: boolean;
  tags: TagPair[];
  onRegionChange: (value: string) => void;
  onCustomRegionChange: (value: string) => void;
  onTagsChange: (tags: TagPair[]) => void;
}

export const RegionSelector = ({
  selectedRegion,
  customRegion,
  useCustomRegion,
  tags,
  onRegionChange,
  onCustomRegionChange,
  onTagsChange
}: RegionSelectorProps) => {
  const handleTagChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedTags = [...tags];
    updatedTags[index] = { ...updatedTags[index], [field]: value };
    onTagsChange(updatedTags);
  };

  const addTag = () => {
    onTagsChange([...tags, { key: '', value: '' }]);
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    onTagsChange(updatedTags);
  };

  return (
    <div className="space-y-6">
      {/* Default Region Section */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#4a3bc7' }}>
          User-Defined HCL Variables
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium" style={{ color: '#4a3bc7' }}>Default Region:</span>
            <Select value={useCustomRegion ? 'custom' : selectedRegion} onValueChange={onRegionChange}>
              <SelectTrigger className="border-2 flex-1" style={{ borderColor: '#6653e3' }}>
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto bg-white">
                {REGIONS.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom region...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {useCustomRegion && (
            <Input
              type="text"
              placeholder="Enter custom region"
              value={customRegion}
              onChange={(e) => onCustomRegionChange(e.target.value)}
              className="border-2"
              style={{ borderColor: '#6653e3' }}
            />
          )}
        </div>
        <p className="text-xs text-gray-600 mt-1">
          This will create a default_region variable in your Terraform configuration
        </p>
      </div>

      {/* Default Tags Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: '#4a3bc7' }}>Default Tags:</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTag}
            className="flex items-center space-x-1 border-2 hover:opacity-90"
            style={{ borderColor: '#6653e3', color: '#6653e3' }}
          >
            <Plus className="h-4 w-4" />
            <span>Add Tag</span>
          </Button>
        </div>
        
        <div className="space-y-2">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Key"
                value={tag.key}
                onChange={(e) => handleTagChange(index, 'key', e.target.value)}
                className="border-2 flex-1"
                style={{ borderColor: '#6653e3' }}
              />
              <Input
                type="text"
                placeholder="Value"
                value={tag.value}
                onChange={(e) => handleTagChange(index, 'value', e.target.value)}
                className="border-2 flex-1"
                style={{ borderColor: '#6653e3' }}
              />
              {tags.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeTag(index)}
                  className="flex items-center justify-center border-2 hover:opacity-90 min-w-[36px]"
                  style={{ borderColor: '#dc2626', color: '#dc2626' }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-600 mt-1">
          This will create default_tags variable in your Terraform configuration
        </p>
      </div>
    </div>
  );
};
