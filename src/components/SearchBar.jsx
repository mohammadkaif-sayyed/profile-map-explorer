import React, { useState } from 'react';
import { useProfiles } from '../contexts/ProfileContext';
import { Search } from 'lucide-react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchProfiles } = useProfiles();

  const handleSearch = (e) => {
    e.preventDefault();
    searchProfiles(searchTerm);
  };

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    searchProfiles(newSearchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search profiles..."
          className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

