import React from 'react';
import { cn } from '@/lib/utils';
import { Clock, Filter, Database } from 'lucide-react';
import { SearchModel } from '@/context/SearchSettingsContext';
import { Badge } from '@/components/ui/badge';

interface SearchStatsProps {
  query: string;
  totalResults: number;
  searchTime?: number;
  searchModel?: SearchModel;
  className?: string;
}

export const SearchStats: React.FC<SearchStatsProps> = ({
  query,
  totalResults,
  searchTime = Math.random() * 0.5 + 0.1, // Mock search time between 0.1-0.6 seconds
  searchModel = 'vector',
  className
}) => {  return (
    <div className={cn("rounded-lg border border-neonBlue/20 bg-darkBlue/30 p-2 xs:p-3 flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center justify-between gap-2", className)}>
      <div className="flex items-center gap-1.5 xs:gap-2">
        <Filter size={14} className="text-neonBlue/70 shrink-0" />
        <p className="text-xs xs:text-sm line-clamp-1">
          Found <span className="font-medium text-neonBlue">{totalResults}</span> results for "<span className="italic font-medium text-neonBlue truncate max-w-[120px] xs:max-w-none inline-block align-bottom">{query}</span>"
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 xs:gap-4">
        <Badge variant="outline" className="border-neonBlue/40 text-xxs xs:text-xs flex items-center gap-1 px-1.5 xs:px-2 py-0.5 h-auto">
          <Database size={10} className="text-neonBlue/70 hidden xs:inline" />
          {searchModel === 'boolean' ? 'Boolean' : searchModel === 'vector' ? 'Vector Space' : 'Phrase'}
        </Badge>
        
        {searchTime && (
          <div className="flex items-center gap-1 xs:gap-1.5 text-muted-foreground">
            <Clock size={12} className="xs:w-3.5 xs:h-3.5" />
            <span className="text-xxs xs:text-xs">{searchTime.toFixed(3)}s</span>
          </div>
        )}
      </div>
    </div>
  );
};
