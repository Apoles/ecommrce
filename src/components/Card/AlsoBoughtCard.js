import { fetchDataById } from '@/Store/CartSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MyButton from '../MyButton';

const AlsoBoughtCard = () => {
  // Redux store'a aksiyon göndermek için kullanılan hook
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/category/vehicle?limit=4');
        setData(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='xl:mt-8 xl:block max-md:hidden'>
      <h2 className='text-2xl font-semibold text-gray-900'>People also bought</h2>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {data.map((item) => (
          <article key={item.id} className='space-y-6 overflow-hidden rounded-lg border border-gray-200 p-6 shadow-sm'>
            <img className='h-44 w-44 object-cover' src={item.images[0]} alt={item.title} />
            <div className='h-44'>
              <h3 className='text-lg font-semibold leading-tight text-gray-900 hover:underline'>{item.title}</h3>
              <p className='mt-2 text-base font-normal text-gray-500'>{item.description}</p>
            </div>
            <div>
              <p className='text-lg font-bold text-gray-900'>
                <span className='line-through'>{item.price}</span>
              </p>
              <p className='text-lg font-bold leading-tight text-red-600'>{item.price}</p>
            </div>
            <div className='mt-6 flex items-center gap-2.5'>
              <MyButton
                onClick={() => dispatch(fetchDataById(item.id))}
                type='button'
                className='inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300'
                text='Add to cart'
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AlsoBoughtCard;
