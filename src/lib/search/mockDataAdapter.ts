import { Document } from './invertedIndex';
import { SearchEngine, SearchOptions, SearchResponse } from './searchEngine';
import { mockSearchResults } from '@/data/mockSearchData';
import { preprocessQuery } from './preprocessor';
import { SpellingCorrectionResult } from './spellingCorrection';

// Convert mock data format to search engine document format
export function convertMockDataToDocuments(): Document[] {
  return mockSearchResults.map(mock => ({
    id: mock.id,
    title: mock.title,
    // Combine description and keywords for content
    content: `${mock.description} ${mock.keywords.join(' ')}`,
    metadata: {
      url: mock.url,
      originalRelevanceScore: mock.relevanceScore,
      keywords: mock.keywords // Store original keywords in metadata
    }
  }));
}

// Initialize the search engine with mock data
let searchEngine: SearchEngine | null = null;

export function getSearchEngine(): SearchEngine {
  if (!searchEngine) {
    searchEngine = new SearchEngine();
    const documents = convertMockDataToDocuments();
    searchEngine.addDocuments(documents);
  }
  return searchEngine;
}

// Track search diagnostics
export interface SearchDiagnostics {
  processedQuery: string[];
  processingTime: number;
  spellingCorrection?: SpellingCorrectionResult;
  topTerms: Array<{term: string, frequency: number}>;
}

let lastSearchDiagnostics: SearchDiagnostics = {
  processedQuery: [],
  processingTime: 0,
  topTerms: []
};

export function getLastSearchDiagnostics(): SearchDiagnostics {
  return lastSearchDiagnostics;
}



// Convert search engine results back to the format expected by the UI
export interface UISearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  keywords: string[];
  relevanceScore: number;
}

export function convertToUIFormat(results: SearchResponse['results']): UISearchResult[] {
  return results.map(result => {
    const doc = result.document;
    return {
      id: doc.id,
      title: doc.title,
      url: doc.metadata?.url as string,
      description: doc.content.split(' ').slice(0, 30).join(' ') + '...', // First 30 words as description
      keywords: doc.metadata?.keywords as string[] || [], // Extract keywords from metadata
      relevanceScore: result.score
    };
  });
}

/**
 * Search the mock data using the real search engine
 */
export function searchWithEngine(
  query: string,
  filters: {} = {},
  page: number = 1,
  resultsPerPage: number = 5,
  model: 'boolean' | 'vector' | 'phrase' = 'vector',
  useSpellingCorrection: boolean = true
): {
  results: UISearchResult[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  didYouMean?: string;
} {
  const engine = getSearchEngine();
  
  // Process the query for diagnostics
  const processedQuery = preprocessQuery(query);
  
  // Options for the search engine
  const options: SearchOptions = {
    model,
    // Don't limit here because we need the total count for pagination
    limit: engine.getDocumentCount(),
    useSpellingCorrection
  };
  
  // Perform the search
  const searchResponse = engine.search(query, options);
  
  // Update diagnostics
  lastSearchDiagnostics = {
    processedQuery,
    processingTime: searchResponse.searchTime,
    spellingCorrection: searchResponse.spellingCorrection,
    topTerms: searchResponse.topTerms
  };
  
  const searchResults = searchResponse.results;
  const totalResults = searchResults.length;
  
  // Calculate pagination
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (page - 1) * resultsPerPage;
  const paginatedResults = searchResults.slice(startIndex, startIndex + resultsPerPage);
  
  return {
    results: convertToUIFormat(paginatedResults),
    totalResults,
    currentPage: page,
    totalPages,
    didYouMean: searchResponse.spellingCorrection?.hadCorrections ? 
      searchResponse.spellingCorrection.corrected : undefined
  };
}