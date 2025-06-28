
import { generateProviderConfiguration } from './generators/providerGenerator';
import { generateNetworkingResources } from './generators/networkingGenerator';
import { generateStorageResources } from './generators/storageGenerator';
import { generateComputeResources } from './generators/computeGenerator';
import { generateDatabaseResources } from './generators/databaseGenerator';
import { generateIAMResources } from './generators/iamGenerator';
import { generateCostManagementResources } from './generators/costManagementGenerator';

// Re-export all generator functions for backward compatibility
export {
  generateProviderConfiguration,
  generateNetworkingResources,
  generateStorageResources,
  generateComputeResources,
  generateDatabaseResources,
  generateIAMResources,
  generateCostManagementResources
};
