
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatabaseAccessConfigProps {
  onConfigChange: (field: string, value: any) => void;
}

const DatabaseAccessConfig: React.FC<DatabaseAccessConfigProps> = ({ onConfigChange }) => {
  return (
    <div className="border-t pt-4 mt-4">
      <h4 className="text-sm font-medium text-gray-600 mb-3">Access Control & Monitoring</h4>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="enableLogging"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('enableLogging', checked)}
          />
          <Label htmlFor="enableLogging" className="text-sm">Enable Database Logging</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableMonitoring"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('enhancedMonitoring', checked)}
          />
          <Label htmlFor="enableMonitoring" className="text-sm">Enable Enhanced Monitoring</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enablePerformanceInsights"
            onCheckedChange={(checked) => onConfigChange('performanceInsights', checked)}
          />
          <Label htmlFor="enablePerformanceInsights" className="text-sm">Enable Performance Insights</Label>
        </div>
        
        <div>
          <Label htmlFor="networkAccessControl" className="text-sm">Network Access Control</Label>
          <Select onValueChange={(value) => onConfigChange('publiclyAccessible', value === 'public')}>
            <SelectTrigger>
              <SelectValue placeholder="Select access level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private (VPC Only)</SelectItem>
              <SelectItem value="public">Public (Internet Accessible)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="allowedCIDRs" className="text-sm">Allowed IP Ranges (comma-separated)</Label>
          <Input
            id="allowedCIDRs"
            placeholder="10.0.0.0/8, 192.168.0.0/16"
            onChange={(e) => onConfigChange('allowedCIDRs', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseAccessConfig;
