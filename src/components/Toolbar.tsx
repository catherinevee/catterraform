
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface ToolbarProps {
  onRefresh?: () => void;
  onExport?: () => void;
  onHelp?: () => void;
}

export const Toolbar = ({ onRefresh, onExport, onHelp }: ToolbarProps) => {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="border-b bg-white sticky top-0 z-50" style={{ backgroundColor: '#6653e3' }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-white">TerraformCat</span>
            </div>
            <Separator orientation="vertical" className="h-6 bg-white/30" />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-white hover:text-purple-100 transition-colors">
                <span className="text-sm">Resources</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem 
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleLinkClick('https://www.terraform-best-practices.com/')}
                >
                  <span>Terraform Best Practices</span>
                  <ExternalLink className="h-3 w-3" />
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleLinkClick('https://registry.terraform.io/browse/modules')}
                >
                  <span>Terraform Module Registry</span>
                  <ExternalLink className="h-3 w-3" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
