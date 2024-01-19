
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="relative flex items-center text-base pl-1.2 sm:pl-2 md:pl-4 lg:pl-6">
      <FaSearch className="absolute left-2 sm:left-3 text-black" />
      <input
        type="text"
        placeholder="Search Questions?"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="border-none pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-black text-base sm:text-lg lg:text-xl"
      />
    </div>
  );
};

export default SearchBar;
