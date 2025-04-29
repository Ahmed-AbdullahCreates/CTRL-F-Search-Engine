/**
 * Search Engine Implementation
 * 
 * Combines multiple information retrieval models:
 * 1. Boolean Retrieval - Basic AND/OR/NOT operations
 * 2. Vector Space Model - With TF-IDF weighting
 * 3. Phrase Search - Exact sequence matching
 */

import { preprocess, preprocessQuery } from './preprocessor';
import { Document, InvertedIndex, PostingItem } from './invertedIndex';
import { correctQuery, initDictionary, SpellingCorrectionResult } from './spellingCorrection';

export interface SearchResult {
  document: Document;
  score: number;
}

export interface SearchOptions {
  model: 'boolean' | 'vector' | 'phrase';
  limit?: number;
  useSpellingCorrection?: boolean;
}

export interface SearchResponse {
  results: SearchResult[];
  spellingCorrection?: SpellingCorrectionResult;
  topTerms: Array<{term: string, frequency: number}>;
}

export class SearchEngine {
  private invertedIndex: InvertedIndex;
  private documents: Record<string, Document>;
  
  constructor() {
    this.invertedIndex = new InvertedIndex();
    this.documents = {};
  }
  
  /**
   * Add documents to the search engine and build the index
   */
  public addDocuments(documents: Document[]): void {
    // Store documents for retrieval
    documents.forEach(doc => {
      this.documents[doc.id] = doc;
    });
    
    // Build the inverted index
    this.invertedIndex.buildIndex(documents);
    
    // Initialize spelling correction dictionary
    initDictionary(this.invertedIndex);
  }
  
  /**
   * Perform a search using the specified retrieval model
   */
  public search(query: string, options: SearchOptions): SearchResponse {
    const { 
      model = 'vector', 
      limit = 10, 
      useSpellingCorrection = true
    } = options;
    
    const startTime = performance.now();
    
    let processedQuery: string[] = [];
    let spellingCorrection: SpellingCorrectionResult | undefined;
    let results: SearchResult[] = [];
    
    // Apply spelling correction if enabled
    if (useSpellingCorrection && query.trim()) {
      spellingCorrection = correctQuery(query);
      if (spellingCorrection.hadCorrections) {
        query = spellingCorrection.corrected;
      }
    }
    
    // Preprocess the query
    processedQuery = preprocessQuery(query);
    
    if (processedQuery.length === 0) {
      return {
        results: [],
        spellingCorrection,
        topTerms: this.invertedIndex.getMostFrequentTerms(5)
      };
    }
    
    // Choose the retrieval model
    switch (model) {
      case 'boolean':
        results = this.booleanSearch(processedQuery);
        break;
      case 'phrase':
        results = this.phraseSearch(processedQuery);
        break;
      case 'vector':
      default:
        results = this.vectorSearch(processedQuery);
        break;
    }
    
    // Apply result limit
    results = results.slice(0, limit);
    
    return {
      results,
      spellingCorrection,
      topTerms: this.getTopTermsForQuery(processedQuery)
    };
  }
  
  /**
   * Get the most relevant terms related to the query
   */
  private getTopTermsForQuery(queryTerms: string[]): Array<{term: string, frequency: number}> {
    const termFreqs: Record<string, number> = {};
    
    // Get documents matching the query terms
    const relevantDocs = new Set<string>();
    queryTerms.forEach(term => {
      this.invertedIndex.getPostingsList(term).forEach(posting => {
        relevantDocs.add(posting.docId);
      });
    });
    
    // Count terms in those documents
    relevantDocs.forEach(docId => {
      const doc = this.documents[docId];
      if (doc) {
        const terms = preprocess(`${doc.title} ${doc.content}`);
        terms.forEach(term => {
          termFreqs[term] = (termFreqs[term] || 0) + 1;
        });
      }
    });
    
    // Sort by frequency and return top terms
    return Object.entries(termFreqs)
      .sort((a, b) => b[1] - a[1])
      .filter(([term]) => !queryTerms.includes(term)) // Exclude query terms
      .slice(0, 5)
      .map(([term, frequency]) => ({ term, frequency }));
  }
  
  /**
   * Perform Boolean retrieval (treats terms as ANDed by default)
   */
  private booleanSearch(queryTerms: string[]): SearchResult[] {
    // Get postings lists for all query terms
    const postingsLists = queryTerms.map(term => this.invertedIndex.getPostingsList(term));
    
    // If any term has no matches, return empty results (AND operation)
    if (postingsLists.some(list => list.length === 0)) {
      return [];
    }
    
    // Find documents that contain ALL query terms (AND operation)
    // Start with the shortest postings list for efficiency
    postingsLists.sort((a, b) => a.length - b.length);
    
    // First posting list as initial candidates
    let docIds = new Set(postingsLists[0].map(item => item.docId));
    
    // Intersect with other posting lists
    for (let i = 1; i < postingsLists.length; i++) {
      const currentIds = new Set(postingsLists[i].map(item => item.docId));
      docIds = new Set([...docIds].filter(id => currentIds.has(id)));
      
      // Early termination if intersection becomes empty
      if (docIds.size === 0) {
        return [];
      }
    }
    
    // Convert to search results with simple scoring
    return [...docIds].map(docId => ({
      document: this.documents[docId],
      // Simple scoring for Boolean model: sum of term frequencies
      score: queryTerms.reduce((score, term) => {
        const posting = this.invertedIndex.getPostingsList(term)
          .find(p => p.docId === docId);
        return score + (posting?.frequency || 0);
      }, 0)
    }))
    .sort((a, b) => b.score - a.score);
  }
  
  /**
   * Perform phrase search (exact sequence of query terms)
   */
  private phraseSearch(queryTerms: string[]): SearchResult[] {
    // Use the invertedIndex's phraseSearch method
    const docIds = this.invertedIndex.phraseSearch(queryTerms);
    
    // Convert to search results with position-based scoring
    return docIds.map(docId => {
      const document = this.documents[docId];
      // Score based on document length - shorter docs with the phrase rank higher
      const docLength = document.content.length;
      const score = 1000000 / (docLength + 1);
      
      return {
        document,
        score
      };
    })
    .sort((a, b) => b.score - a.score);
  }
  
  /**
   * Perform Vector Space Model search with TF-IDF weighting and Cosine Similarity
   */
  private vectorSearch(queryTerms: string[]): SearchResult[] {
    // Calculate query vector (TF-IDF weights for query terms)
    const queryVector: Record<string, number> = {};
    const queryTermFreqs: Record<string, number> = {};
    
    // Count term frequencies in the query
    queryTerms.forEach(term => {
      queryTermFreqs[term] = (queryTermFreqs[term] || 0) + 1;
    });
    
    // Calculate TF-IDF for query terms
    Object.entries(queryTermFreqs).forEach(([term, frequency]) => {
      const idf = this.invertedIndex.getIDF(term);
      const tf = 1 + (frequency > 0 ? Math.log(frequency) : 0);
      queryVector[term] = tf * idf;
    });
    
    // Calculate query vector magnitude (for normalization)
    const queryMagnitude = Math.sqrt(
      Object.values(queryVector).reduce((sum, weight) => sum + weight * weight, 0)
    );
    
    // If query is empty or has no meaningful terms
    if (queryMagnitude === 0) return [];
    
    // Track document vectors and their scores
    const documentVectors: Record<string, Record<string, number>> = {};
    const documentMagnitudes: Record<string, number> = {};
    const scores: Record<string, number> = {};
    
    // For each term in the query
    queryTerms.forEach(term => {
      const queryWeight = queryVector[term] / queryMagnitude;
      const idf = this.invertedIndex.getIDF(term);
      
      // For each document containing the term
      this.invertedIndex.getPostingsList(term).forEach(posting => {
        const { docId, frequency } = posting;
        
        // Initialize document vector if needed
        if (!documentVectors[docId]) {
          documentVectors[docId] = {};
          documentMagnitudes[docId] = 0;
          scores[docId] = 0;
        }
        
        // TF = term frequency in the document
        const tf = 1 + (frequency > 0 ? Math.log(frequency) : 0);
        
        // TF-IDF score for this term-document pair
        const tfIdf = tf * idf;
        documentVectors[docId][term] = tfIdf;
        
        // Contribute to document magnitude
        documentMagnitudes[docId] += tfIdf * tfIdf;
      });
    });
    
    // Calculate cosine similarity for each document
    Object.entries(documentVectors).forEach(([docId, docVector]) => {
      // Normalize document magnitude
      const docMagnitude = Math.sqrt(documentMagnitudes[docId]);
      
      // Dot product of normalized vectors
      let dotProduct = 0;
      
      // For each term in the query
      queryTerms.forEach(term => {
        if (docVector[term]) {
          const queryWeight = queryVector[term] / queryMagnitude;
          const docWeight = docVector[term] / docMagnitude;
          dotProduct += queryWeight * docWeight;
        }
      });
      
      // Cosine similarity score (dot product of normalized vectors)
      scores[docId] = dotProduct;
    });
    
    // Convert scores to search results
    return Object.entries(scores)
      .map(([docId, score]) => ({
        document: this.documents[docId],
        score
      }))
      .sort((a, b) => b.score - a.score);
  }
  
  /**
   * Get a document by its ID
   */
  public getDocument(id: string): Document | undefined {
    return this.documents[id];
  }
  
  /**
   * Get the total number of documents in the index
   */
  public getDocumentCount(): number {
    return Object.keys(this.documents).length;
  }
  
  /**
   * Get access to the underlying inverted index
   */
  public getInvertedIndex(): InvertedIndex {
    return this.invertedIndex;
  }
}