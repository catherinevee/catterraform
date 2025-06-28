
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Resource } from '@/types/Resource';

interface CodeExampleProps {
  resource: Resource;
}

export const CodeExample = ({ resource }: CodeExampleProps) => {
  const { toast } = useToast();

  const generateCodeExample = (resource: Resource) => {
    const resourceName = resource.type.replace(/^(aws_|azurerm_)/, '');
    
    return `resource "${resource.type}" "example" {
  name                = "example-${resourceName}"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location

  # Add required configuration here
  
  tags = {
    environment = "production"
  }
}`;
  };

  const handleCopyCode = () => {
    const codeExample = generateCodeExample(resource);
    navigator.clipboard.writeText(codeExample);
    toast({
      title: "Code copied",
      description: "Code snippet has been copied to clipboard",
    });
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyCode}
          className="flex items-center space-x-1 border-2 hover:opacity-90"
          style={{ borderColor: '#6653e3', color: '#6653e3' }}
        >
          <Copy className="h-4 w-4" />
          <span>Copy</span>
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-green-400" style={{ backgroundColor: '#2a2a2a' }}>
        <code>{generateCodeExample(resource)}</code>
      </pre>
    </div>
  );
};
