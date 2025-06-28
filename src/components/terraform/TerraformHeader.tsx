
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface TerraformHeaderProps {
  projectName: string;
  cloudProvider: string;
  selectedResources: string[];
  onBack: () => void;
  onDownloadFiles: () => void;
  hasGeneratedCode: boolean;
}

const TerraformHeader: React.FC<TerraformHeaderProps> = ({
  projectName,
  cloudProvider,
  selectedResources,
  onBack,
  onDownloadFiles,
  hasGeneratedCode
}) => {
  return (
    <div className="border-b border-gray-200 sticky top-0 z-10" style={{ backgroundColor: '#5f4ecc' }}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center space-x-2 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-white">
                {projectName} - {cloudProvider.toUpperCase()}
              </h1>
              <p className="text-sm text-purple-100">
                Resources: {selectedResources.join(', ')}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            {hasGeneratedCode && (
              <Button
                onClick={onDownloadFiles}
                variant="outline"
                className="bg-white hover:bg-gray-50"
              >
                Download HCL Files
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerraformHeader;
