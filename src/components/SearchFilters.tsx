
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
}

interface SearchFiltersProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  title,
  options,
  selectedOptions,
  onChange,
  className
}) => {
  const handleToggle = (id: string) => {
    if (selectedOptions.includes(id)) {
      onChange(selectedOptions.filter(option => option !== id));
    } else {
      onChange([...selectedOptions, id]);
    }
  };

  return (
    <div className={cn("rounded-lg border border-neonBlue/20 p-4", className)}>
      <h3 className="text-lg font-medium text-neonBlue mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`filter-${option.id}`} 
              checked={selectedOptions.includes(option.id)}
              onCheckedChange={() => handleToggle(option.id)}
              className="border-neonBlue/50 data-[state=checked]:bg-neonBlue data-[state=checked]:text-darkBlue"
            />
            <Label 
              htmlFor={`filter-${option.id}`}
              className="text-sm cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
