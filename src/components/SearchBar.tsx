import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, X, Mic, ArrowRight } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

interface SearchBarProps {
  initialQuery?: string;
  className?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const suggestions = [
  'information retrieval',
  'search engines',
  'boolean retrieval',
  'tf-idf',
  'vector space model',
  'pagerank algorithm',
  'query expansion',
  'relevance feedback',
];

export const SearchBar: React.FC<SearchBarProps> = ({ 
  initialQuery = '', 
  className,
  autoFocus = false,
  onSearch,
  size = 'md'
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Size variants
  const inputSizeClasses = {
    sm: 'h-10 text-sm',
    md: 'h-12 text-base',
    lg: 'h-14 text-lg',
  };

  const buttonSizeClasses = {
    sm: 'h-10 px-3',
    md: 'h-12 px-4',
    lg: 'h-14 px-6',
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = suggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    } else {
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    }
    setShowSuggestions(false);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser');
      return;
    }

    // Using any type because webkitSpeechRecognition is not in the TypeScript types
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const clearSearch = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={cn("w-full max-w-3xl relative", className)}>
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // Delay hiding suggestions to allow clicking on them
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder="Search for information..."
            aria-label="Search input"
            className={cn(
              "rounded-l-md pr-20 pl-4 bg-secondary border-neonBlue/20 focus:border-neonBlue focus:ring-2 focus:ring-neonBlue/50 focus:search-bar-glow transition-all duration-300",
              inputSizeClasses[size]
            )}
          />
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neonBlue transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="button"
            onClick={handleVoiceSearch}
            disabled={isListening}
            className={cn(
              "absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-neonBlue transition-colors",
              isListening ? "text-red-500 animate-pulse" : ""
            )}
            aria-label="Voice search"
          >
            <Mic size={18} />
          </button>
        </div>
        <Button 
          type="submit" 
          className={cn(
            "rounded-l-none bg-neonBlue hover:bg-neonBlue/80 text-darkBlue flex items-center gap-2 font-medium shadow-glow-sm hover:shadow-glow-md transition-all duration-300", 
            buttonSizeClasses[size]
          )}
        >
          <span className="hidden sm:inline">Search</span>
          <Search size={size === "sm" ? 16 : size === "md" ? 18 : 20} />
        </Button>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-darkBlue/95 backdrop-blur-sm border border-neonBlue/30 rounded-md shadow-glow-sm z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul>
            {filteredSuggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="group flex justify-between items-center px-4 py-2.5 hover:bg-neonBlue/10 cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-2">
                  <Search size={14} className="text-gray-400" />
                  <span className="text-gray-100">{suggestion}</span>
                </div>
                <ArrowRight 
                  size={14} 
                  className="text-neonBlue opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
