
import React from 'react';
import { Toolbar } from '@/components/Toolbar';
import { MultiSelectResourceSelector } from '@/components/ResourceSelector/MultiSelectResourceSelector';
import { useResourceData } from '@/hooks/useResourceData';
import { useToast } from '@/hooks/use-toast';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { PageHeader } from '@/components/PageHeader';

const Index = () => {
  const {
    resources,
    categories,
    loading,
    error
  } = useResourceData();

  const { toast } = useToast();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(resources, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'terraform-resources.json';
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: `Exported ${resources.length} resources to JSON file.`,
    });
  };

  const handleHelp = () => {
    toast({
      title: "Help",
      description: "Select multiple resources using checkboxes and generate Terraform code for all of them at once.",
    });
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7ff' }}>
      <Toolbar 
        onRefresh={handleRefresh}
        onExport={handleExport}
        onHelp={handleHelp}
      />
      
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-4xl mx-auto">
          <MultiSelectResourceSelector
            resources={resources}
            categories={categories}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
