import React, { useState } from 'react';

const FilterComponent = ({ filters, onFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleFilterSubmit = () => {
    onFilter(selectedFilter, filterValue);
  };

  return (
    <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 mb-4">
      <select
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="">Selecione um filtro</option>
        {filters.map((filter, index) => (
          <option key={index} value={filter}>
            {filter}
          </option>
        ))}
      </select>
      <input
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 flex-1 ml-4"
        type="text"
        value={filterValue}
        onChange={handleInputChange}
        placeholder="Digite o valor do filtro"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleFilterSubmit}
      >
        Filtrar
      </button>
    </div>
  );
};

export default FilterComponent;
