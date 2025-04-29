import React from 'react';
import { cn } from '@/lib/utils';
import { Search, Zap, Crosshair } from 'lucide-react';

interface SearchLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const SearchLogo: React.FC<SearchLogoProps> = ({ className, size = 'md', animated = true }) => {
  const sizeClasses = {
    xs: 'text-lg md:text-xl',
    sm: 'text-xl md:text-2xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
  };

  const iconSizes = {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
  };

  // Circle sizes for the target/search element
  const circleSizes = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  // Inner element sizes
  const innerSizes = {
    xs: { size: 8, top: 0.5, left: 0.5 },
    sm: { size: 10, top: 0.5, left: 0.5 },
    md: { size: 12, top: 1, left: 1 },
    lg: { size: 14, top: 1, left: 1 },
  };

  return (
    <div className={cn(
      "font-bold tracking-tighter text-neonBlue relative transition-all duration-300",
      animated && "hover:scale-105",
      sizeClasses[size], 
      className
    )}>
      {/* Enhanced glow effect container */}
      <div className={cn(
        "absolute inset-0 blur-md bg-neonBlue/20 rounded-lg -z-10",
        animated && "animate-glow"
      )}></div>
      
      <div className="flex items-center">
        {/* Logo symbol */}
        <div className="relative mr-2 flex items-center justify-center">
          <div className={cn(
            "rounded-lg border-2 border-neonBlue p-0.5 flex items-center justify-center relative",
            size === "xs" ? "w-6 h-6" : size === "sm" ? "w-7 h-7" : size === "md" ? "w-8 h-8" : "w-10 h-10"
          )}>
            <Search size={iconSizes[size]} className="text-neonBlue" />
            <Zap 
              size={iconSizes[size]/2} 
              className={cn(
                "absolute -top-1 -right-1 text-neonBlue",
                animated && "animate-pulse"
              )} 
              fill="currentColor" 
            />
          </div>
          
          {/* Circuit elements */}
          <div className="absolute -bottom-1 left-1/2 w-2/3 h-px bg-neonBlue/60"></div>
          <div className="absolute -top-1 right-1/2 w-1/3 h-px bg-neonBlue/60"></div>
          <div className="absolute -left-1 top-1/2 w-px h-1/3 bg-neonBlue/60"></div>
        </div>
        
        {/* Text logo */}
        <div className="flex items-center">
          <span className="mr-1 relative">
            C
            <span className={cn(
              "absolute -top-1 -right-1 w-1 h-1 bg-neonBlue rounded-full", 
              animated && "animate-pulse"
            )}></span>
          </span>
          <span className="mr-1 relative">TR</span>
          <span className="relative inline-flex items-center">
            L
            {/* Enhanced circular target/search element */}
            <span className={cn(
              "relative inline-block ml-0.5",
              "group" // Add group for hover effect coordination
            )}>
              {/* Crosshair elements */}
              <span className={cn(
                "absolute border-t border-neonBlue/70 w-full",
                "top-1/2 -translate-y-1/2 scale-x-0", 
                animated && "group-hover:scale-x-100 transition-transform duration-300"
              )}></span>
              <span className={cn(
                "absolute border-l border-neonBlue/70 h-full",
                "left-1/2 -translate-x-1/2 scale-y-0", 
                animated && "group-hover:scale-y-100 transition-transform duration-300"
              )}></span>
              
              {/* Pulsing center dot */}
              <span className={cn(
                "absolute rounded-full bg-neonBlue/80",
                animated && "animate-ping",
                size === "xs" ? "w-1.5 h-1.5" : size === "sm" ? "w-2 h-2" : size === "md" ? "w-2.5 h-2.5" : "w-3 h-3"
              )}
              style={{ 
                top: `${innerSizes[size].top}rem`, 
                left: `${innerSizes[size].left}rem`, 
                opacity: 0.7
              }}></span>
              
              {/* Main circle */}
              <span className={cn(
                "inline-block rounded-full border-2 border-neonBlue relative overflow-hidden",
                circleSizes[size],
                animated && "transition-all duration-300 group-hover:border-neonBlue/100 group-hover:shadow-[0_0_5px_rgba(51,195,240,0.5)]"
              )}>
                {/* Scanning effect */}
                <span className={cn(
                  "absolute top-0 h-full w-1 bg-gradient-to-b from-transparent via-neonBlue to-transparent left-0",
                  animated && "animate-scanner"
                )}></span>
              </span>
            </span>
            <span className="ml-1">F</span>
          </span>
          <div className="ml-1 inline-flex items-center">
            <span className={cn("w-1.5 h-0.5 bg-neonBlue mx-0.5", animated && "animate-blink")}></span>
            <span className={cn("w-1.5 h-0.5 bg-neonBlue mx-0.5", animated && "animate-blink")} style={{ animationDelay: '0.2s' }}></span>
            <span className={cn("w-1.5 h-0.5 bg-neonBlue mx-0.5", animated && "animate-blink")} style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </div>
      
      {/* Enhanced circuit line decorations */}
      <div className="absolute -bottom-1 left-1/4 w-1/2 h-px bg-neonBlue/40"></div>
      <div className="absolute -top-1 right-1/4 w-1/4 h-px bg-neonBlue/40"></div>
      <div className="absolute -right-1 top-1/3 h-1/4 w-px bg-neonBlue/40"></div>
    </div>
  );
};
