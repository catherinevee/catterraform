
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface VpcConfig {
  id: string;
  name: string;
  cidr: string;
  publicSubnetCidr: string;
  privateSubnetCidr: string;
}

interface VpcConfigSectionProps {
  vpcs: VpcConfig[];
  onAddVpc: () => void;
  onRemoveVpc: (id: string) => void;
  onUpdateVpc: (id: string, field: keyof VpcConfig, value: string) => void;
  networkResourceName: string;
}

const VpcConfigSection: React.FC<VpcConfigSectionProps> = ({
  vpcs,
  onAddVpc,
  onRemoveVpc,
  onUpdateVpc,
  networkResourceName
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-600">{networkResourceName} Configuration</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddVpc}
          className="flex items-center space-x-1"
        >
          <Plus className="w-4 h-4" />
          <span>Add {networkResourceName}</span>
        </Button>
      </div>

      {vpcs.map((vpc, index) => (
        <div key={vpc.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-gray-700">{networkResourceName} {index + 1}</h5>
            {vpcs.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemoveVpc(vpc.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor={`vpcName-${vpc.id}`} className="text-sm">{networkResourceName} Name</Label>
              <Input
                id={`vpcName-${vpc.id}`}
                value={vpc.name}
                onChange={(e) => onUpdateVpc(vpc.id, 'name', e.target.value)}
                placeholder="Enter VPC name"
              />
            </div>
            
            <div>
              <Label htmlFor={`vpcCidr-${vpc.id}`} className="text-sm">{networkResourceName} CIDR Block</Label>
              <Input
                id={`vpcCidr-${vpc.id}`}
                value={vpc.cidr}
                onChange={(e) => onUpdateVpc(vpc.id, 'cidr', e.target.value)}
                placeholder="10.0.0.0/16"
              />
            </div>
            
            <div>
              <Label htmlFor={`publicSubnet-${vpc.id}`} className="text-sm">Public Subnet CIDR</Label>
              <Input
                id={`publicSubnet-${vpc.id}`}
                value={vpc.publicSubnetCidr}
                onChange={(e) => onUpdateVpc(vpc.id, 'publicSubnetCidr', e.target.value)}
                placeholder="10.0.1.0/24"
              />
            </div>
            
            <div>
              <Label htmlFor={`privateSubnet-${vpc.id}`} className="text-sm">Private Subnet CIDR</Label>
              <Input
                id={`privateSubnet-${vpc.id}`}
                value={vpc.privateSubnetCidr}
                onChange={(e) => onUpdateVpc(vpc.id, 'privateSubnetCidr', e.target.value)}
                placeholder="10.0.2.0/24"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VpcConfigSection;
