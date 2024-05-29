import { useEffect, useState } from 'react';

export default function Search({ onCategorySelect }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);

    onCategorySelect(selectedCategory); // Ana sayfaya seçilen kategoriyi gönder
  };

  useEffect(() => {
    // API'den veri çekme
    const fetchOptions = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div className='max-w-5xl  my-4   w-full mx-auto max-sm:p-4 '>
      <label htmlFor='default-search' className='text-sm font-medium text-gray-900 sr-only dark:text-white'>
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
          placeholder='Search '
          required
        />

        <div className='absolute end-0 bottom-0 px-4 py-1.5  max-sm:w-32   '>
          <label htmlFor='countries' className='block mb-2 text-sm font-medium text-transparent max-sm:hidden  '>
            Select an option
          </label>
          <select
            value={selectedOption}
            onChange={handleCategoryChange}
            id='countries'
            className='bg-[#333] border  text-white text-sm rounded-lg  block w-full p-2.5 '
          >
            {options.map((option, key) => (
              <option key={key} value={option.slug}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
