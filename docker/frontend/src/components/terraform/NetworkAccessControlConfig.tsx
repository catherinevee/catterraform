
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NetworkAccessControlConfigProps {
  onConfigChange: (field: string, value: any) => void;
}

const NetworkAccessControlConfig: React.FC<NetworkAccessControlConfigProps> = ({
  onConfigChange
}) => {
  return (
    <div className="border-t pt-4 mt-4">
      <h4 className="text-sm font-medium text-gray-600 mb-3">Access Control & Monitoring</h4>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="enablePrivateEndpoints"
            onCheckedChange={(checked) => onConfigChange('privateEndpoints', checked)}
          />
          <Label htmlFor="enablePrivateEndpoints" className="text-sm">Enable Private Endpoints</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableNetworkACLs"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('networkACLs', checked)}
          />
          <Label htmlFor="enableNetworkACLs" className="text-sm">Enable Network ACLs</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableTLS"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('enforceHTTPS', checked)}
          />
          <Label htmlFor="enableTLS" className="text-sm">Enforce HTTPS/TLS</Label>
        </div>
        
        <div>
          <Label htmlFor="securityGroupDefault" className="text-sm">Default Security Group Policy</Label>
          <Select onValueChange={(value) => onConfigChange('defaultSecurityPolicy', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select default policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deny-all">Deny All (Most Secure)</SelectItem>
              <SelectItem value="minimal">Minimal Required Access</SelectItem>
              <SelectItem value="standard">Standard Web Application</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="trustedCIDRs" className="text-sm">Trusted IP Ranges (comma-separated)</Label>
          <Input
            id="trustedCIDRs"
            placeholder="10.0.0.0/8, 192.168.0.0/16"
            onChange={(e) => onConfigChange('trustedCIDRs', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkAccessControlConfig;
