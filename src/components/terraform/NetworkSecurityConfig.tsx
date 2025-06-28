
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NetworkSecurityConfigProps {
  onConfigChange: (field: string, value: any) => void;
  networkResourceName: string;
}

const NetworkSecurityConfig: React.FC<NetworkSecurityConfigProps> = ({
  onConfigChange,
  networkResourceName
}) => {
  return (
    <div className="border-t pt-4 mt-6">
      <h4 className="text-sm font-medium text-gray-600 mb-3">Network Security</h4>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="enableNatGateway"
            onCheckedChange={(checked) => onConfigChange('natGateway', checked)}
          />
          <Label htmlFor="enableNatGateway" className="text-sm">Enable NAT Gateway</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableFlowLogs"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('flowLogs', checked)}
          />
          <Label htmlFor="enableFlowLogs" className="text-sm">Enable {networkResourceName} Flow Logs</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableWAF"
            onCheckedChange={(checked) => onConfigChange('waf', checked)}
          />
          <Label htmlFor="enableWAF" className="text-sm">Enable Web Application Firewall</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableDDoSProtection"
            onCheckedChange={(checked) => onConfigChange('ddosProtection', checked)}
          />
          <Label htmlFor="enableDDoSProtection" className="text-sm">Enable DDoS Protection</Label>
        </div>
      </div>
    </div>
  );
};

export default NetworkSecurityConfig;
