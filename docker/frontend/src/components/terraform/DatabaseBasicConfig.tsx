
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DatabaseBasicConfigProps {
  cloudProvider: string;
  onConfigChange: (field: string, value: any) => void;
}

const DatabaseBasicConfig: React.FC<DatabaseBasicConfigProps> = ({ cloudProvider, onConfigChange }) => {
  const getDatabaseEngines = () => {
    switch (cloudProvider) {
      case 'aws':
        return ['mysql', 'postgresql', 'mariadb', 'oracle-ee', 'sqlserver-ee'];
      case 'azure':
        return ['mysql', 'postgresql', 'mariadb'];
      case 'gcp':
        return ['mysql', 'postgresql'];
      default:
        return ['mysql', 'postgresql'];
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="dbEngine" className="text-sm">Database Engine</Label>
        <Select onValueChange={(value) => onConfigChange('engine', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select database engine" />
          </SelectTrigger>
          <SelectContent>
            {getDatabaseEngines().map((engine) => (
              <SelectItem key={engine} value={engine}>
                {engine.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="dbInstanceClass" className="text-sm">Instance Class</Label>
        <Select onValueChange={(value) => onConfigChange('instanceClass', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select instance class" />
          </SelectTrigger>
          <SelectContent>
            {cloudProvider === 'aws' && (
              <>
                <SelectItem value="db.t3.micro">db.t3.micro</SelectItem>
                <SelectItem value="db.t3.small">db.t3.small</SelectItem>
                <SelectItem value="db.r5.large">db.r5.large</SelectItem>
              </>
            )}
            {cloudProvider === 'azure' && (
              <>
                <SelectItem value="B_Gen5_1">B_Gen5_1</SelectItem>
                <SelectItem value="GP_Gen5_2">GP_Gen5_2</SelectItem>
                <SelectItem value="MO_Gen5_4">MO_Gen5_4</SelectItem>
              </>
            )}
            {cloudProvider === 'gcp' && (
              <>
                <SelectItem value="db-f1-micro">db-f1-micro</SelectItem>
                <SelectItem value="db-g1-small">db-g1-small</SelectItem>
                <SelectItem value="db-n1-standard-1">db-n1-standard-1</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="allocatedStorage" className="text-sm">Allocated Storage (GB)</Label>
        <Input
          id="allocatedStorage"
          type="number"
          placeholder="20"
          onChange={(e) => onConfigChange('allocatedStorage', parseInt(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="backupRetention" className="text-sm">Backup Retention (Days)</Label>
        <Input
          id="backupRetention"
          type="number"
          placeholder="7"
          onChange={(e) => onConfigChange('backupRetention', parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default DatabaseBasicConfig;
