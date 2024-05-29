import MainLayout from '@/components/Layout/MainLayout';
import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';
import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState();

  // Kategori seçimini dinleyen fonksiyon
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const fetcher = async (url) => {
    const response = (await axios.get(url)).data;
    return response;
  };

  const { data, error, isLoading } = useSWR(
    selectedCategory == undefined
      ? [`https://dummyjson.com/products`]
      : [`https://dummyjson.com/products/category/${selectedCategory}`],
    fetcher,
    {
      refreshInterval: 360000,
    }
  );

  return (
    <MainLayout>
      <div className={'flex   mx-auto p-4  flex-col items-center justify-center'}>
        <Search onCategorySelect={handleCategoryChange}></Search>
        <div className='grid grid-cols-3 gap-8 max-w-7xl  max-md:w-screen   max-md:flex max-md:flex-col  place-items-center  '>
          {isLoading ? (
            <div className='mt-52 rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute'></div>
          ) : (
            data?.products?.map((data, key) => {
              return <ProductCard key={key} data={data}></ProductCard>;
            })
          )}
        </div>
      </div>
    </MainLayout>
  );
}
