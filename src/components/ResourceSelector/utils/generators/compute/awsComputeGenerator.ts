
import { generateAwsEc2Resources } from './awsEc2Generator';
import { generateAwsEksResources } from './awsEksGenerator';
import { generateAwsComputeNetworkingResources } from './awsComputeNetworkingGenerator';
import { generateAwsComputeVariables } from './awsComputeVariablesGenerator';

export const generateAwsComputeResources = (selectedComputeTypes?: string[]): string => {
  let code = `# AWS Compute Resources

`;

  // Add shared networking resources
  code += generateAwsComputeNetworkingResources();

  // Add EC2 resources (basic compute)
  code += generateAwsEc2Resources();

  // Add EKS resources if virtualization is selected
  if (selectedComputeTypes && selectedComputeTypes.includes('virtualization')) {
    code += generateAwsEksResources();
  }

  // Add common variables
  code += generateAwsComputeVariables();

  return code;
};
