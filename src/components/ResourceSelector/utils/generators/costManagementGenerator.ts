
import { generateAwsCostManagementResources } from './costManagement/awsCostManagementGenerator';
import { generateAzureCostManagementResources } from './costManagement/azureCostManagementGenerator';

export const generateCostManagementResources = (selectedProviders: string[]): string => {
  let code = '';
  
  if (selectedProviders.includes('aws')) {
    code += generateAwsCostManagementResources();
  }
  
  if (selectedProviders.includes('azure')) {
    code += generateAzureCostManagementResources();
  }

  return code;
};
