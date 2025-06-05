import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ 
  isMobile, 
  onCloseMobileSearch,
   
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim() !== '') {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setSearchQuery('');
      if (isMobile && onCloseMobileSearch) onCloseMobileSearch();
    }
  };

  if (isMobile) {
    return (
      <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 px-4 py-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white py-3 px-4 pl-11 rounded-lg text-base"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery);
              }
            }}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
          <button
            onClick={onCloseMobileSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative hidden lg:flex items-center transition-all duration-200 ${searchFocused ? 'w-80' : 'w-56'}`}>
      <div className={`absolute inset-0 bg-gray-50 dark:bg-gray-800 rounded-full transition-all duration-200 ${searchFocused ? 'opacity-100' : 'opacity-60'}`}></div>
      <input
        type="text"
        placeholder="Search collections..."
        className="relative bg-transparent border-0 focus:ring-0 outline-none text-gray-900 dark:text-white py-2.5 px-4 pl-11 w-full text-sm"
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(searchQuery);
          }
        }}
      />
      <Search className="absolute left-4 text-gray-500 dark:text-gray-400" size={16} />
    </div>
  );
};

export default SearchBar;