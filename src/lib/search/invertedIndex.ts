/**
 * Inverted Index for Information Retrieval
 * 
 * An inverted index maps terms to the documents that contain them.
 * This is the core data structure that enables efficient search.
 */

import { preprocess } from './preprocessor';

export interface Document {
  id: string;
  title: string;
  content: string;
  metadata?: Record<string, any>;
}

export interface PostingItem {
  docId: string;
  frequency: number;
  positions?: number[];  // Optional: Store position for phrase queries
}

export interface InvertedIndexData {
  terms: Record<string, PostingItem[]>;
  documentCount: number;
  documentLengths: Record<string, number>;
  termFrequencies?: Record<string, number>; // Global term frequencies
}

export class InvertedIndex {
  // The index maps each term to a list of documents (postings list)
  private index: Record<string, PostingItem[]> = {};
  
  // Store document lengths for TF-IDF calculations
  private documentLengths: Record<string, number> = {};
  
  // Total number of documents in the collection
  private documentCount: number = 0;
  
  // Global term frequencies across the corpus
  private termFrequencies: Record<string, number> = {};
  
  /**
   * Create an inverted index from a collection of documents
   */
  public buildIndex(documents: Document[]): void {
    this.documentCount = documents.length;
    this.termFrequencies = {};
    
    // Process each document
    documents.forEach(doc => {
      // Combine title and content for indexing
      const text = `${doc.title} ${doc.content}`;
      
      // Preprocess the text
      const terms = preprocess(text);
      this.documentLengths[doc.id] = terms.length;
      
      // Count term frequencies in this document
      const termFreqs: Record<string, { freq: number, positions: number[] }> = {};
      terms.forEach((term, position) => {
        if (!termFreqs[term]) {
          termFreqs[term] = { freq: 0, positions: [] };
        }
        termFreqs[term].freq += 1;
        termFreqs[term].positions.push(position);
        
        // Update global term frequency
        this.termFrequencies[term] = (this.termFrequencies[term] || 0) + 1;
      });
      
      // Add to the inverted index
      Object.entries(termFreqs).forEach(([term, { freq, positions }]) => {
        if (!this.index[term]) {
          this.index[term] = [];
        }
        this.index[term].push({
          docId: doc.id,
          frequency: freq,
          positions: positions
        });
      });
    });
  }
  
  /**
   * Get the number of documents that contain the specified term
   */
  public getDocumentFrequency(term: string): number {
    return this.index[term]?.length || 0;
  }
  
  /**
   * Get all documents that contain the specified term
   */
  public getPostingsList(term: string): PostingItem[] {
    return this.index[term] || [];
  }
  
  /**
   * Calculate IDF (Inverse Document Frequency) for a term
   */
  public getIDF(term: string): number {
    const df = this.getDocumentFrequency(term);
    if (df === 0) return 0;
    // IDF = log(N/df) where N is the total number of documents
    return Math.log(this.documentCount / df);
  }
  
  /**
   * Get all terms in the index
   * Used for spelling correction dictionary
   */
  public getAllTerms(): string[] {
    return Object.keys(this.index);
  }
  
  /**
   * Get the top N most frequent terms in the corpus
   * Useful for visualizing term importance
   */
  public getMostFrequentTerms(n: number = 10): Array<{term: string, frequency: number}> {
    return Object.entries(this.termFrequencies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([term, frequency]) => ({ term, frequency }));
  }
  
  /**
   * Get term frequency across the entire corpus
   */
  public getGlobalTermFrequency(term: string): number {
    return this.termFrequencies[term] || 0;
  }
  
  /**
   * Perform phrase search (exact sequence of terms)
   * Returns documents where the terms appear in sequence
   */
  public phraseSearch(terms: string[]): string[] {
    if (terms.length === 0) return [];
    if (terms.length === 1) {
      return this.getPostingsList(terms[0]).map(item => item.docId);
    }
    
    // Get postings for all terms
    const postings = terms.map(term => this.getPostingsList(term));
    
    // If any term doesn't appear, phrase can't be found
    if (postings.some(posting => posting.length === 0)) {
      return [];
    }
    
    // Find documents containing all terms
    const candidateDocIds = new Set(postings[0].map(item => item.docId));
    for (let i = 1; i < postings.length; i++) {
      const currentDocIds = new Set(postings[i].map(item => item.docId));
      // Keep only docs that contain all terms
      candidateDocIds.forEach(docId => {
        if (!currentDocIds.has(docId)) {
          candidateDocIds.delete(docId);
        }
      });
    }
    
    // Check for sequential positions
    const results: string[] = [];
    candidateDocIds.forEach(docId => {
      // Get all positions for this doc for each term
      const docPositions = terms.map((term, i) => {
        const postingItem = postings[i].find(item => item.docId === docId);
        return postingItem?.positions || [];
      });
      
      // Check if terms appear in sequence
      const firstPositions = docPositions[0];
      for (const pos of firstPositions) {
        let found = true;
        for (let i = 1; i < terms.length; i++) {
          // Next term should be at position+i
          if (!docPositions[i].includes(pos + i)) {
            found = false;
            break;
          }
        }
        if (found) {
          results.push(docId);
          break;
        }
      }
    });
    
    return results;
  }
  
  /**
   * Serialize the index for storage
   */
  public serialize(): InvertedIndexData {
    return {
      terms: this.index,
      documentCount: this.documentCount,
      documentLengths: this.documentLengths,
      termFrequencies: this.termFrequencies
    };
  }
  
  /**
   * Deserialize a stored index
   */
  public deserialize(data: InvertedIndexData): void {
    this.index = data.terms;
    this.documentCount = data.documentCount;
    this.documentLengths = data.documentLengths;
    this.termFrequencies = data.termFrequencies || {};
  }
}