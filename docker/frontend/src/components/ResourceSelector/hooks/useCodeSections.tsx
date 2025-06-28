
import React from 'react';
import { CodeSections } from '../utils/codeGenerator';

interface UseCodeSectionsProps {
  enhancedCode: string;
}

export const useCodeSections = ({ enhancedCode }: UseCodeSectionsProps): CodeSections => {
  return React.useMemo(() => {
    if (!enhancedCode) {
      return {
        versions: '',
        variables: '',
        resources: '',
        outputs: '',
        full: ''
      };
    }

    // Split the code into sections based on comments and structure
    const lines = enhancedCode.split('\n');
    let versionsCode = '';
    let variablesCode = '';
    let resourcesCode = '';
    let outputsCode = '';
    
    let currentSection = '';
    let inTerraformBlock = false;
    let inProviderBlock = false;
    let inVariableBlock = false;
    let inResourceBlock = false;
    let inOutputBlock = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('terraform {') || trimmedLine.startsWith('required_providers')) {
        inTerraformBlock = true;
        currentSection = 'versions';
      } else if (trimmedLine.startsWith('provider ')) {
        inProviderBlock = true;
        currentSection = 'versions';
      } else if (trimmedLine.startsWith('variable ')) {
        inVariableBlock = true;
        currentSection = 'variables';
      } else if (trimmedLine.startsWith('resource ') || trimmedLine.startsWith('data ')) {
        inResourceBlock = true;
        currentSection = 'resources';
      } else if (trimmedLine.startsWith('output ')) {
        inOutputBlock = true;
        currentSection = 'outputs';
      }
      
      // Add line to appropriate section
      switch (currentSection) {
        case 'versions':
          versionsCode += line + '\n';
          break;
        case 'variables':
          variablesCode += line + '\n';
          break;
        case 'resources':
          resourcesCode += line + '\n';
          break;
        case 'outputs':
          outputsCode += line + '\n';
          break;
        default:
          // Add to resources by default
          resourcesCode += line + '\n';
      }
      
      // Reset section flags when blocks end
      if (trimmedLine === '}' && (inTerraformBlock || inProviderBlock || inVariableBlock || inResourceBlock || inOutputBlock)) {
        inTerraformBlock = false;
        inProviderBlock = false;
        inVariableBlock = false;
        inResourceBlock = false;
        inOutputBlock = false;
      }
    }
    
    return {
      versions: versionsCode.trim(),
      variables: variablesCode.trim(),
      resources: resourcesCode.trim(),
      outputs: outputsCode.trim(),
      full: enhancedCode
    };
  }, [enhancedCode]);
};
