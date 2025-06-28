
import { generateAwsStorageResources } from './storage/awsStorageGenerator';
import { generateAzureStorageResources } from './storage/azureStorageGenerator';

export const generateStorageResources = (selectedProviders: string[]): string => {
  let code = '';
  
  if (selectedProviders.includes('azure')) {
    code += generateAzureStorageResources();
  }
  
  if (selectedProviders.includes('aws')) {
    code += generateAwsStorageResources();
  }

  return code;
};
