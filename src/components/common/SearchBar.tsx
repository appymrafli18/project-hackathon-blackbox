import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
}

export const SearchBar = ({ 
  placeholder = 'Search...',
  onSearch,
  onFilterClick
}: SearchBarProps) => {
  return (
    <div className="relative flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
        />
      </div>
      <button 
        onClick={onFilterClick}
        className="px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all"
      >
        <Filter className="w-5 h-5" />
      </button>
    </div>
  );
};

