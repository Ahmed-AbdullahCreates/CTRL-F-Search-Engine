import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SearchModel = 'boolean' | 'vector' | 'phrase';

interface SearchSettingsContextType {
  searchModel: SearchModel;
  setSearchModel: (model: SearchModel) => void;
  showDebugInfo: boolean;
  setShowDebugInfo: (show: boolean) => void;
  useSpellingCorrection: boolean;
  setUseSpellingCorrection: (use: boolean) => void;
  processTime: number;
  setProcessTime: (time: number) => void;
}

const SearchSettingsContext = createContext<SearchSettingsContextType | undefined>(undefined);

interface SearchSettingsProviderProps {
  children: ReactNode;
}

export const SearchSettingsProvider: React.FC<SearchSettingsProviderProps> = ({ children }) => {
  const [searchModel, setSearchModel] = useState<SearchModel>('vector');
  const [showDebugInfo, setShowDebugInfo] = useState<boolean>(false);
  const [useSpellingCorrection, setUseSpellingCorrection] = useState<boolean>(true);
  const [processTime, setProcessTime] = useState<number>(0);

  const value = {
    searchModel,
    setSearchModel,
    showDebugInfo,
    setShowDebugInfo,
    useSpellingCorrection,
    setUseSpellingCorrection,
    processTime,
    setProcessTime
  };

  return (
    <SearchSettingsContext.Provider value={value}>
      {children}
    </SearchSettingsContext.Provider>
  );
};

export const useSearchSettings = (): SearchSettingsContextType => {
  const context = useContext(SearchSettingsContext);
  if (context === undefined) {
    throw new Error('useSearchSettings must be used within a SearchSettingsProvider');
  }
  return context;
};