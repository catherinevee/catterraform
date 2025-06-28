
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StorageAccessConfigProps {
  onConfigChange: (field: string, value: any) => void;
}

const StorageAccessConfig: React.FC<StorageAccessConfigProps> = ({
  onConfigChange
}) => {
  return (
    <div className="border-t pt-4 mt-4">
      <h4 className="text-sm font-medium text-gray-600 mb-3">Access Control & Compliance</h4>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="enableAccessLogging"
            onCheckedChange={(checked) => onConfigChange('accessLogging', checked)}
          />
          <Label htmlFor="enableAccessLogging" className="text-sm">Enable Access Logging</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableObjectLock"
            onCheckedChange={(checked) => onConfigChange('objectLock', checked)}
          />
          <Label htmlFor="enableObjectLock" className="text-sm">Enable Object Lock (WORM)</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableNotifications"
            onCheckedChange={(checked) => onConfigChange('notifications', checked)}
          />
          <Label htmlFor="enableNotifications" className="text-sm">Enable Event Notifications</Label>
        </div>
        
        <div>
          <Label htmlFor="lifecyclePolicy" className="text-sm">Data Lifecycle Policy</Label>
          <Select onValueChange={(value) => onConfigChange('lifecyclePolicy', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select lifecycle policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aggressive">Aggressive (30-90-365 days)</SelectItem>
              <SelectItem value="moderate">Moderate (90-180-730 days)</SelectItem>
              <SelectItem value="conservative">Conservative (180-365-730 days)</SelectItem>
              <SelectItem value="none">No automatic transitions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default StorageAccessConfig;
