
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const SearchPagination: React.FC<SearchPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Show dots or pages depending on current page
      if (currentPage <= 3) {
        pageNumbers.push(2, 3, 4, '...');
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push('...', totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-neonBlue/30 hover:bg-neonBlue/10 hover:border-neonBlue xs:px-3 px-2"
      >
        <span className="hidden xs:inline">Previous</span>
        <span className="xs:hidden">Prev</span>
      </Button>
      
      <div className="flex flex-wrap items-center gap-1 justify-center">
        {pageNumbers.map((pageNumber, index) => (
          pageNumber === '...' ? (
            <span key={`ellipsis-${index}`} className="px-1 xs:px-2 text-muted-foreground">...</span>
          ) : (
            <Button
              key={`page-${pageNumber}`}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="sm"
              onClick={() => typeof pageNumber === 'number' && onPageChange(pageNumber)}
              className={
                currentPage === pageNumber
                  ? "bg-neonBlue text-darkBlue hover:bg-neonBlue/90 h-8 w-8 p-0"
                  : "border-neonBlue/30 hover:bg-neonBlue/10 hover:border-neonBlue h-8 w-8 p-0"
              }
            >
              {pageNumber}
            </Button>
          )
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-neonBlue/30 hover:bg-neonBlue/10 hover:border-neonBlue xs:px-3 px-2"
      >
        <span className="hidden xs:inline">Next</span>
        <span className="xs:hidden">Next</span>
      </Button>
    </div>
  );
};
