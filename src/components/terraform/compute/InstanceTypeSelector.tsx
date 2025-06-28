
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InstanceTypeSelectorProps {
  cloudProvider: string;
  onInstanceTypeChange: (value: string) => void;
}

const InstanceTypeSelector: React.FC<InstanceTypeSelectorProps> = ({ 
  cloudProvider, 
  onInstanceTypeChange 
}) => {
  return (
    <div>
      <Label htmlFor="instanceType" className="text-sm">Instance Type</Label>
      <Select onValueChange={onInstanceTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select instance type" />
        </SelectTrigger>
        <SelectContent>
          {cloudProvider === 'aws' && (
            <>
              <SelectItem value="t3.micro">t3.micro</SelectItem>
              <SelectItem value="t3.small">t3.small</SelectItem>
              <SelectItem value="t3.medium">t3.medium</SelectItem>
              <SelectItem value="m5.large">m5.large</SelectItem>
              <SelectItem value="m5.xlarge">m5.xlarge</SelectItem>
            </>
          )}
          {cloudProvider === 'azure' && (
            <>
              <SelectItem value="Standard_B1s">Standard_B1s</SelectItem>
              <SelectItem value="Standard_B2s">Standard_B2s</SelectItem>
              <SelectItem value="Standard_D2s_v3">Standard_D2s_v3</SelectItem>
              <SelectItem value="Standard_D4s_v3">Standard_D4s_v3</SelectItem>
            </>
          )}
          {cloudProvider === 'gcp' && (
            <>
              <SelectItem value="e2-micro">e2-micro</SelectItem>
              <SelectItem value="e2-small">e2-small</SelectItem>
              <SelectItem value="e2-medium">e2-medium</SelectItem>
              <SelectItem value="n1-standard-1">n1-standard-1</SelectItem>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default InstanceTypeSelector;
