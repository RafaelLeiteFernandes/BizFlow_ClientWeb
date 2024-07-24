import React from 'react';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w- auto px-4 py-2 border dark:bg-dark-gray-0.5 dark:border-dark-gray-1 border-gray-300  rounded-lg focus:outline-none focus:border-gray-500"
        placeholder="Buscar..."
      />
    </div>
  );
};

export default SearchBox;