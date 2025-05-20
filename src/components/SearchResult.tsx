
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
}) => {  return (
    <div className={cn("p-3 xs:p-4 rounded-lg hover:bg-secondary/50 transition-colors", className)}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex flex-col xs:flex-row justify-between xs:items-start gap-1 xs:gap-0">
          <h3 className="text-base xs:text-lg font-medium text-neonBlue hover:underline mb-0.5 xs:mb-1 line-clamp-2 xs:line-clamp-1">{title}</h3>
          {relevanceScore !== undefined && (
            <span className="text-xxs xs:text-xs bg-neonBlue/20 text-neonBlue px-1.5 xs:px-2 py-0.5 rounded-full self-start xs:self-auto whitespace-nowrap">
              Score: {relevanceScore.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-xs xs:text-sm text-muted-foreground mb-1 xs:mb-2 truncate">{url}</p>
        <p className="text-xs xs:text-sm text-foreground/80 line-clamp-3">{description}</p>
      </a>
    </div>
  );
};
