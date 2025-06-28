
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface BasicCostAlertsConfigProps {
  cloudProvider: string;
  onConfigChange: (field: string, value: any) => void;
}

const BasicCostAlertsConfig: React.FC<BasicCostAlertsConfigProps> = ({
  cloudProvider,
  onConfigChange
}) => {
  const [enableCostAnomalyDetection, setEnableCostAnomalyDetection] = React.useState(false);
  const [enableUsageReports, setEnableUsageReports] = React.useState(false);
  const [usePricingModule, setUsePricingModule] = React.useState(false);

  const handleCostAnomalyDetectionChange = (checked: boolean) => {
    setEnableCostAnomalyDetection(checked);
    onConfigChange('enableCostAnomalyDetection', checked);
  };

  const handleUsageReportsChange = (checked: boolean) => {
    setEnableUsageReports(checked);
    onConfigChange('enableUsageReports', checked);
  };

  const handlePricingModuleChange = (checked: boolean) => {
    setUsePricingModule(checked);
    onConfigChange('usePricingModule', checked);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium text-gray-900">Basic Cost Monitoring</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="cost-anomaly-detection"
            checked={enableCostAnomalyDetection}
            onCheckedChange={handleCostAnomalyDetectionChange}
          />
          <Label htmlFor="cost-anomaly-detection" className="text-sm">
            Enable Cost Anomaly Detection
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="usage-reports"
            checked={enableUsageReports}
            onCheckedChange={handleUsageReportsChange}
          />
          <Label htmlFor="usage-reports" className="text-sm">
            Enable Cost and Usage Reports
          </Label>
        </div>

        {cloudProvider === 'aws' && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pricing-module"
                checked={usePricingModule}
                onCheckedChange={handlePricingModuleChange}
              />
              <Label htmlFor="pricing-module" className="text-sm">
                Use TF Module for Pricing?
              </Label>
            </div>
            
            {usePricingModule && (
              <div className="ml-6">
                <a
                  href="https://registry.terraform.io/modules/terraform-aws-modules/pricing/aws/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Module Source
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicCostAlertsConfig;
