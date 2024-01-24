
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
    <div className="relative flex items-center text-base pt-2 pl-1.2 mx-auto my-4 sm:pl-2 md:pl-4 lg:pl-6 md:w-1/3 md:-ml-[2%] lg:ml-0 md:mb-6 lg:w-auto">
      <FaSearch className="absolute left-4 sm:left-4 md:left-7 text-black" />
      <input
        type="text"
        placeholder="Search Questions?"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="sm:border md:w-[215px] lg:w-auto sm:border-slate-600 md:border-none pl-12 md:pl-8 pr-4 py-2 rounded-md focus:outline-none focus:border-blue-500 text-black placeholder-black text-base sm:text-lg lg:text-xl focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default SearchBar;
