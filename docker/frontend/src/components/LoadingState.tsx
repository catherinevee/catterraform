
import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f7ff' }}>
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" style={{ color: '#6653e3' }} />
        <p style={{ color: '#5a4fd1' }}>Loading resources...</p>
      </div>
    </div>
  );
};
