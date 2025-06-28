
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface TerraformModuleToggleProps {
  cloudProvider: string;
  useTfModule: boolean;
  onToggle: (checked: boolean) => void;
}

const TerraformModuleToggle: React.FC<TerraformModuleToggleProps> = ({
  cloudProvider,
  useTfModule,
  onToggle
}) => {
  if (cloudProvider !== 'aws') return null;

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="useTfModuleS3"
          checked={useTfModule}
          onCheckedChange={onToggle}
        />
        <Label htmlFor="useTfModuleS3" className="text-sm">
          Use TF Module for S3?
        </Label>
      </div>
      
      {useTfModule && (
        <div className="ml-6">
          <a 
            href="https://registry.terraform.io/modules/terraform-aws-modules/s3-bucket/aws/latest"
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

export default TerraformModuleToggle;
