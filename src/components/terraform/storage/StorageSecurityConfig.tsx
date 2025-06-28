
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StorageSecurityConfigProps {
  onConfigChange: (field: string, value: any) => void;
}

const StorageSecurityConfig: React.FC<StorageSecurityConfigProps> = ({
  onConfigChange
}) => {
  return (
    <div className="border-t pt-4 mt-6">
      <h4 className="text-sm font-medium text-gray-600 mb-3">Security Configuration</h4>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="enableEncryption"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('encryption', checked)}
          />
          <Label htmlFor="enableEncryption" className="text-sm">Enable Encryption at Rest</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableVersioning"
            onCheckedChange={(checked) => onConfigChange('versioning', checked)}
          />
          <Label htmlFor="enableVersioning" className="text-sm">Enable Versioning</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="blockPublicAccess"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('blockPublicAccess', checked)}
          />
          <Label htmlFor="blockPublicAccess" className="text-sm">Block All Public Access</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableMFA"
            onCheckedChange={(checked) => onConfigChange('mfaDelete', checked)}
          />
          <Label htmlFor="enableMFA" className="text-sm">Require MFA for Delete Operations</Label>
        </div>
        
        <div>
          <Label htmlFor="encryptionKey" className="text-sm">Encryption Key Management</Label>
          <Select onValueChange={(value) => onConfigChange('encryptionKeyType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select encryption method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sse-s3">Server-Side Encryption (SSE-S3)</SelectItem>
              <SelectItem value="sse-kms">Customer Managed Keys (KMS)</SelectItem>
              <SelectItem value="sse-c">Customer Provided Keys (SSE-C)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default StorageSecurityConfig;
