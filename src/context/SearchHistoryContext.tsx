
import React, { createContext, useState, useContext, useEffect } from 'react';

interface SearchHistoryContextType {
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
};

interface SearchHistoryProviderProps {
  children: React.ReactNode;
}

export const SearchHistoryProvider: React.FC<SearchHistoryProviderProps> = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    // Add to beginning of history and remove duplicates
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, 10); // Limit to 10 items
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const value = {
    searchHistory,
    addToHistory,
    clearHistory,
  };

  return (
    <SearchHistoryContext.Provider value={value}>
      {children}
    </SearchHistoryContext.Provider>
  );
};
