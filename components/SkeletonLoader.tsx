import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = '' }) => {
  return (
    <div className={`bg-black/50 border border-gray-800 shadow-lg rounded-xl p-6 ${className}`}>
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-900 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-900 rounded"></div>
            <div className="h-4 bg-gray-900 rounded w-5/6"></div>
             <div className="h-4 bg-gray-900 rounded w-4/6"></div>
             <div className="h-4 bg-gray-900 rounded w-5/6"></div>
             <div className="h-4 bg-gray-900 rounded w-3/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;