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
