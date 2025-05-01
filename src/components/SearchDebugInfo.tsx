import React from 'react';
import { useSearchSettings } from '@/context/SearchSettingsContext';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Code, Lightbulb, SpellCheck } from 'lucide-react';

interface SearchDebugInfoProps {
  query: string;
  processedQuery: string[];
  spellingCorrections?: { [term: string]: string } | null;
  topTerms?: Array<{term: string, frequency: number}> | null;
  processTime: number; // Still kept in interface for backward compatibility
  className?: string;
}

export const SearchDebugInfo: React.FC<SearchDebugInfoProps> = ({
  query,
  processedQuery = [],
  spellingCorrections = {},
  topTerms = [],
  processTime = 0, // Still accepting but not displaying this
  className
}) => {
  const { showDebugInfo, searchModel } = useSearchSettings();
  
  if (!showDebugInfo) return null;
  
  // Safely handle possibly undefined values
  const safeProcessedQuery = Array.isArray(processedQuery) ? processedQuery : [];
  const safeSpellingCorrections = spellingCorrections || {};
  const safeTopTerms = Array.isArray(topTerms) ? topTerms : [];
  
  const hasSpellingCorrections = Object.keys(safeSpellingCorrections).length > 0;
  
  return (
    <div className={cn(
      "rounded-lg border border-neonBlue/30 bg-darkBlue/40 p-3 text-sm",
      className
    )}>
      <Collapsible defaultOpen>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-neonBlue">
            <Code size={16} />
            <h3 className="font-medium">Search Process Details</h3>
          </div>
          <CollapsibleTrigger className="rounded-full hover:bg-neonBlue/10 p-1">
            <ChevronDown size={16} className="transition-transform duration-200 group-data-[state=open]/collapser:rotate-180" />
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="mt-3 space-y-3 pl-2">
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="text-muted-foreground">Algorithm:</div>
              <div className="font-mono text-neonBlue">
                {searchModel === 'boolean' ? 'Boolean Retrieval' : 
                 searchModel === 'vector' ? 'Vector Space Model (TF-IDF)' : 
                 'Phrase Matching'}
              </div>
            </div>
            
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="text-muted-foreground">Raw Query:</div>
              <div className="font-mono">{query}</div>
            </div>
            
            {/* Spelling corrections section */}
            {hasSpellingCorrections && (
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div className="text-muted-foreground flex items-center gap-1">
                  <SpellCheck size={14} className="text-neonBlue/70" />
                  <span>Corrections:</span>
                </div>
                <div>
                  {Object.entries(safeSpellingCorrections).map(([original, corrected], idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1">
                      <span className="bg-red-900/20 px-1.5 py-0.5 rounded text-xs line-through">
                        {original}
                      </span>
                      <span className="text-xs">→</span>
                      <span className="bg-green-900/20 px-1.5 py-0.5 rounded text-xs text-neonBlue">
                        {corrected}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <div className="text-muted-foreground">Processed:</div>
              <div className="font-mono flex flex-wrap gap-1">
                {safeProcessedQuery.length > 0 ? 
                  safeProcessedQuery.map((term, index) => (
                    <span key={index} className="bg-neonBlue/10 px-1.5 py-0.5 rounded text-xs">
                      {term}
                    </span>
                  ))
                  : 
                  <span className="text-muted-foreground italic">No terms after processing</span>
                }
              </div>
            </div>
            
            {/* Related terms section */}
            {safeTopTerms.length > 0 && (
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <div className="text-muted-foreground flex items-center gap-1">
                  <Lightbulb size={14} className="text-neonBlue/70" />
                  <span>Related:</span>
                </div>
                <div className="font-mono flex flex-wrap gap-1">
                  {safeTopTerms.map((item, idx) => (
                    <div key={idx} className="bg-neonBlue/5 px-1.5 py-0.5 rounded text-xs flex items-center">
                      <span>{item.term}</span>
                      <span className="ml-1 opacity-60 text-xxs">({item.frequency})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {searchModel === 'vector' && (
              <div className="border-t border-neonBlue/10 pt-2 mt-2">
                <div className="text-xs text-muted-foreground mb-1">Vector Space Model Details:</div>
                <div className="pl-2">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <div className="text-muted-foreground">Ranking:</div>
                    <div className="font-mono">TF-IDF weighted similarity</div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2 mt-1">
                    <div className="text-muted-foreground">Formula:</div>
                    <div className="font-mono text-xs">score = Σ(tf(t,d) × idf(t))</div>
                  </div>
                  <div className="mt-1 pl-2 text-muted-foreground text-xs">
                    <div>where tf(t,d) = 1 + log(frequency of term t in document d)</div>
                    <div>and idf(t) = log(N / number of documents containing t)</div>
                  </div>
                </div>
              </div>
            )}
            
            {searchModel === 'boolean' && (
              <div className="border-t border-neonBlue/10 pt-2 mt-2">
                <div className="text-xs text-muted-foreground mb-1">Boolean Model Details:</div>
                <div className="pl-2">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <div className="text-muted-foreground">Operation:</div>
                    <div className="font-mono">AND (all terms must match)</div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2 mt-1">
                    <div className="text-muted-foreground">Ranking:</div>
                    <div className="font-mono text-xs">By sum of term frequencies in matching documents</div>
                  </div>
                </div>
              </div>
            )}
            
            {searchModel === 'phrase' && (
              <div className="border-t border-neonBlue/10 pt-2 mt-2">
                <div className="text-xs text-muted-foreground mb-1">Phrase Matching Details:</div>
                <div className="pl-2">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <div className="text-muted-foreground">Operation:</div>
                    <div className="font-mono">Exact sequence matching</div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2 mt-1">
                    <div className="text-muted-foreground">Position:</div>
                    <div className="font-mono text-xs">Terms must appear in sequence with no gaps</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}