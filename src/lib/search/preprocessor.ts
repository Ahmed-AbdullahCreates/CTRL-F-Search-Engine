/**
 * Text Preprocessor for Information Retrieval
 * 
 * This module handles:
 * 1. Tokenization - breaking text into individual terms
 * 2. Case normalization/folding - converting to lowercase
 * 3. Stop word removal - filtering common words with little semantic value
 * 4. Stemming - reducing words to their root form
 */

// Common English stop words
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
  'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'against', 'between', 'into', 'through',
  'during', 'before', 'after', 'above', 'below', 'from', 'up', 'down', 'of', 'off', 'over', 'under',
  'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
  'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should', 'now'
]);


export function stem(word: string): string {
  // Basic stemming rules (simplified Porter algorithm)
  
  // Handle plurals and -ed or -ing suffixes
  let stemmed = word
    .replace(/([^aeiou])ies$/i, '$1y')      // flies -> fly
    .replace(/([^aeiou])es$/i, '$1e')       // fixes -> fixe
    .replace(/([^aeiou])s$/i, '$1')         // cats -> cat
    .replace(/eed$/i, 'ee')                 // agreed -> agree
    .replace(/ed$/i, '')                    // jumped -> jump
    .replace(/ing$/i, '');                  // running -> runn
  
  // Handle -ly
  stemmed = stemmed.replace(/ly$/i, '');    // quickly -> quick
  
  // Handle double consonants after removing suffix
  stemmed = stemmed.replace(/([^aeiou])\1$/i, '$1'); // runn -> run
  
  // Handle -ational
  stemmed = stemmed.replace(/ational$/i, 'ate'); // operational -> operate
  
  // Handle -ization
  stemmed = stemmed.replace(/ization$/i, 'ize'); // optimization -> optimize
  
  // Handle -ful
  stemmed = stemmed.replace(/ful$/i, '');  // helpful -> help
  
  return stemmed;
}

/**
 * Tokenize text into individual words
 */
export function tokenize(text: string): string[] {
  // Split on non-alphanumeric characters and filter out empty strings
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 0);
}

/**
 * Remove stop words from the token list
 */
export function removeStopWords(tokens: string[]): string[] {
  return tokens.filter(token => !STOP_WORDS.has(token));
}

/**
 * Apply stemming to each token
 */
export function stemTokens(tokens: string[]): string[] {
  return tokens.map(token => stem(token));
}

/**
 * Complete text preprocessing pipeline
 */
export function preprocess(text: string): string[] {
  const tokens = tokenize(text);
  const filteredTokens = removeStopWords(tokens);
  const stemmedTokens = stemTokens(filteredTokens);
  return stemmedTokens;
}

/**
 * Preprocess a search query string
 * For queries, we might want to keep some stop words since they can be important in short texts
 */
export function preprocessQuery(query: string): string[] {
  const tokens = tokenize(query);
  // For queries, we might want to be less aggressive with stop word removal
  // Only remove the most common stop words
  const basicStopWords = new Set(['a', 'an', 'the', 'and', 'or', 'in', 'on', 'at']);
  const filteredTokens = tokens.filter(token => !basicStopWords.has(token));
  const stemmedTokens = stemTokens(filteredTokens);
  return stemmedTokens;
}