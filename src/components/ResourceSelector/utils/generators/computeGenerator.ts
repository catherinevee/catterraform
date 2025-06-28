
import { generateAzureComputeResources } from './compute/azureComputeGenerator';
import { generateAzureContainerRegistry } from './compute/azureContainerRegistry';
import { generateAzureKubernetesService } from './compute/azureKubernetesService';
import { generateAwsComputeResources } from './compute/awsComputeGenerator';

export const generateComputeResources = (selectedProviders: string[], selectedComputeTypes?: string[]): string => {
  let code = '';
  
  if (selectedProviders.includes('azure')) {
    // Azure compute resources
    code += generateAzureComputeResources(selectedComputeTypes);
    
    // Azure Container Registry (ACR) - Always include when Azure is selected for compute/virtualization
    code += generateAzureContainerRegistry();

    // Azure Kubernetes Service (AKS) - Always include when Azure is selected for compute/virtualization
    code += generateAzureKubernetesService();
  }
  
  if (selectedProviders.includes('aws')) {
    code += generateAwsComputeResources();
  }

  return code;
};
