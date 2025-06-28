import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AzureRemoteStateConfigProps {
  onConfigChange: (field: string, value: any) => void;
}

const AzureRemoteStateConfig: React.FC<AzureRemoteStateConfigProps> = ({
  onConfigChange
}) => {
  const [resourceGroupName, setResourceGroupName] = useState('polandcentralrg-1');
  const [storageAccountName, setStorageAccountName] = useState('tfstatecfriy');
  const [containerName, setContainerName] = useState('tfstate-container');
  const [region, setRegion] = useState('polandcentral');
  const [useOidc, setUseOidc] = useState(true);
  const [showCustomRegion, setShowCustomRegion] = useState(false);
  const [customRegion, setCustomRegion] = useState('');

  const azureRegions = [
    'eastus', 'eastus2', 'southcentralus', 'westus2', 'westus3', 'australiaeast', 
    'southeastasia', 'northeurope', 'swedencentral', 'uksouth', 'westeurope', 
    'centralus', 'southafricanorth', 'centralindia', 'eastasia', 'japaneast', 
    'koreacentral', 'canadacentral', 'francecentral', 'germanywestcentral', 
    'italynorth', 'norwayeast', 'polandcentral', 'spaincentral', 'switzerlandnorth', 
    'mexicocentral', 'uaenorth', 'brazilsouth', 'israelcentral', 'qatarcentral', 
    'centralusstage', 'eastusstage', 'eastus2stage', 'northcentralusstage', 
    'southcentralusstage', 'westusstage', 'westus2stage', 'asia', 'asiapacific', 
    'australia', 'brazil', 'canada', 'europe', 'france', 'germany', 'global', 
    'india', 'israel', 'italy', 'japan', 'korea', 'newzealand', 'norway', 
    'poland', 'qatar', 'singapore', 'southafrica', 'sweden', 'switzerland', 
    'uae', 'uk', 'unitedstates', 'unitedstateseuap', 'eastasiastage', 
    'southeastasiastage', 'brazilus', 'eastusstg', 'northcentralus', 'westus', 
    'japanwest', 'jioindiawest', 'centraluseuap', 'eastus2euap', 'westcentralus', 
    'southafricawest', 'australiacentral', 'australiacentral2', 'australiasoutheast', 
    'jioindiacentral', 'koreasouth', 'southindia', 'westindia', 'canadaeast', 
    'francesouth', 'germanynorth', 'norwaywest', 'switzerlandwest', 'ukwest', 
    'uaecentral', 'brazilsoutheast'
  ];

  // Initialize with default values
  useEffect(() => {
    onConfigChange('resourceGroupName', resourceGroupName);
    onConfigChange('storageAccountName', storageAccountName);
    onConfigChange('containerName', containerName);
    onConfigChange('region', region);
    onConfigChange('useOidc', useOidc);
  }, []);

  const handleResourceGroupChange = (value: string) => {
    setResourceGroupName(value);
    onConfigChange('resourceGroupName', value);
  };

  const handleStorageAccountChange = (value: string) => {
    setStorageAccountName(value);
    onConfigChange('storageAccountName', value);
  };

  const handleContainerChange = (value: string) => {
    setContainerName(value);
    onConfigChange('containerName', value);
  };

  const handleRegionChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomRegion(true);
    } else {
      setShowCustomRegion(false);
      setCustomRegion('');
      setRegion(value);
      onConfigChange('region', value);
    }
  };

  const handleCustomRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomRegion(value);
    setRegion(value);
    onConfigChange('region', value);
  };

  const handleOidcChange = (checked: boolean) => {
    setUseOidc(checked);
    onConfigChange('useOidc', checked);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Azure Remote State Configuration</h3>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="resource-group-name" className="text-sm font-medium text-gray-700">
            Resource Group Name
          </Label>
          <Input
            id="resource-group-name"
            type="text"
            placeholder="polandcentralrg-1"
            value={resourceGroupName}
            onChange={(e) => handleResourceGroupChange(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="storage-account-name" className="text-sm font-medium text-gray-700">
            Storage Account Name
          </Label>
          <Input
            id="storage-account-name"
            type="text"
            placeholder="tfstatecfriy"
            value={storageAccountName}
            onChange={(e) => handleStorageAccountChange(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="container-name" className="text-sm font-medium text-gray-700">
            Container Name
          </Label>
          <Input
            id="container-name"
            type="text"
            placeholder="tfstate-container"
            value={containerName}
            onChange={(e) => handleContainerChange(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="region" className="text-sm font-medium text-gray-700">
            Region
          </Label>
          <div className="mt-1 space-y-2">
            <Select onValueChange={handleRegionChange} defaultValue="polandcentral">
              <SelectTrigger>
                <SelectValue placeholder="Select an Azure region" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {azureRegions.map((regionOption) => (
                  <SelectItem key={regionOption} value={regionOption}>
                    {regionOption}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom region...</SelectItem>
              </SelectContent>
            </Select>
            {showCustomRegion && (
              <Input
                type="text"
                placeholder="Enter custom region"
                value={customRegion}
                onChange={handleCustomRegionChange}
              />
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="use-oidc"
            checked={useOidc}
            onCheckedChange={handleOidcChange}
          />
          <Label htmlFor="use-oidc" className="text-sm font-medium text-gray-700">
            Use OIDC
          </Label>
        </div>
      </div>
    </div>
  );
};

export default AzureRemoteStateConfig;
