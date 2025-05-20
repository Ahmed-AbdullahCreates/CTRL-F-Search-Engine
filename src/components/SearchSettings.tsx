import React from 'react';
import { useSearchSettings, SearchModel } from '@/context/SearchSettingsContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Info, Settings2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchSettingsProps {
  className?: string;
}

export const SearchSettings: React.FC<SearchSettingsProps> = ({ className }) => {
  const { 
    searchModel, 
    setSearchModel, 
    showDebugInfo, 
    setShowDebugInfo,
    useSpellingCorrection,
    setUseSpellingCorrection
  } = useSearchSettings();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-muted-foreground hover:text-neonBlue transition-colors rounded-full hover:bg-neonBlue/10"
          aria-label="Search Settings"
        >
          <Settings2 size={18} />
        </Button>
      </DialogTrigger>      <DialogContent className="max-w-[90vw] xs:max-w-[90vw] sm:max-w-[425px] bg-darkBlue border-neonBlue/30">
        <DialogHeader>
          <DialogTitle className="text-neonBlue text-base xs:text-lg">Search Settings</DialogTitle>
          <DialogDescription className="text-xs xs:text-sm">
            Configure information retrieval algorithms and settings
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 xs:gap-4 py-3 xs:py-4">
          <div className="grid grid-cols-[80px_1fr] xs:grid-cols-4 items-center gap-2 xs:gap-4">
            <Label htmlFor="search-model" className="text-right text-xs xs:text-sm">
              Algorithm
            </Label>
            <div className="col-span-1 xs:col-span-3">
              <Select
                value={searchModel}
                onValueChange={(value) => setSearchModel(value as SearchModel)}
              >
                <SelectTrigger className="w-full bg-secondary border-neonBlue/20 h-8 xs:h-10 text-xs xs:text-sm">
                  <SelectValue placeholder="Select search algorithm" />
                </SelectTrigger>
                <SelectContent className="bg-darkBlue border-neonBlue/30 text-xs xs:text-sm">
                  <SelectItem value="boolean" className="hover:text-neonBlue">Boolean Retrieval</SelectItem>
                  <SelectItem value="vector" className="hover:text-neonBlue">Vector Space (TF-IDF)</SelectItem>
                  <SelectItem value="phrase" className="hover:text-neonBlue">Phrase Matching</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-1 xs:mt-2 flex items-center">
                <Info size={12} className="text-muted-foreground mr-1" />
                <p className="text-xxs xs:text-xs text-muted-foreground">
                  {searchModel === 'boolean' 
                    ? 'Boolean Retrieval uses exact matching of terms' 
                    : searchModel === 'vector'
                      ? 'Vector Space Model uses TF-IDF weighting for ranking'
                      : 'Phrase Matching requires exact sequence of query terms'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-[80px_1fr] xs:grid-cols-4 items-center gap-2 xs:gap-4">
            <Label htmlFor="spelling-correction" className="text-right text-xs xs:text-sm">
              Spelling Fix
            </Label>
            <div className="flex items-center gap-2 col-span-1 xs:col-span-3">
              <Switch 
                id="spelling-correction" 
                checked={useSpellingCorrection} 
                onCheckedChange={setUseSpellingCorrection}
                className="data-[state=checked]:bg-neonBlue h-4 w-8 xs:h-5 xs:w-10"
              />
              <Label htmlFor="spelling-correction" className="text-xs xs:text-sm">
                Auto-correct spelling
              </Label>
              <div className="ml-1 xs:ml-2 hidden xs:block">
                <Info size={12} className="text-muted-foreground" />
                <span className="sr-only">
                  Automatically fixes misspelled search terms
                </span>
              </div>
            </div>
          </div>          <div className="grid grid-cols-[80px_1fr] xs:grid-cols-4 items-center gap-2 xs:gap-4">
            <Label htmlFor="debug-info" className="text-right text-xs xs:text-sm">
              Debug Info
            </Label>
            <div className="flex items-center gap-2 col-span-1 xs:col-span-3">
              <Switch 
                id="debug-info" 
                checked={showDebugInfo} 
                onCheckedChange={setShowDebugInfo}
                className="data-[state=checked]:bg-neonBlue h-4 w-8 xs:h-5 xs:w-10"
              />
              <Label htmlFor="debug-info" className="text-xs xs:text-sm">
                Show search details
              </Label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};