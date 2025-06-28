
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeSectionProps {
  code: string;
  filename: string;
}

export const CodeSection = ({ code, filename }: CodeSectionProps) => {
  const { toast } = useToast();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: "Terraform configuration has been copied to clipboard",
    });
  };

  const handleDownload = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "File downloaded",
      description: `${filename} has been downloaded`,
    });
  };

  return (
    <>
      <div className="flex space-x-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopyCode(code)}
          className="flex items-center space-x-1 border-2 hover:opacity-90"
          style={{ borderColor: '#6653e3', color: '#6653e3' }}
        >
          <Copy className="h-4 w-4" />
          <span>Copy</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownload(code, filename)}
          className="flex items-center space-x-1 border-2 hover:opacity-90"
          style={{ borderColor: '#6653e3', color: '#6653e3' }}
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm max-h-96 overflow-y-auto text-green-400 rounded" style={{ backgroundColor: '#2a2a2a' }}>
        <code>{code}</code>
      </pre>
    </>
  );
};
