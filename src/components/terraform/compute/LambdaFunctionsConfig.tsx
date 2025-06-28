
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface LambdaFunctionsConfigProps {
  enableLambdaFunctions: boolean;
  useTfModule: boolean;
  onLambdaToggle: (enabled: boolean) => void;
  onTfModuleToggle: (checked: boolean) => void;
}

const LambdaFunctionsConfig: React.FC<LambdaFunctionsConfigProps> = ({
  enableLambdaFunctions,
  useTfModule,
  onLambdaToggle,
  onTfModuleToggle
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Switch
          id="enableLambdaFunctions"
          checked={enableLambdaFunctions}
          onCheckedChange={onLambdaToggle}
        />
        <Label htmlFor="enableLambdaFunctions" className="text-sm">
          Include Lambda Functions
        </Label>
      </div>

      {enableLambdaFunctions && (
        <div className="ml-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="useTfModule"
              checked={useTfModule}
              onCheckedChange={onTfModuleToggle}
            />
            <Label htmlFor="useTfModule" className="text-sm">
              Use TF Module for Lambda?
            </Label>
          </div>
          
          {useTfModule && (
            <div className="ml-6">
              <a 
                href="https://registry.terraform.io/modules/terraform-aws-modules/lambda/aws/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                Module Source
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LambdaFunctionsConfig;
