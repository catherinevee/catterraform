
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ResourceNamingConventionProps {
  onConfigChange: (config: {
    organization: string;
    projectName: string;
    environment: string;
    namingConvention: string;
    customPattern?: string;
  }) => void;
}

export const ResourceNamingConvention = ({ onConfigChange }: ResourceNamingConventionProps) => {
  const [organization, setOrganization] = useState('');
  const [projectName, setProjectName] = useState('');
  const [environment, setEnvironment] = useState('');
  const [selectedConvention, setSelectedConvention] = useState('');
  const [customPattern, setCustomPattern] = useState('');

  const namingConventions = [
    { value: 'kebab-case', label: 'kebab-case', example: 'org-project-env-resource' },
    { value: 'snake_case', label: 'snake_case', example: 'org_project_env_resource' },
    { value: 'PascalCase', label: 'PascalCase', example: 'OrgProjectEnvResource' },
    { value: 'camelCase', label: 'camelCase', example: 'orgProjectEnvResource' },
    { value: 'prefix-kebab', label: 'Prefix with kebab-case', example: 'org-project-env-resource' },
    { value: 'custom', label: 'Custom naming convention', example: 'Define your own pattern' }
  ];

  const applyNamingConvention = (org: string, project: string, env: string, convention: string): string => {
    if (!org || !project || !env || !convention) return '';

    const parts = [org, project, env];
    
    switch (convention) {
      case 'kebab-case':
        return parts.map(part => part.toLowerCase().replace(/\s+/g, '-')).join('-');
      case 'snake_case':
        return parts.map(part => part.toLowerCase().replace(/\s+/g, '_')).join('_');
      case 'PascalCase':
        return parts.map(part => 
          part.replace(/\s+/g, '').replace(/^./, c => c.toUpperCase())
        ).join('');
      case 'camelCase':
        return parts.map((part, index) => 
          index === 0 
            ? part.toLowerCase().replace(/\s+/g, '') 
            : part.replace(/\s+/g, '').replace(/^./, c => c.toUpperCase())
        ).join('');
      case 'prefix-kebab':
        return parts.map(part => part.toLowerCase().replace(/\s+/g, '-')).join('-');
      case 'custom':
        if (customPattern) {
          return customPattern
            .replace(/{organization}/g, org)
            .replace(/{project}/g, project)
            .replace(/{environment}/g, env);
        }
        return '';
      default:
        return '';
    }
  };

  const updateConfig = (updates: Partial<{
    organization: string;
    projectName: string;
    environment: string;
    namingConvention: string;
    customPattern: string;
  }>) => {
    const newOrg = updates.organization ?? organization;
    const newProject = updates.projectName ?? projectName;
    const newEnv = updates.environment ?? environment;
    const newConvention = updates.namingConvention ?? selectedConvention;
    const newCustomPattern = updates.customPattern ?? customPattern;

    const appliedNaming = applyNamingConvention(newOrg, newProject, newEnv, newConvention);

    const newConfig = {
      organization: newOrg,
      projectName: newProject,
      environment: newEnv,
      namingConvention: appliedNaming,
      customPattern: newCustomPattern
    };

    onConfigChange(newConfig);
  };

  const handleOrganizationChange = (value: string) => {
    setOrganization(value);
    updateConfig({ organization: value });
  };

  const handleProjectNameChange = (value: string) => {
    setProjectName(value);
    updateConfig({ projectName: value });
  };

  const handleEnvironmentChange = (value: string) => {
    setEnvironment(value);
    updateConfig({ environment: value });
  };

  const handleConventionChange = (value: string) => {
    setSelectedConvention(value);
    updateConfig({ namingConvention: value });
  };

  const handleCustomPatternChange = (value: string) => {
    setCustomPattern(value);
    updateConfig({ customPattern: value });
  };

  const currentNamingExample = applyNamingConvention(
    organization || 'acme-corp', 
    projectName || 'web-app', 
    environment || 'production', 
    selectedConvention
  );

  return (
    <div className="border-2 rounded-lg p-4" style={{ borderColor: '#6653e3' }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: '#4a3bc7' }}>
        Resource Naming Convention
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="organization" className="text-sm font-medium" style={{ color: '#4a3bc7' }}>
            Organization
          </Label>
          <Input
            id="organization"
            type="text"
            placeholder="acme-corp"
            value={organization}
            onChange={(e) => handleOrganizationChange(e.target.value)}
            className="border-2 mt-1"
            style={{ borderColor: '#6653e3' }}
          />
        </div>
        
        <div>
          <Label htmlFor="projectName" className="text-sm font-medium" style={{ color: '#4a3bc7' }}>
            Project Name
          </Label>
          <Input
            id="projectName"
            type="text"
            placeholder="web-app"
            value={projectName}
            onChange={(e) => handleProjectNameChange(e.target.value)}
            className="border-2 mt-1"
            style={{ borderColor: '#6653e3' }}
          />
        </div>
        
        <div>
          <Label htmlFor="environment" className="text-sm font-medium" style={{ color: '#4a3bc7' }}>
            Environment
          </Label>
          <Input
            id="environment"
            type="text"
            placeholder="production"
            value={environment}
            onChange={(e) => handleEnvironmentChange(e.target.value)}
            className="border-2 mt-1"
            style={{ borderColor: '#6653e3' }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="namingConvention" className="text-sm font-medium" style={{ color: '#4a3bc7' }}>
            Naming Convention
          </Label>
          <Select onValueChange={handleConventionChange}>
            <SelectTrigger className="border-2 mt-1" style={{ borderColor: '#6653e3' }}>
              <SelectValue placeholder="Select naming convention" />
            </SelectTrigger>
            <SelectContent>
              {namingConventions.map((convention) => (
                <SelectItem key={convention.value} value={convention.value}>
                  <div>
                    <div className="font-medium">{convention.label}</div>
                    <div className="text-xs text-gray-500">{convention.example}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedConvention === 'custom' && (
          <div>
            <Label htmlFor="customPattern" className="text-sm font-medium" style={{ color: '#4a3bc7' }}>
              Custom Naming Pattern
            </Label>
            <Input
              id="customPattern"
              type="text"
              placeholder="e.g., {organization}-{project}-{environment}-{resource}"
              value={customPattern}
              onChange={(e) => handleCustomPatternChange(e.target.value)}
              className="border-2 mt-1"
              style={{ borderColor: '#6653e3' }}
            />
            <p className="text-xs text-gray-500 mt-1">
              Use placeholders like {"{organization}"}, {"{project}"}, {"{environment}"}, {"{resource}"} for dynamic values
            </p>
          </div>
        )}

        {currentNamingExample && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <Label className="text-sm font-medium text-gray-700">Preview:</Label>
            <p className="text-sm font-mono mt-1" style={{ color: '#4a3bc7' }}>
              {currentNamingExample}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
