import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchDataById } from '@/Store/cartSlice';
import Carousel from '@/components/Carousel';
import MyButton from '@/components/MyButton';
import Rating from '@/components/Rating';
import CommentCard from '@/components/Card/CommentCard';

export default function Product({ data, error }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [price, setPrice] = useState('');

  // Veri yüklendiğinde fiyatı hesapla
  useEffect(() => {
    if (!data) {
      router.push('/'); // Veri yoksa ana sayfaya yönlendir
    } else {
      const discountedPrice = data.price / (1 - data.discountPercentage / 100);
      const formattedPrice = discountedPrice.toFixed(2);
      setPrice(formattedPrice);
    }
  }, [data]);

  // Hata durumunda hata mesajını göster
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='font-sans bg-white'>
      <div className='p-6 lg:max-w-7xl max-w-4xl mx-auto'>
        <div className='grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6'>
          {/* Ürün resimleri ve carousel */}
          <div className='lg:col-span-3 w-full lg:sticky top-0 text-center'>
            <Carousel context={data.images} />
            {/* Küçük resim galerisi */}
            <div className='mt-6 flex flex-wrap justify-center gap-6 mx-auto'>
              {data.images.map((image, index) => (
                <img key={index} src={image} alt={image.alt} className='w-24 cursor-pointer' />
              ))}
            </div>
          </div>

          {/* Ürün detayları */}
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

            {/* Ürün derecelendirmesi */}
            <div className='flex space-x-2 mt-4'>
              <Rating rating={data.rating} />
              <h4 className='text-[#333] text-base'>{data.rating} Rating</h4>
            </div>

            {/* Butonlar */}
            <div className='flex flex-wrap gap-4 mt-10'>
              <MyButton text={'Buy Now'} />
              <MyButton
                onClick={() => {
                  dispatch(fetchDataById(data.id)); // Sepete ekleme işlemi
                }}
                text={'Add to Cart'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ürün bilgileri */}
      <div className='mt-12 max-w-7xl mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6'>
        <h3 className='text-lg font-bold text-[#333]'>Product Information</h3>
        <ul className='mt-6 space-y-6 text-[#333]'>
          <li className='text-sm'>
            Brand <span className='ml-4 float-right'>{data.brand}</span>
          </li>
          <li className='text-sm'>
            Weight <span className='ml-4 float-right'>{data.weight}</span>
          </li>
          <li className='text-sm'>
            Width <span className='ml-4 float-right'>{data.dimensions.width}</span>
          </li>
          <li className='text-sm'>
            Height <span className='ml-4 float-right'>{data.dimensions.height}</span>
          </li>
          <li className='text-sm'>
            Depth <span className='ml-4 float-right'>{data.dimensions.depth}</span>
          </li>
          <li className='text-sm'>
            Warranty Information <span className='ml-4 float-right'>{data.warrantyInformation}</span>
          </li>
          <li className='text-sm'>
            Shipping Information <span className='ml-4 float-right'>{data.shippingInformation}</span>
          </li>
          <li className='text-sm'>
            Availability Status <span className='ml-4 float-right'>{data.availabilityStatus}</span>
          </li>
        </ul>
      </div>

      {/* Yorum kartları */}
      <CommentCard data={data.reviews} />
    </div>
  );
}

// Sunucu tarafında verileri getiren fonksiyon
export async function getServerSideProps(context) {
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
