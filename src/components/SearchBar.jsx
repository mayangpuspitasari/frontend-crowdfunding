import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="p-6">
         <input
      type="text"
      value={keyword}
      onChange={handleChange}
      placeholder="Siapa Yang Ingin Kamu Bantu..."
      className="w-full p-2 border border-orange-400 rounded-full"
    />
    </div>
   
  );
};

export default SearchBar;
