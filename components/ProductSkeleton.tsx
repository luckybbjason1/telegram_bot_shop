
import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex flex-col h-full shadow-lg">
      <div className="h-40 bg-zinc-800/50 animate-pulse" />
      <div className="p-3 flex flex-col flex-grow space-y-3">
        {/* Category Skeleton */}
        <div className="h-3 w-1/3 bg-zinc-800/50 rounded animate-pulse" />
        
        {/* Title Skeleton */}
        <div className="h-4 w-3/4 bg-zinc-800/50 rounded animate-pulse" />
        
        {/* Description Skeleton */}
        <div className="space-y-2 flex-grow mt-2">
          <div className="h-2 w-full bg-zinc-800/50 rounded animate-pulse" />
          <div className="h-2 w-5/6 bg-zinc-800/50 rounded animate-pulse" />
        </div>
        
        {/* Button Skeleton */}
        <div className="h-8 w-full bg-zinc-800/50 rounded-lg animate-pulse mt-auto" />
      </div>
    </div>
  );
};
