
import React from 'react';
import { cn } from '@/lib/utils';

export interface SearchResultProps {
  title: string;
  url: string;
  description: string;
  relevanceScore?: number;
  className?: string;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  title,
  url,
  description,
  relevanceScore,
  className
}) => {
  return (
    <div className={cn("p-4 rounded-lg hover:bg-secondary/50 transition-colors", className)}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-neonBlue hover:underline mb-1">{title}</h3>
          {relevanceScore !== undefined && (
            <span className="text-xs bg-neonBlue/20 text-neonBlue px-2 py-0.5 rounded-full">
              Score: {relevanceScore.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-2 truncate">{url}</p>
        <p className="text-sm text-foreground/80">{description}</p>
      </a>
    </div>
  );
};
