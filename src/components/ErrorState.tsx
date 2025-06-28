
import React from 'react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f7ff' }}>
      <div className="text-center space-y-4">
        <p className="text-red-600">Error loading resources: {error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 text-white rounded hover:opacity-90"
          style={{ backgroundColor: '#6653e3' }}
        >
          Retry
        </button>
      </div>
    </div>
  );
};
