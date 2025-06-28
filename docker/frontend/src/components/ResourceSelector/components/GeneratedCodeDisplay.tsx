
import React from 'react';
import { TabbedCodeDisplay } from './TabbedCodeDisplay';
import { CodeSections } from '../utils/codeGenerator';

interface GeneratedCodeDisplayProps {
  codeSections: CodeSections;
  selectedStandardCategories: string[];
}

export const GeneratedCodeDisplay = ({
  codeSections,
  selectedStandardCategories
}: GeneratedCodeDisplayProps) => {
  return (
    <div className="border-2 rounded-lg overflow-hidden" style={{ borderColor: '#6653e3' }}>
      <div className="px-4 py-3 border-b-2 flex items-center justify-between" style={{ backgroundColor: '#f0efff', borderColor: '#6653e3' }}>
        <h3 className="text-lg font-semibold" style={{ color: '#4a3bc7' }}>
          Generated Terraform Code {selectedStandardCategories.length > 0 ? `(${selectedStandardCategories.length} components)` : '(Configuration Only)'}
        </h3>
      </div>
      
      <div className="p-4">
        <TabbedCodeDisplay codeSections={codeSections} />
      </div>
    </div>
  );
};
