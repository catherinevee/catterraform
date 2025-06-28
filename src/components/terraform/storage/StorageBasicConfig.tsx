
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StorageBasicConfigProps {
  cloudProvider: string;
  onConfigChange: (field: string, value: any) => void;
}

const StorageBasicConfig: React.FC<StorageBasicConfigProps> = ({
  cloudProvider,
  onConfigChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="bucketName" className="text-sm">Bucket/Container Name</Label>
        <Input
          id="bucketName"
          placeholder="my-storage-bucket"
          onChange={(e) => onConfigChange('name', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="storageClass" className="text-sm">Storage Class</Label>
        <Select onValueChange={(value) => onConfigChange('storageClass', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select storage class" />
          </SelectTrigger>
          <SelectContent>
            {cloudProvider === 'aws' && (
              <>
                <SelectItem value="STANDARD">Standard</SelectItem>
                <SelectItem value="STANDARD_IA">Standard-IA</SelectItem>
                <SelectItem value="GLACIER">Glacier</SelectItem>
                <SelectItem value="DEEP_ARCHIVE">Glacier Deep Archive</SelectItem>
              </>
            )}
            {cloudProvider === 'azure' && (
              <>
                <SelectItem value="Hot">Hot</SelectItem>
                <SelectItem value="Cool">Cool</SelectItem>
                <SelectItem value="Archive">Archive</SelectItem>
              </>
            )}
            {cloudProvider === 'gcp' && (
              <>
                <SelectItem value="STANDARD">Standard</SelectItem>
                <SelectItem value="NEARLINE">Nearline</SelectItem>
                <SelectItem value="COLDLINE">Coldline</SelectItem>
                <SelectItem value="ARCHIVE">Archive</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StorageBasicConfig;
