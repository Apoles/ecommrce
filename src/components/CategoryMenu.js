import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingUi/LoadingSpinner';
import CategoryRating from './CategoryMenu/CategoryRating';

const CategoryMenu = ({ onCategorySelect, lenght }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  const [loading, setLoading] = useState(true);

  const handleCategoryChange = (value) => {
    setSelectedOption(value.replace(/ /g, '-')); //Seçilen kategoriyi  SelectedOption state'ne atıyoruz

    onCategorySelect(value.replace(/ /g, '-')); // Ana sayfaya seçilen kategoriyi gönderiyoruz
  };

  useEffect(() => {
    // API'den kategori bilgilerini çekiyoruz
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const result = (await axios.get('https://dummyjson.com/products/categories')).data;

        // Promise.all ile her kategori için istek atıyoruz. Kategoride kaç adet ürün bulunduğunun bilgisine ulaşıyoruz
        const categoriesWithCount = await Promise.all(
          result.map(async (category) => {
            try {
              const response = await axios.get(
                `https://dummyjson.com/products/category/${category.name.replace(/ /g, '-')}`
                /*   {
                  headers: {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                  },
                }*/
              );
              return {
                category: category,
                productCount: response.data.products.length,
              };
            } catch (error) {
              return {
                category: category,
                productCount: 0,
              };
            }
          })
        );

        setOptions(categoriesWithCount);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className='w-64 p-4 border-r    border-gray-200 bg-gray-50'>
      <h2 className='text-lg font-semibold mb-4 text-gray-700'>Categories</h2>
      <div>
        {options.map((option, key) => (
          <div
            onClick={() => handleCategoryChange(option.category.name)}
            className={`flex  items-center  text-xs  rounded-md mt-2 shadow-sm  ${
              selectedOption == option.category.name.replace(/ /g, '-') ? 'bg-[#333]  text-white' : 'bg-white'
            }   `}
            key={key}
          >
            <div className={`px-3 mt-1.5 flex  w-full items-center   justify-between cursor-pointer rounded-md mb-2 `}>
              <p className=''>{option.category.name}</p>
              <p className=''> {option.productCount} </p>
            </div>
          </div>
        ))}
      </div>
      <CategoryRating></CategoryRating>
    </div>
  );
};

export default CategoryMenu;
