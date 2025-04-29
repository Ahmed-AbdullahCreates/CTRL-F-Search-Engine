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
}) => {
  return (
    <div className={cn("rounded-lg border border-neonBlue/20 bg-darkBlue/30 p-3 flex flex-wrap items-center justify-between gap-2", className)}>
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-neonBlue/70" />
        <p className="text-sm">
          Found <span className="font-medium text-neonBlue">{totalResults}</span> results for "<span className="italic font-medium text-neonBlue">{query}</span>"
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="border-neonBlue/40 text-xs flex items-center gap-1 px-2 py-0.5">
          <Database size={10} className="text-neonBlue/70" />
          {searchModel === 'boolean' ? 'Boolean Retrieval' : 'Vector Space Model'}
        </Badge>
        
        {searchTime && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size={14} />
            <span className="text-xs">{searchTime.toFixed(3)} seconds</span>
          </div>
        )}
      </div>
    </div>
  );
};
