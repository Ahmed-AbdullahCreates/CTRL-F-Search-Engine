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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-darkBlue border-neonBlue/30">
        <DialogHeader>
          <DialogTitle className="text-neonBlue">Search Settings</DialogTitle>
          <DialogDescription>
            Configure information retrieval algorithms and settings
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="search-model" className="text-right">
              Algorithm
            </Label>
            <div className="col-span-3">
              <Select
                value={searchModel}
                onValueChange={(value) => setSearchModel(value as SearchModel)}
              >
                <SelectTrigger className="w-full bg-secondary border-neonBlue/20">
                  <SelectValue placeholder="Select search algorithm" />
                </SelectTrigger>
                <SelectContent className="bg-darkBlue border-neonBlue/30">
                  <SelectItem value="boolean" className="hover:text-neonBlue">Boolean Retrieval</SelectItem>
                  <SelectItem value="vector" className="hover:text-neonBlue">Vector Space (TF-IDF)</SelectItem>
                  <SelectItem value="phrase" className="hover:text-neonBlue">Phrase Matching</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2 flex items-center">
                <Info size={14} className="text-muted-foreground mr-1" />
                <p className="text-xs text-muted-foreground">
                  {searchModel === 'boolean' 
                    ? 'Boolean Retrieval uses exact matching of terms' 
                    : searchModel === 'vector'
                      ? 'Vector Space Model uses TF-IDF weighting for ranking'
                      : 'Phrase Matching requires exact sequence of query terms'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="spelling-correction" className="text-right">
              Spelling Fix
            </Label>
            <div className="flex items-center gap-2 col-span-3">
              <Switch 
                id="spelling-correction" 
                checked={useSpellingCorrection} 
                onCheckedChange={setUseSpellingCorrection}
                className="data-[state=checked]:bg-neonBlue"
              />
              <Label htmlFor="spelling-correction" className="text-sm">
                Auto-correct spelling errors
              </Label>
              <div className="ml-2">
                <Info size={14} className="text-muted-foreground" />
                <span className="sr-only">
                  Automatically fixes misspelled search terms
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="debug-info" className="text-right">
              Debug Info
            </Label>
            <div className="flex items-center gap-2 col-span-3">
              <Switch 
                id="debug-info" 
                checked={showDebugInfo} 
                onCheckedChange={setShowDebugInfo}
                className="data-[state=checked]:bg-neonBlue"
              />
              <Label htmlFor="debug-info" className="text-sm">
                Show search process details
              </Label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};