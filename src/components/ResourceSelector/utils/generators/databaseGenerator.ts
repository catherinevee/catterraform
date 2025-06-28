
import { generateAwsDynamoDbResources } from './database/awsDatabaseGenerator';
import { generateAzureDatabaseResources } from './database/azureDatabaseGenerator';

export const generateDatabaseResources = (selectedProviders: string[]): string => {
  let code = '';
  
  if (selectedProviders.includes('azure')) {
    code += generateAzureDatabaseResources();
  }
  
  if (selectedProviders.includes('aws')) {
    code += generateAwsDynamoDbResources();
  }

  return code;
};
