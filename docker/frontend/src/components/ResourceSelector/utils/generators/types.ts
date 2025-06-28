
export interface VersionConfig {
  terraformVersion: string;
  awsProviderVersion: string;
  azureProviderVersion: string;
}

export interface MultiTenantConfig {
  enabled: boolean;
  aliasValuePairs: Array<{
    id: string;
    alias: string;
    value: string;
  }>;
}

export interface CodeSections {
  versions: string;
  variables: string;
  resources: string;
  outputs: string;
  full: string;
}

export interface GeneratorConfig {
  selectedResources: string[];
  versionConfig?: VersionConfig;
  userDefinedVariables?: string;
  enforceTagging?: boolean;
  multiTenantConfig?: MultiTenantConfig;
}
