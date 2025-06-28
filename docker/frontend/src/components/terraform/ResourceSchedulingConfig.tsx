
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResourceSchedulingConfigProps {
  cloudProvider: string;
  schedulingConfig: {
    enableScheduling: boolean;
    environment: string;
    scaleDownTime: string;
    scaleUpTime: string;
    scaleDownDays: string;
    scaleUpDays: string;
    enableLambdaScheduler: boolean;
    autoscalingGroupName: string;
  };
  onSchedulingConfigChange: (field: string, value: any) => void;
}

const ResourceSchedulingConfig: React.FC<ResourceSchedulingConfigProps> = ({
  cloudProvider,
  schedulingConfig,
  onSchedulingConfigChange
}) => {
  const getSchedulerLabel = () => {
    switch (cloudProvider) {
      case 'aws':
        return 'Enable Advanced Lambda-based Scheduler';
      case 'azure':
        return 'Enable Advanced Azure Function-based Scheduler';
      default:
        return 'Enable Advanced Scheduler';
    }
  };

  const getScalingGroupLabel = () => {
    switch (cloudProvider) {
      case 'aws':
        return 'Auto Scaling Group Name';
      case 'azure':
        return 'Virtual Machine Scale Set Name';
      default:
        return 'Scaling Group Name';
    }
  };

  return (
    <div>
      <h4 className="text-md font-medium text-gray-900 mb-4">Resource Scheduling</h4>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="enable-scheduling"
            checked={schedulingConfig.enableScheduling}
            onCheckedChange={(checked) => onSchedulingConfigChange('enableScheduling', checked)}
          />
          <Label htmlFor="enable-scheduling" className="text-sm">
            Enable Automated Resource Scheduling
          </Label>
        </div>

        {schedulingConfig.enableScheduling && (
          <div className="ml-6 space-y-4 p-4 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="environment" className="text-sm">
                  Target Environment
                </Label>
                <Select
                  value={schedulingConfig.environment}
                  onValueChange={(value) => onSchedulingConfigChange('environment', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="autoscaling-group-name" className="text-sm">
                  {getScalingGroupLabel()}
                </Label>
                <Input
                  id="autoscaling-group-name"
                  value={schedulingConfig.autoscalingGroupName}
                  onChange={(e) => onSchedulingConfigChange('autoscalingGroupName', e.target.value)}
                  placeholder="main"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="scale-up-time" className="text-sm">
                  Scale Up Time (24h format)
                </Label>
                <Input
                  id="scale-up-time"
                  type="time"
                  value={schedulingConfig.scaleUpTime}
                  onChange={(e) => onSchedulingConfigChange('scaleUpTime', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="scale-down-time" className="text-sm">
                  Scale Down Time (24h format)
                </Label>
                <Input
                  id="scale-down-time"
                  type="time"
                  value={schedulingConfig.scaleDownTime}
                  onChange={(e) => onSchedulingConfigChange('scaleDownTime', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="scale-up-days" className="text-sm">
                  Scale Up Days
                </Label>
                <Select
                  value={schedulingConfig.scaleUpDays}
                  onValueChange={(value) => onSchedulingConfigChange('scaleUpDays', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MON-FRI">Monday to Friday</SelectItem>
                    <SelectItem value="MON-SAT">Monday to Saturday</SelectItem>
                    <SelectItem value="*">Every Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="scale-down-days" className="text-sm">
                  Scale Down Days
                </Label>
                <Select
                  value={schedulingConfig.scaleDownDays}
                  onValueChange={(value) => onSchedulingConfigChange('scaleDownDays', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MON-FRI">Monday to Friday</SelectItem>
                    <SelectItem value="MON-SAT">Monday to Saturday</SelectItem>
                    <SelectItem value="*">Every Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="enable-lambda-scheduler"
                checked={schedulingConfig.enableLambdaScheduler}
                onCheckedChange={(checked) => onSchedulingConfigChange('enableLambdaScheduler', checked)}
              />
              <Label htmlFor="enable-lambda-scheduler" className="text-sm">
                {getSchedulerLabel()}
              </Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceSchedulingConfig;
