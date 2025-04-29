
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SearchLogo } from '@/components/SearchLogo';
import { CircuitAnimation } from '@/components/CircuitAnimation';
import { ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-darkBlue to-deepBlue p-4 relative">
      <CircuitAnimation />
      
      <div className="flex flex-col items-center justify-center backdrop-blur-sm p-8 rounded-2xl border border-neonBlue/20 bg-darkBlue/40 shadow-lg shadow-neonBlue/5 animate-fade-in max-w-md w-full">
        <SearchLogo size="md" className="mb-8" />
        
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-xl bg-neonBlue/20 rounded-full"></div>
          <h1 className="text-6xl font-bold text-neonBlue relative">404</h1>
        </div>
        
        <p className="text-xl text-foreground mb-2">Page not found</p>
        <p className="text-center text-muted-foreground mb-8 max-w-xs">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
          <Button asChild variant="outline" className="border-neonBlue/30 hover:border-neonBlue hover:bg-neonBlue/10 gap-2">
            <Link to="/">
              <ArrowLeft size={16} />
              Go Home
            </Link>
          </Button>
          <Button asChild className="bg-neonBlue text-darkBlue hover:bg-neonBlue/80 gap-2">
            <Link to="/">
              <Search size={16} />
              New Search
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
