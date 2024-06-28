import { StarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Search({ onSearchSelect }) {
  const handleInputChange = async (e) => {
    const value = e.target.value;
    console.log(value, '=calue');
    onSearchSelect(value);
  };

  return (
    <div className='max-w-5xl my-4 w-full mx-auto max-sm:p-4'>
      {/* Arama etiketi */}
      <label htmlFor='default-search' className='text-sm font-medium text-gray-900 sr-only '>
        Search
      </label>
      <div className='relative'>
        {/* Arama ikonu */}
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <MagnifyingGlassIcon className=' w-6 h-6 text-gray-400' />
        </div>
        {/* Arama inputu */}
        <input
          type='search'
          id='search'
          className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Search'
          required
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
