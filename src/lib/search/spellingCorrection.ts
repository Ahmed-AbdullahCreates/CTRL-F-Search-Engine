/**
 * Spelling Correction Module
 * 
 * Provides functionality to detect and correct spelling errors in search queries.
 * Uses a dictionary built from terms in the index and Levenshtein edit distance
 * to find likely corrections.
 */

import { InvertedIndex } from './invertedIndex';
import { preprocessQuery } from './preprocessor';

// Global dictionary of valid terms from the index
let dictionary: Set<string> = new Set<string>();

// Maximum edit distance to consider for corrections
const MAX_EDIT_DISTANCE = 2;

export interface SpellingCorrectionResult {
  original: string;
  corrected: string;
  hadCorrections: boolean;
  corrections: { [term: string]: string };
}

/**
 * Initialize the spelling correction dictionary
 */
export function initDictionary(index: InvertedIndex): void {
  const terms = index.getAllTerms();
  dictionary = new Set<string>(terms);
}

/**
 * Calculate Levenshtein edit distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  // Create a matrix of size (m+1)x(n+1)
  const matrix: number[][] = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(null));
  
  // Fill the first row and column
  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }
  
  // Fill the rest of the matrix
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  return matrix[a.length][b.length];
}

/**
 * Generate candidate corrections for a misspelled term
 */
function getCorrectionCandidates(term: string): string[] {
  // If the term is in the dictionary, it's correct
  if (dictionary.has(term)) {
    return [term];
  }
  
  // Find terms that are within MAX_EDIT_DISTANCE edits
  const candidates: string[] = [];
  
  for (const dictTerm of dictionary) {
    // Quick length check first (optimization)
    if (Math.abs(dictTerm.length - term.length) > MAX_EDIT_DISTANCE) {
      continue;
    }
    
    const distance = levenshteinDistance(term, dictTerm);
    if (distance <= MAX_EDIT_DISTANCE) {
      candidates.push(dictTerm);
    }
  }
  
  return candidates;
}

/**
 * Score candidate corrections based on:
 * 1. Edit distance (lower is better)
 * 2. Term frequency in the corpus (higher is better)
 * 3. Length similarity (closer is better)
 */
function scoreCorrection(original: string, candidate: string): number {
  const distance = levenshteinDistance(original, candidate);
  const lengthDiff = Math.abs(original.length - candidate.length);
  
  // Prioritize closer matches
  let score = 1.0 / (distance + 1);
  
  // Prefer corrections with similar length
  score += 0.2 * (1.0 / (lengthDiff + 1));
  
  // Prefer shorter corrections (when multiple options exist)
  if (distance === 1) {
    score += 0.1 * (1.0 / candidate.length);
  }
  
  return score;
}

/**
 * Find the best correction for a potentially misspelled term
 */
function correctTerm(term: string): string {
  // Terms shorter than 3 characters usually aren't worth correcting
  if (term.length < 3 || dictionary.has(term)) {
    return term;
  }
  
  // Get potential corrections
  const candidates = getCorrectionCandidates(term);
  
  // If no candidates found, return original
  if (candidates.length === 0 || (candidates.length === 1 && candidates[0] === term)) {
    return term;
  }
  
  // Score and rank candidates
  const scoredCandidates = candidates
    .map(candidate => ({
      candidate,
      score: scoreCorrection(term, candidate)
    }))
    .sort((a, b) => b.score - a.score);
  
  // Return the top candidate
  return scoredCandidates[0].candidate;
}

/**
 * Correct a search query
 * Returns both the corrected query and information about the corrections made
 */
export function correctQuery(query: string): SpellingCorrectionResult {
  // If the dictionary is empty, return the original query
  if (dictionary.size === 0) {
    return {
      original: query,
      corrected: query,
      hadCorrections: false,
      corrections: {}
    };
  }
  
  const originalTerms = preprocessQuery(query);
  const corrections: { [term: string]: string } = {};
  let hadCorrections = false;
  
  // Process each term
  const correctedTerms = originalTerms.map(term => {
    const corrected = correctTerm(term);
    
    // If corrected is different from original, store the correction
    if (corrected !== term) {
      corrections[term] = corrected;
      hadCorrections = true;
      return corrected;
    }
    
    return term;
  });
  
  // Reconstruct the corrected query
  const correctedQuery = correctedTerms.join(' ');
  
  return {
    original: query,
    corrected: correctedQuery,
    hadCorrections,
    corrections
  };
}