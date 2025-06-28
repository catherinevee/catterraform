
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegionSelectorProps {
  cloudProvider: string;
  onConfigChange: (field: string, value: any) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  cloudProvider,
  onConfigChange
}) => {
  const [customRegion, setCustomRegion] = useState('');
  const [showCustomRegion, setShowCustomRegion] = useState(false);

  const awsRegions = [
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'af-south-1',
    'ap-east-1',
    'ap-south-2',
    'ap-southeast-3',
    'ap-southeast-5',
    'ap-southeast-4',
    'ap-south-1',
    'ap-northeast-3',
    'ap-northeast-2',
    'ap-southeast-1',
    'ap-southeast-2',
    'ap-east-2',
    'ap-southeast-7',
    'ap-northeast-1',
    'ca-central-1',
    'ca-west-1',
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'eu-south-1',
    'eu-west-3',
    'eu-south-2',
    'eu-north-1',
    'eu-central-2',
    'il-central-1',
    'mx-central-1',
    'me-south-1',
    'me-central-1',
    'sa-east-1'
  ];

  const getRegionPlaceholder = () => {
    switch (cloudProvider) {
      case 'aws':
        return 'us-west-2';
      case 'azure':
        return 'West US 2';
      case 'gcp':
        return 'us-west1';
      default:
        return 'Region';
    }
  };

  const handleRegionChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomRegion(true);
    } else {
      setShowCustomRegion(false);
      setCustomRegion('');
      onConfigChange('region', value);
    }
  };

  const handleCustomRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomRegion(value);
    onConfigChange('region', value);
  };

  return (
    <div>
      <Label htmlFor="region" className="text-sm font-medium text-gray-700">
        Region
      </Label>
      {cloudProvider === 'aws' ? (
        <div className="mt-1 space-y-2">
          <Select onValueChange={handleRegionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select an AWS region" />
            </SelectTrigger>
            <SelectContent>
              {awsRegions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom region...</SelectItem>
            </SelectContent>
          </Select>
          {showCustomRegion && (
            <Input
              type="text"
              placeholder="Enter custom region"
              value={customRegion}
              onChange={handleCustomRegionChange}
            />
          )}
        </div>
      ) : (
        <Input
          id="region"
          type="text"
          placeholder={getRegionPlaceholder()}
          onChange={(e) => onConfigChange('region', e.target.value)}
          className="mt-1"
        />
      )}
    </div>
  );
};

export default RegionSelector;
