// Import our search engine functionality
import { searchWithEngine, getSearchEngine } from '@/lib/search/mockDataAdapter';
import { SearchModel } from '@/context/SearchSettingsContext';

export interface SearchResultData {
  id: string;
  title: string;
  url: string;
  description: string;
  keywords: string[];
  relevanceScore: number;
  category: string;
}

export const mockSearchResults: SearchResultData[] = [
  {
    id: "1",
    title: "Introduction to Information Retrieval - Stanford NLP",
    url: "https://nlp.stanford.edu/IR-book/",
    description: "This is the companion website for the following book: Christopher D. Manning, Prabhakar Raghavan and Hinrich Schütze, Introduction to Information Retrieval, Cambridge University Press. 2008.",
    keywords: ["information retrieval", "textbook", "stanford", "nlp", "search engines"],
    relevanceScore: 0.95,
    category: "academic"
  },
  {
    id: "2",
    title: "Boolean Retrieval Model - GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/boolean-retrieval-model-in-information-retrieval/",
    description: "Learn about the Boolean Retrieval Model, one of the most basic models in information retrieval that uses Boolean operators to process queries.",
    keywords: ["boolean retrieval", "information retrieval", "search model", "query processing"],
    relevanceScore: 0.85,
    category: "tutorial"
  },
  {
    id: "3",
    title: "TF-IDF: A Statistical Measure Used in Information Retrieval",
    url: "https://medium.com/analytics-vidhya/tf-idf-term-frequency-inverse-document-frequency-65a7fc969d2e",
    description: "Term Frequency-Inverse Document Frequency (TF-IDF) is a statistical measure used to evaluate how important a word is to a document in a collection or corpus.",
    keywords: ["tf-idf", "term frequency", "inverse document frequency", "information retrieval"],
    relevanceScore: 0.82,
    category: "article"
  },
  {
    id: "4",
    title: "Vector Space Model for Information Retrieval",
    url: "https://www.researchgate.net/publication/220337659_Vector_Space_Model_for_Information_Retrieval",
    description: "This paper discusses the vector space model, a widely used model in information retrieval that represents documents and queries as vectors in a multi-dimensional space.",
    keywords: ["vector space model", "information retrieval", "document representation"],
    relevanceScore: 0.78,
    category: "academic"
  },
  {
    id: "5",
    title: "PageRank Algorithm - How Google Ranks Webpages",
    url: "https://www.cs.princeton.edu/~chazelle/courses/BIB/pagerank.htm",
    description: "The PageRank algorithm, developed by Larry Page and Sergey Brin at Stanford University, is a link analysis algorithm used by Google Search to rank websites in their search engine results.",
    keywords: ["pagerank", "google", "search engine", "algorithm", "web search"],
    relevanceScore: 0.75,
    category: "algorithm"
  },
  {
    id: "6",
    title: "Query Expansion Techniques for Information Retrieval",
    url: "https://dl.acm.org/doi/10.1145/2345676.2345677",
    description: "This paper presents an overview of query expansion techniques in information retrieval systems. Query expansion is the process of reformulating a seed query to improve retrieval performance.",
    keywords: ["query expansion", "information retrieval", "search improvement"],
    relevanceScore: 0.72,
    category: "academic"
  },
  {
    id: "7",
    title: "Relevance Feedback Methods in Information Retrieval",
    url: "https://www.sciencedirect.com/science/article/pii/S0306457309000259",
    description: "Relevance feedback is a feature of some information retrieval systems that allows the user to provide feedback on the relevance of documents in an initial set of results.",
    keywords: ["relevance feedback", "information retrieval", "user feedback", "search refinement"],
    relevanceScore: 0.68,
    category: "academic"
  },
  {
    id: "8",
    title: "Introduction to Modern Information Retrieval - UCL",
    url: "https://www.ucl.ac.uk/information-studies/introduction-modern-information-retrieval",
    description: "This course provides an introduction to the field of information retrieval, focusing on modern techniques and algorithms for organizing and searching large text collections.",
    keywords: ["information retrieval", "course", "ucl", "search techniques"],
    relevanceScore: 0.65,
    category: "course"
  },
  {
    id: "9",
    title: "Inverted Index - Wikipedia",
    url: "https://en.wikipedia.org/wiki/Inverted_index",
    description: "An inverted index is an index data structure storing a mapping from content, such as words or numbers, to its locations in a document or a set of documents.",
    keywords: ["inverted index", "information retrieval", "data structure", "indexing"],
    relevanceScore: 0.62,
    category: "reference"
  },
  {
    id: "10",
    title: "Evaluation Metrics for Information Retrieval Systems",
    url: "https://towardsdatascience.com/evaluation-metrics-for-information-retrieval-systems-d8c6e02606b3",
    description: "This article discusses various metrics used to evaluate the performance of information retrieval systems, including precision, recall, F-measure, and MAP.",
    keywords: ["evaluation metrics", "information retrieval", "precision", "recall"],
    relevanceScore: 0.58,
    category: "article"
  },
  {
    id: "11",
    title: "CTRL+F: An Information Retrieval Primer",
    url: "https://ctrlf-ir.org/primer/",
    description: "A comprehensive introduction to the fundamentals of information retrieval, explaining how search engines work from indexing to query processing.",
    keywords: ["information retrieval", "search engines", "indexing", "query processing", "primer"],
    relevanceScore: 0.92,
    category: "tutorial"
  },
  {
    id: "12",
    title: "Advanced Techniques in Information Retrieval - MIT",
    url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-345-advanced-information-retrieval/",
    description: "This course covers advanced topics in information retrieval, including language models, learning to rank, and neural information retrieval.",
    keywords: ["advanced information retrieval", "language models", "learning to rank", "neural IR"],
    relevanceScore: 0.56,
    category: "course"
  },
  // Additional data for better demonstration
  {
    id: "13",
    title: "Natural Language Processing with Python",
    url: "https://www.nltk.org/book/",
    description: "This book provides a practical introduction to programming for language processing, using Python and the Natural Language Toolkit (NLTK). An essential resource for working with language processing in search engines.",
    keywords: ["nlp", "python", "text processing", "language processing", "nltk"],
    relevanceScore: 0.88,
    category: "tutorial"
  },
  {
    id: "14",
    title: "Spelling Correction Algorithms for Information Retrieval",
    url: "https://aclanthology.org/P19-1024/",
    description: "This paper presents advanced spelling correction techniques designed specifically for search queries, including context-sensitive spell checking and phonetic correction methods.",
    keywords: ["spelling correction", "information retrieval", "query processing", "edit distance"],
    relevanceScore: 0.79,
    category: "academic"
  },
  {
    id: "15",
    title: "Stemming and Lemmatization in Search Engines",
    url: "https://www.researchgate.net/publication/220433848_Stemming_and_lemmatization_in_the_search_engine",
    description: "An in-depth analysis of how stemming and lemmatization affect search engine performance, with comparisons between Porter's algorithm, Snowball stemmer, and WordNet-based lemmatization.",
    keywords: ["stemming", "lemmatization", "information retrieval", "search engines", "porter algorithm"],
    relevanceScore: 0.82,
    category: "academic"
  },
  {
    id: "16",
    title: "Building a Semantic Search Engine with Vector Embeddings",
    url: "https://www.pinecone.io/learn/semantic-search/",
    description: "A practical guide to implementing semantic search using modern vector embeddings like Word2Vec, BERT, and Sentence Transformers to capture meanings beyond simple keyword matching.",
    keywords: ["semantic search", "vector embeddings", "bert", "information retrieval"],
    relevanceScore: 0.91,
    category: "tutorial"
  },
  {
    id: "17",
    title: "Machine Learning for Information Retrieval",
    url: "https://www.microsoft.com/en-us/research/publication/machine-learning-for-information-retrieval/",
    description: "This comprehensive overview examines how machine learning techniques are revolutionizing information retrieval, from Learning to Rank algorithms to neural ranking models.",
    keywords: ["machine learning", "information retrieval", "neural search", "learning to rank"],
    relevanceScore: 0.87,
    category: "research"
  },
  {
    id: "18",
    title: "Phrase Queries and Proximity Search in Lucene",
    url: "https://lucene.apache.org/core/tutorials/phrase-queries.html",
    description: "A detailed tutorial on implementing and optimizing phrase queries and proximity search in Apache Lucene, with practical examples and performance considerations.",
    keywords: ["phrase queries", "proximity search", "lucene", "search engine", "positional index"],
    relevanceScore: 0.76,
    category: "tutorial"
  },
  {
    id: "19", 
    title: "Stop Words: Their Impact on Information Retrieval",
    url: "https://dl.acm.org/doi/10.1145/2810103.2813614",
    description: "A research study examining the effects of stop word removal on search quality across multiple domains, with surprising findings about when stop words should and shouldn't be ignored.",
    keywords: ["stop words", "information retrieval", "query processing", "text preprocessing"],
    relevanceScore: 0.74,
    category: "academic"
  },
  {
    id: "20",
    title: "Building Real-time Search with Inverted Indices",
    url: "https://elastic.co/blog/building-real-time-search",
    description: "This hands-on guide explains how to implement efficient real-time search capabilities using inverted indices, with optimizations for fast indexing and querying.",
    keywords: ["inverted index", "real-time search", "search engines", "information retrieval"],
    relevanceScore: 0.85,
    category: "tutorial"
  },
  {
    id: "21",
    title: "Modern Approaches to Information Retrieval Architecture",
    url: "https://arxiv.org/abs/2103.12292",
    description: "A survey of modern search engine architectures discussing distributed indexing, query handling, and ranking pipelines with examples from major search providers.",
    keywords: ["search architecture", "distributed search", "information retrieval", "search engine design"],
    relevanceScore: 0.81,
    category: "research"
  },
  {
    id: "22",
    title: "Information Retrieval with Misspelled Qeuries",
    url: "https://dl.acm.org/doi/10.1145/1571941.1572005",
    description: "An analysis of search behavior with misspelled queries and techniques for handling spelling errors in search systems, including phonetic matching and edit distance algorithms.",
    keywords: ["spelling errors", "query correction", "information retrieval", "search engines"],
    relevanceScore: 0.77,
    category: "academic"
  },
  {
    id: "23",
    title: "Data Strcutres for Efficient Information Retrieval",
    url: "https://cs.stanford.edu/people/widom/cs346/dstructures.html",
    description: "A detailed examination of specialized data structures used in search engines, including suffix trees, tries, and space-efficient inverted indices for large-scale retrieval systems.",
    keywords: ["data structures", "inverted index", "suffix trees", "information retrieval"],
    relevanceScore: 0.84,
    category: "academic"
  },
  {
    id: "24",
    title: "Text Classification for Search Improvement",
    url: "https://www.kaggle.com/learn/text-classification-for-search",
    description: "This practical course covers how text classification techniques can enhance search systems through better query understanding and document categorization.",
    keywords: ["text classification", "search engines", "information retrieval", "machine learning"],
    relevanceScore: 0.78,
    category: "course"
  },
  {
    id: "25",
    title: "Cosine Similarity in Vector Space Retrieval",
    url: "https://www.sciencedirect.com/science/article/pii/S0020025512004306",
    description: "An in-depth look at cosine similarity as a ranking measure in vector space models, with mathematical foundations and optimizations for large-scale implementations.",
    keywords: ["cosine similarity", "vector space model", "information retrieval", "ranking algorithm"],
    relevanceScore: 0.86,
    category: "academic"
  },
  {
    id: "26",
    title: "Boolean Algebra in Search Queryies",
    url: "https://www.searchenginejournal.com/boolean-search-operators/374856/",
    description: "A comprehensive guide to using boolean operators in search queries, with examples of complex boolean expressions and their application in different search contexts.",
    keywords: ["boolean search", "query operators", "boolean algebra", "advanced search"],
    relevanceScore: 0.73,
    category: "tutorial"
  },
  {
    id: "27",
    title: "Implementing Inverted Indices for Large Datasets",
    url: "https://github.com/apache/lucene/wiki/ImplementingInvertedIndices",
    description: "A detailed guide on efficiently implementing inverted indices for handling large-scale document collections, including compression techniques and optimization strategies.",
    keywords: ["inverted index", "large-scale", "search engines", "information retrieval", "implementation"],
    relevanceScore: 0.89,
    category: "tutorial"
  },
  {
    id: "28",
    title: "Fuzzy Search Techniques for Approximate Matching",
    url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-fuzzy-query.html",
    description: "This guide explains fuzzy search algorithms that allow for approximate matching, including edit distance calculations and n-gram approaches for handling typos and variations.",
    keywords: ["fuzzy search", "approximate matching", "edit distance", "information retrieval"],
    relevanceScore: 0.83,
    category: "tutorial"
  },
  {
    id: "29",
    title: "Query Log Analysis for Search Optimization",
    url: "https://dl.acm.org/doi/10.1145/3477495.3531816",
    description: "A research paper analyzing search query logs to improve search engine performance through pattern discovery and behavioral insights from user interactions.",
    keywords: ["query log analysis", "search optimization", "user behavior", "information retrieval"],
    relevanceScore: 0.76,
    category: "research"
  },
  {
    id: "30",
    title: "Positional Indexing for Phrase Queries",
    url: "https://nlp.stanford.edu/IR-book/html/htmledition/positional-postings-1.html",
    description: "A detailed explanation of how positional indexing works to support phrase queries and proximity searches, with implementation details and performance considerations.",
    keywords: ["positional index", "phrase queries", "information retrieval", "search engines"],
    relevanceScore: 0.91,
    category: "academic"
  },
];

export const getSearchResults = (
  query: string,
  filters: { categories?: string[] } = {},
  page: number = 1,
  resultsPerPage: number = 5,
  searchModel: SearchModel = 'vector',
  useSpellingCorrection: boolean = true
): {
  results: SearchResultData[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  didYouMean?: string;
} => {
  // If query is empty, return empty results
  if (!query.trim()) {
    return {
      results: [],
      totalResults: 0,
      currentPage: 1,
      totalPages: 0
    };
  }

  // Use our search engine with the specified model and spelling correction option
  const searchResults = searchWithEngine(
    query, 
    filters, 
    page, 
    resultsPerPage, 
    searchModel,
    useSpellingCorrection
  );
  
  return searchResults;
};

// Get unique categories for filtering
export const getUniqueCategories = (): string[] => {
  const categories = new Set<string>();
  mockSearchResults.forEach(result => {
    categories.add(result.category);
  });
  return Array.from(categories);
};
