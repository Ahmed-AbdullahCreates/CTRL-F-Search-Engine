import React from 'react';
import { SearchBar } from '@/components/SearchBar';
import { SearchLogo } from '@/components/SearchLogo';
import { SearchHistory } from '@/components/SearchHistory';
import { CircuitAnimation } from '@/components/CircuitAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Gauge, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-radial from-darkBlue to-deepBlue bg-digital-grid">
      <CircuitAnimation />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-px h-20 bg-neonBlue/20 circuit-line"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-px bg-neonBlue/20 circuit-line"></div>
        <div className="absolute top-1/3 right-1/5 w-2 h-2 rounded-full border border-neonBlue/40 circuit-node"></div>
        
        {/* Main content */}
        <div className="w-full max-w-3xl flex flex-col items-center gap-8 backdrop-blur-sm p-8 rounded-2xl border border-neonBlue/20 bg-darkBlue/20 shadow-lg shadow-neonBlue/5">
          <div className="flex flex-col items-center animate-fade-in text-center">
            <SearchLogo size="lg" className="mb-6" />
            <h1 className="text-neonBlue text-2xl md:text-3xl font-light mb-2">Information Retrieval System</h1>
            {/* <p className="text-neonBlue/70 text-sm md:text-base max-w-md">
              Discover knowledge with precision-engineered search algorithms
            </p> */}
          </div>
          
          <div className="w-full animate-fade-in" style={{ animationDelay: '100ms' }}>
            <SearchBar autoFocus size="lg" />
          </div>
          
          <div className="w-full animate-fade-in" style={{ animationDelay: '200ms' }}>
            <SearchHistory />
          </div>
          
          {/* Feature highlights */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex flex-col items-center p-4 rounded-lg border border-neonBlue/20 bg-darkBlue/30 hover:bg-darkBlue/40 transition-colors">
              <Sparkles size={24} className="text-neonBlue mb-2" />
              <h3 className="text-neonBlue font-medium text-sm mb-1">Advanced Algorithms</h3>
              <p className="text-xs text-center text-muted-foreground">Using cutting-edge vector embedding technology</p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg border border-neonBlue/20 bg-darkBlue/30 hover:bg-darkBlue/40 transition-colors">
              <Database size={24} className="text-neonBlue mb-2" />
              <h3 className="text-neonBlue font-medium text-sm mb-1">Extensive Knowledge Base</h3>
              <p className="text-xs text-center text-muted-foreground">Access to billions of indexed documents</p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg border border-neonBlue/20 bg-darkBlue/30 hover:bg-darkBlue/40 transition-colors">
              <Gauge size={24} className="text-neonBlue mb-2" />
              <h3 className="text-neonBlue font-medium text-sm mb-1">Lightning Fast</h3>
              <p className="text-xs text-center text-muted-foreground">Optimized for sub-second response times</p>
            </div>
          </div>
          
          {/* Call to action */}
          {/* <div className="mt-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Link to="/about">
              <Button variant="outline" className="border-neonBlue/40 hover:bg-neonBlue/10 group">
                Learn about our technology
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>  */}
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-neonBlue/20">
        {/* <div className="container max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p>© 2025 CTRL+F | Quantum Information Retrieval System</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="text-xs hover:text-neonBlue transition-colors">Privacy</a>
            <a href="#" className="text-xs hover:text-neonBlue transition-colors">Terms</a>
            <a href="#" className="text-xs hover:text-neonBlue transition-colors">Contact</a>
          </div>
        </div> */}
      </footer>
    </div>
  );
};

export default Home;
