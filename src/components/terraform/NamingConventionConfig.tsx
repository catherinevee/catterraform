
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NamingConventionConfigProps {
  onConfigChange: (field: string, value: any) => void;
}

const NamingConventionConfig: React.FC<NamingConventionConfigProps> = ({ onConfigChange }) => {
  const [selectedConvention, setSelectedConvention] = useState('');
  const [customConvention, setCustomConvention] = useState('');

  const namingConventions = [
    { value: 'kebab-case', label: 'kebab-case (project-name-resource)', description: 'Lowercase with hyphens' },
    { value: 'snake_case', label: 'snake_case (project_name_resource)', description: 'Lowercase with underscores' },
    { value: 'PascalCase', label: 'PascalCase (ProjectNameResource)', description: 'Each word capitalized' },
    { value: 'camelCase', label: 'camelCase (projectNameResource)', description: 'First word lowercase, others capitalized' },
    { value: 'prefix-kebab', label: 'Prefix with kebab-case (org-project-name-resource)', description: 'Organization prefix with kebab-case' },
    { value: 'custom', label: 'Custom naming convention', description: 'Define your own pattern' }
  ];

  const handleConventionChange = (value: string) => {
    setSelectedConvention(value);
    if (value !== 'custom') {
      onConfigChange('namingConvention', value);
      onConfigChange('customNamingConvention', '');
    }
  };

  const handleCustomConventionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomConvention(value);
    onConfigChange('customNamingConvention', value);
    onConfigChange('namingConvention', 'custom');
  };

  return (
    <div className="mb-8">
      <h3 className="text-md font-medium text-gray-700 mb-4">Naming Convention</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="namingConvention" className="text-sm">Resource Naming Convention</Label>
          <Select onValueChange={handleConventionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select naming convention" />
            </SelectTrigger>
            <SelectContent>
              {namingConventions.map((convention) => (
                <SelectItem key={convention.value} value={convention.value}>
                  <div>
                    <div className="font-medium">{convention.label}</div>
                    <div className="text-xs text-gray-500">{convention.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedConvention === 'custom' && (
          <div>
            <Label htmlFor="customConvention" className="text-sm">Custom Naming Pattern</Label>
            <Input
              id="customConvention"
              type="text"
              placeholder="e.g., {project}-{environment}-{resource}-{suffix}"
              value={customConvention}
              onChange={handleCustomConventionChange}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use placeholders like {"{project}"}, {"{environment}"}, {"{resource}"} for dynamic values
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NamingConventionConfig;
