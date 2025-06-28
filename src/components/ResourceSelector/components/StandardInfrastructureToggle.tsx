
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface StandardInfrastructureToggleProps {
  useStandardInfrastructure: boolean;
  onToggle: (checked: boolean) => void;
}

export const StandardInfrastructureToggle = ({
  useStandardInfrastructure,
  onToggle
}: StandardInfrastructureToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="standard-infrastructure"
        checked={useStandardInfrastructure}
        onCheckedChange={(checked) => onToggle(checked === true)}
      />
      <label htmlFor="standard-infrastructure" className="text-sm font-medium" style={{ color: '#4a3bc7' }}>
        Standard Cloud Infrastructure
      </label>
    </div>
  );
};
