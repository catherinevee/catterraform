
import React from 'react';

interface TaggingConfigProps {
  enforceTagging: boolean;
  onTaggingChange: (enabled: boolean) => void;
}

export const TaggingConfig = ({ enforceTagging, onTaggingChange }: TaggingConfigProps) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        id="enforce-tagging"
        type="checkbox"
        checked={enforceTagging}
        onChange={(e) => onTaggingChange(e.target.checked)}
        className="h-4 w-4 rounded border-2"
        style={{ borderColor: '#6653e3' }}
      />
      <label
        htmlFor="enforce-tagging"
        className="text-sm font-medium cursor-pointer"
        style={{ color: '#4a3bc7' }}
      >
        Enforce Tagging (HCL validation blocks)
      </label>
    </div>
  );
};
