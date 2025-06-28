
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ResourceCardProps {
  resource: {
    id: string;
    type: string;
    category: string;
    description: string;
    docs_url: string;
  };
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyType = async () => {
    await navigator.clipboard.writeText(resource.type);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'compute': 'bg-blue-100 text-blue-800',
      'storage': 'bg-green-100 text-green-800',
      'networking': 'bg-purple-100 text-purple-800',
      'database': 'bg-orange-100 text-orange-800',
      'security': 'bg-red-100 text-red-800',
      'analytics': 'bg-indigo-100 text-indigo-800',
      'ai': 'bg-pink-100 text-pink-800',
      'machine-learning': 'bg-pink-100 text-pink-800',
      'monitoring': 'bg-yellow-100 text-yellow-800',
      'management': 'bg-gray-100 text-gray-800',
      'messaging': 'bg-cyan-100 text-cyan-800',
      'cost-management': 'bg-emerald-100 text-emerald-800',
      'media': 'bg-violet-100 text-violet-800',
      'iot': 'bg-teal-100 text-teal-800',
      'location': 'bg-slate-100 text-slate-800',
      'marketing': 'bg-rose-100 text-rose-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-mono break-all leading-tight">
            {resource.type}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyType}
            className="shrink-0"
          >
            {copied ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Badge 
          variant="secondary" 
          className={`w-fit ${getCategoryColor(resource.category)}`}
        >
          {resource.category}
        </Badge>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {resource.description}
        </p>
        
        <Button 
          variant="outline" 
          size="sm" 
          asChild
          className="w-full"
        >
          <a 
            href={resource.docs_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Documentation
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
