
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface DatabaseSecurityConfigProps {
  onConfigChange: (field: string, value: any) => void;
}

const DatabaseSecurityConfig: React.FC<DatabaseSecurityConfigProps> = ({ onConfigChange }) => {
  return (
    <div className="border-t pt-4 mt-6">
      <h4 className="text-sm font-medium text-gray-600 mb-3">Database Security</h4>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="enableEncryption"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('storageEncrypted', checked)}
          />
          <Label htmlFor="enableEncryption" className="text-sm">Enable Storage Encryption</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableSSL"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('requireSSL', checked)}
          />
          <Label htmlFor="enableSSL" className="text-sm">Require SSL Connections</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableDeletionProtection"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('deletionProtection', checked)}
          />
          <Label htmlFor="enableDeletionProtection" className="text-sm">Enable Deletion Protection</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableMultiAZ"
            onCheckedChange={(checked) => onConfigChange('multiAZ', checked)}
          />
          <Label htmlFor="enableMultiAZ" className="text-sm">Enable Multi-AZ Deployment</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="enableBackupEncryption"
            defaultChecked={true}
            onCheckedChange={(checked) => onConfigChange('backupEncryption', checked)}
          />
          <Label htmlFor="enableBackupEncryption" className="text-sm">Enable Backup Encryption</Label>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSecurityConfig;
