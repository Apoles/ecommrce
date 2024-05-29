import Carousel from '@/components/Corosual';
import MainLayout from '@/components/Layout/MainLayout';
import MyButton from '@/components/MyButton';
import Rating from '@/components/Rating';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Product({ data, error }) {
  const [price, setprice] = useState('');

  const router = useRouter();
  useEffect(() => {
    if (data == undefined) {
      router.push('/');
    }
    if (data !== undefined) {
      const disPrice = data.price / (1 - data.discountPercentage / 100); // İndirim oranına göre ürünün gerçek fiyatı
      const price = disPrice.toFixed(2); // Ondalık sayının virgülden sonra ilk iki basamağı
      setprice(price);
    }
  });

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <MainLayout>
      <div className='font-sans bg-white'>
        <div className='p-6 lg:max-w-7xl max-w-4xl mx-auto'>
          <div className='grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6'>
            <div className='lg:col-span-3 w-full lg:sticky top-0 text-center'>
              <Carousel context={data.images}></Carousel>

              <div className='mt-6 flex flex-wrap justify-center gap-6 mx-auto'>
                {data.images.map((image, index) => (
                  <img key={index} src={image} alt={image.alt} className='w-24  cursor-pointer' />
                ))}
              </div>
            </div>

            <div className='lg:col-span-2'>
              <h2 className='text-2xl font-extrabold text-[#333]'>{data.title}</h2>
              <p className='text-md mt-4 text-[#333]'>{data.description}</p>
              <div className='flex flex-wrap gap-4 mt-4'>
                <p className='text-[#333] text-3xl font-bold'>{data.price}</p>
                <p className='text-gray-400 text-lg'>
                  <strike>{price}</strike>
                  <span className='text-sm ml-1'>Tax included</span>
                </p>
              </div>

              <div className='flex space-x-2 mt-4'>
                <Rating rating={data.rating}></Rating>
                <h4 className='text-[#333] text-base'>{data.rating} Rating</h4>
              </div>

              <div className='flex flex-wrap gap-4 mt-10'>
                <MyButton text={'Buy Now'}></MyButton>
                <MyButton text={'Add to Card'}></MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  console.log(context);
  try {
    const response = await axios.get(`https://dummyjson.com/products/${context.query.id}`);

    const data = response.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}
