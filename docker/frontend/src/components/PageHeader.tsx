
import React from 'react';
import { ExampleDialog } from '@/components/ExampleDialog';
import { AwsAccountDialog } from '@/components/AwsAccountDialog';

export const PageHeader = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4" style={{ color: '#4a3bc7' }}>
        Creating Terraform Projects
      </h1>
      
      <div className="mt-8 mb-4">
        <h2 className="text-2xl font-semibold" style={{ color: '#4a3bc7' }}>
          Project Resources
        </h2>
      </div>

      <div className="mt-4 space-y-2">
        <ExampleDialog />
        <div>
          <AwsAccountDialog />
        </div>
      </div>
    </div>
  );
};
