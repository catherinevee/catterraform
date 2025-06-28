
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Ec2ModuleToggleProps {
  useEc2TfModule: boolean;
  onToggle: (checked: boolean) => void;
}

const Ec2ModuleToggle: React.FC<Ec2ModuleToggleProps> = ({ useEc2TfModule, onToggle }) => {
  return (
    <div className="space-y-3 mb-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="useEc2TfModule"
          checked={useEc2TfModule}
          onCheckedChange={onToggle}
        />
        <Label htmlFor="useEc2TfModule" className="text-sm">
          Use TF Module for EC2?
        </Label>
      </div>
      
      {useEc2TfModule && (
        <div className="ml-6">
          <a 
            href="https://registry.terraform.io/modules/terraform-aws-modules/ec2-instance/aws/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Module Source
          </a>
        </div>
      )}
    </div>
  );
};

export default Ec2ModuleToggle;
