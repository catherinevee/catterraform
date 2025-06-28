
import React, { useState } from 'react';
import VpcConfigSection from './VpcConfigSection';
import TransitGatewayConfig from './TransitGatewayConfig';
import NetworkSecurityConfig from './NetworkSecurityConfig';
import NetworkAccessControlConfig from './NetworkAccessControlConfig';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

interface NetworkingConfigProps {
  onConfigChange: (field: string, value: any) => void;
  cloudProvider?: string;
}

interface VpcConfig {
  id: string;
  name: string;
  cidr: string;
  publicSubnetCidr: string;
  privateSubnetCidr: string;
}

const NetworkingConfig: React.FC<NetworkingConfigProps> = ({ onConfigChange, cloudProvider = 'aws' }) => {
  const [vpcs, setVpcs] = useState<VpcConfig[]>([
    {
      id: '1',
      name: 'main-vpc',
      cidr: '10.0.0.0/16',
      publicSubnetCidr: '10.0.1.0/24',
      privateSubnetCidr: '10.0.2.0/24'
    }
  ]);
  const [enableTransitGateway, setEnableTransitGateway] = useState(false);
  const [useTfModule, setUseTfModule] = useState(false);

  const addVpc = () => {
    const newVpc: VpcConfig = {
      id: Date.now().toString(),
      name: `vpc-${vpcs.length + 1}`,
      cidr: `10.${vpcs.length}.0.0/16`,
      publicSubnetCidr: `10.${vpcs.length}.1.0/24`,
      privateSubnetCidr: `10.${vpcs.length}.2.0/24`
    };
    const updatedVpcs = [...vpcs, newVpc];
    setVpcs(updatedVpcs);
    onConfigChange('vpcs', updatedVpcs);
  };

  const removeVpc = (id: string) => {
    if (vpcs.length > 1) {
      const updatedVpcs = vpcs.filter(vpc => vpc.id !== id);
      setVpcs(updatedVpcs);
      onConfigChange('vpcs', updatedVpcs);
    }
  };

  const updateVpc = (id: string, field: keyof VpcConfig, value: string) => {
    const updatedVpcs = vpcs.map(vpc => 
      vpc.id === id ? { ...vpc, [field]: value } : vpc
    );
    setVpcs(updatedVpcs);
    onConfigChange('vpcs', updatedVpcs);
  };

  const handleTransitGatewayChange = (enabled: boolean) => {
    setEnableTransitGateway(enabled);
    onConfigChange('transitGateway', enabled);
  };

  const handleTfModuleChange = (checked: boolean) => {
    setUseTfModule(checked);
    onConfigChange('useTfModule', checked);
  };

  const isAws = cloudProvider === 'aws';
  const networkResourceName = isAws ? 'VPC' : 'VNet';
  const transitResourceName = isAws ? 'Transit Gateway' : 'Virtual Hub';

  return (
    <div className="mb-8">
      <h3 className="text-md font-medium text-gray-700 mb-4">Network Resources</h3>
      
      {isAws && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox
              id="useTfModule"
              checked={useTfModule}
              onCheckedChange={handleTfModuleChange}
            />
            <Label htmlFor="useTfModule" className="text-sm font-medium">
              Use TF Module for VPCs?
            </Label>
          </div>
          
          {useTfModule && (
            <div className="mt-3">
              <a
                href="https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest"
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
      
      <div className="space-y-4">
        <VpcConfigSection
          vpcs={vpcs}
          onAddVpc={addVpc}
          onRemoveVpc={removeVpc}
          onUpdateVpc={updateVpc}
          networkResourceName={networkResourceName}
        />

        <TransitGatewayConfig
          enableTransitGateway={enableTransitGateway}
          onTransitGatewayChange={handleTransitGatewayChange}
          onConfigChange={onConfigChange}
          isAws={isAws}
          transitResourceName={transitResourceName}
        />
        
        <NetworkSecurityConfig
          onConfigChange={onConfigChange}
          networkResourceName={networkResourceName}
        />
        
        <NetworkAccessControlConfig
          onConfigChange={onConfigChange}
        />
      </div>
    </div>
  );
};

export default NetworkingConfig;
