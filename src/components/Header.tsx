import React from 'react';
import { Link } from 'react-router-dom';
import { SearchLogo } from './SearchLogo';
import { SearchBar } from './SearchBar';
import { SearchSettings } from './SearchSettings';
import { cn } from '@/lib/utils';
import { GithubIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  showSearch?: boolean;
  initialQuery?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  showSearch = true,
  initialQuery = '',
  className 
}) => {
  return (
    <header className={cn(
      "w-full border-b border-neonBlue/20 bg-darkBlue/80 backdrop-blur-md sticky top-0 z-50 shadow-md shadow-neonBlue/5",
      className
    )}>
      <div className="container max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <SearchLogo size="sm" animated={true} className="group-hover:scale-105 transition-transform" />
            <div className="ml-3 hidden md:block">
              <p className="text-xs text-neonBlue/70 font-light tracking-wider">
                SEARCH ENGINE
              </p>
            </div>
          </Link>
          
          {showSearch && (
            <div className="flex-grow max-w-2xl mx-4">
              <SearchBar initialQuery={initialQuery} size="sm" />
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <SearchSettings />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-neonBlue transition-colors rounded-full hover:bg-neonBlue/10"
              aria-label="Information"
            >
              <Info size={16} />
            </Button>
            <a 
              href="https://github.com/Ahmed-AbdullahCreates/CTRL-F-Search-Engine" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-neonBlue transition-colors p-2 rounded-full hover:bg-neonBlue/10"
              aria-label="GitHub repository"
            >
              <GithubIcon size={16} />
            </a>
          </div>
        </div>
        
        {/* Theme line - subtle branding element */}
        <div className="flex items-center justify-between mt-1 px-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-neonBlue/70 rounded-full"></div>
            <div className="w-2 h-1 bg-neonBlue/40 rounded-full"></div>
          </div>
          <div className="h-px flex-grow mx-4 bg-gradient-to-r from-transparent via-neonBlue/30 to-transparent"></div>
          <div className="flex gap-1">
            <div className="w-2 h-1 bg-neonBlue/40 rounded-full"></div>
            <div className="w-1 h-1 bg-neonBlue/70 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
