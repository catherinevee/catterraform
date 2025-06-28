
export interface Resource {
  id: string;
  type: string;
  category: string;
  description: string;
  docs_url: string;
}

export interface ResourceSelectorProps {
  resources: Resource[];
  categories: string[];
  loading: boolean;
}

export interface MultiSelectResourceSelectorProps {
  resources: Resource[];
  categories: string[];
  loading: boolean;
}
