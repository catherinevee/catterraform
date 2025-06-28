
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink } from "lucide-react";

interface TransitGatewayConfigProps {
  enableTransitGateway: boolean;
  onTransitGatewayChange: (enabled: boolean) => void;
  onConfigChange: (field: string, value: any) => void;
  isAws: boolean;
  transitResourceName: string;
}

const TransitGatewayConfig: React.FC<TransitGatewayConfigProps> = ({
  enableTransitGateway,
  onTransitGatewayChange,
  onConfigChange,
  isAws,
  transitResourceName
}) => {
  const [useTgwModule, setUseTgwModule] = React.useState(false);

  const handleTgwModuleChange = (checked: boolean) => {
    setUseTgwModule(checked);
    onConfigChange('useTgwModule', checked);
  };

  return (
    <div className="border-t pt-4 mt-6">
      <h4 className="text-sm font-medium text-gray-600 mb-3">Inter-VPC/VNet Connectivity</h4>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="enableTransitGateway"
            checked={enableTransitGateway}
            onCheckedChange={onTransitGatewayChange}
          />
          <Label htmlFor="enableTransitGateway" className="text-sm">
            Enable {transitResourceName}
          </Label>
        </div>
        
        {enableTransitGateway && (
          <div className="ml-6 space-y-3 border-l-2 border-blue-200 pl-4">
            <p className="text-xs text-gray-600">
              {isAws 
                ? "Transit Gateway will enable routing between all VPCs and on-premises networks."
                : "Virtual Hub will provide centralized connectivity for all VNets and hybrid connections."
              }
            </p>

            {isAws && (
              <div className="p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="useTgwModule"
                    checked={useTgwModule}
                    onCheckedChange={handleTgwModuleChange}
                  />
                  <Label htmlFor="useTgwModule" className="text-sm font-medium">
                    Use TF Module for TGW?
                  </Label>
                </div>
                
                {useTgwModule && (
                  <div className="mt-3">
                    <a
                      href="https://registry.terraform.io/modules/terraform-aws-modules/transit-gateway/aws/latest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Module Source
                    </a>
                  </div>
                )}
              </div>
            )}
            
            <div>
              <Label className="text-sm">{transitResourceName} ASN (Optional)</Label>
              <Input
                placeholder={isAws ? "64512" : "65515"}
                onChange={(e) => onConfigChange('transitGatewayAsn', e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="enableVpnConnection"
                onCheckedChange={(checked) => onConfigChange('enableVpnConnection', checked)}
              />
              <Label htmlFor="enableVpnConnection" className="text-sm">
                Enable VPN Connection
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="enableDirectConnect"
                onCheckedChange={(checked) => onConfigChange('enableDirectConnect', checked)}
              />
              <Label htmlFor="enableDirectConnect" className="text-sm">
                Enable {isAws ? 'Direct Connect' : 'ExpressRoute'}
              </Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransitGatewayConfig;
