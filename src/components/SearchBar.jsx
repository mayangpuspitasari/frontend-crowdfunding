import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Cari sesuatu...' }) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative max-full mx-auto mb-6">
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-5 py-3 pl-12 text-sm border border-orange-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
      />
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-orange-400">
        <Search size={18} />
      </div>
    </div>
  );
};

export default SearchBar;

