import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SearchResult } from '@/components/SearchResult';
import { SearchPagination } from '@/components/SearchPagination';
import { SearchStats } from '@/components/SearchStats';
import { SearchDebugInfo } from '@/components/SearchDebugInfo';
import { useSearchHistory } from '@/context/SearchHistoryContext';
import { useSearchSettings } from '@/context/SearchSettingsContext';
import { getSearchResults } from '@/data/mockSearchData';
import { getLastSearchDiagnostics } from '@/lib/search/mockDataAdapter';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const { addToHistory } = useSearchHistory();
  const { 
    searchModel, 
    setProcessTime,
    useSpellingCorrection
  } = useSearchSettings();
  
  const [searchStartTime] = useState<number>(Date.now());
  const [searchTime, setSearchTime] = useState<number>(0);
  
  // Get search results using the selected model
  const { results, totalResults, totalPages, didYouMean } = getSearchResults(
    query,
    {},
    page,
    5,
    searchModel,
    useSpellingCorrection
  );
  
  // Get debug information
  const { processedQuery, processingTime, spellingCorrection, topTerms } = getLastSearchDiagnostics();
  
  useEffect(() => {
    if (query) {
      addToHistory(query);
      
      // Calculate search time (simulated delay + actual processing time)
      const delay = Math.random() * 300 + 100; // 100-400ms random delay
      const timer = setTimeout(() => {
        const uiTime = (Date.now() - searchStartTime) / 1000;
        setSearchTime(uiTime);
        setProcessTime(processingTime);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [query, addToHistory, searchStartTime, processingTime, setProcessTime]);
  
  // Handle "Did you mean" click
  const handleSpellingCorrectionClick = () => {
    if (didYouMean) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', didYouMean);
      newParams.set('page', '1'); // Reset to first page
      setSearchParams(newParams);
    }
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-radial from-darkBlue to-deepBlue">
      <Header showSearch initialQuery={query} />
      
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-6">
        {/* Search results */}
        <div className="flex-grow">
          <SearchStats
            query={query}
            totalResults={totalResults}
            searchTime={searchTime}
            searchModel={searchModel}
            className="mb-4"
          />
          
          {/* Did you mean suggestion */}
          {didYouMean && (
            <Alert className="mb-4 bg-neonBlue/5 border-neonBlue/20">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-neonBlue" />
                <AlertTitle>Did you mean</AlertTitle>
              </div>
              <div className="flex justify-between items-center mt-1">
                <AlertDescription className="font-medium">
                  <span className="text-neonBlue">{didYouMean}</span>?
                </AlertDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSpellingCorrectionClick}
                  className="border-neonBlue/30 hover:bg-neonBlue/10 hover:text-neonBlue"
                >
                  Search with correction
                </Button>
              </div>
            </Alert>
          )}
          
          {/* Debug information (when enabled) */}
          <SearchDebugInfo 
            query={query}
            processedQuery={processedQuery}
            spellingCorrections={spellingCorrection?.corrections}
            topTerms={topTerms}
            processTime={processingTime}
            className="mb-4"
          />
          
          {results.length > 0 ? (
            <div className="space-y-4 mb-6">
              {results.map(result => (
                <SearchResult
                  key={result.id}
                  title={result.title}
                  url={result.url}
                  description={result.description}
                  relevanceScore={result.relevanceScore}
                  className="bg-darkBlue/30 border border-neonBlue/10"
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center border border-neonBlue/20 rounded-lg bg-darkBlue/30">
              <p className="text-lg mb-2">No results found for "{query}"</p>
              <p className="text-sm text-muted-foreground">
                Try using different keywords
              </p>
            </div>
          )}
          
          {totalPages > 1 && (
            <SearchPagination 
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-8"
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
