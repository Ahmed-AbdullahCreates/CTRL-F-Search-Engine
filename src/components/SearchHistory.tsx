
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSearchHistory } from '@/context/SearchHistoryContext';
import { cn } from '@/lib/utils';

interface SearchHistoryProps {
  className?: string;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ className }) => {
  const { searchHistory, clearHistory } = useSearchHistory();
  const navigate = useNavigate();

  if (searchHistory.length === 0) {
    return null;
  }

  const handleClick = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className={cn("rounded-lg border border-neonBlue/20 p-4", className)}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-neonBlue">Recent Searches</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearHistory}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searchHistory.map((query, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleClick(query)}
            className="border-neonBlue/20 hover:border-neonBlue hover:bg-neonBlue/10"
          >
            {query}
          </Button>
        ))}
      </div>
    </div>
  );
};
