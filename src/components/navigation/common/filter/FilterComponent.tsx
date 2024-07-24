import React, { useState } from 'react';

interface FilterProps {
  fields: { name: string; label: string; type: string }[];
  data: any[];
  onFilter: (filteredData: any[]) => void;
}

const FilterComponent: React.FC<FilterProps> = ({ fields, data, onFilter }) => {
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

  const applyFilters = () => {
    let filteredData = data;

    for (const field of fields) {
      if (filters[field.name]) {
        if (field.type === 'date') {
          const filterDate = new Date(filters[field.name]).toISOString().split('T')[0];
          filteredData = filteredData.filter(item => new Date(item[field.name]).toISOString().split('T')[0] === filterDate);
        } else {
          filteredData = filteredData.filter(item =>
            item[field.name]?.toString().toLowerCase().includes(filters[field.name].toLowerCase())
          );
        }
      }
    }

    onFilter(filteredData);
  };

  const clearFilters = () => {
    const clearedFilters = fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {} as { [key: string]: any });

    setFilters(clearedFilters);
    onFilter(data);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 dark:border-none dark:bg-dark-gray-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {fields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text">{field.label}:</label>
            <input
              type={field.type}
              name={field.name}
              value={filters[field.name] || ''}
              onChange={handleFilterChange}
              className="mt-1 block w-full border rounded px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 dark:bg-dark-gray-0.5 dark:border-none"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-2">
        <button className="bg-cyan-800 hover:bg-cyan-900 text-white px-4 py-2 rounded shadow" onClick={applyFilters}>Filtrar</button>
        <button className="bg-red-800 text-white px-4 py-2 rounded shadow" onClick={clearFilters}>Limpar Filtros</button>
      </div>
    </div>
  );
};

export default FilterComponent;
