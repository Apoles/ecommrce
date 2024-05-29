import Link from 'next/link';
import MyButton from './MyButton';
import { StarIcon } from '@heroicons/react/24/solid';

function slugify(productName) {
  return productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Alfanümerik olmayan karakterleri tire ile değiştirir
    .replace(/^-+|-+$/g, ''); // Başta ve sonda bulunan tireleri kaldırır
}

const ProductCard = ({ data }) => (
  <div className='max-w-xs p-5  max-md:max-w-xl max-md:p-4   border border-gray-200 rounded-lg shadow '>
    <Link href={`/product/${slugify(data.title)}?id=${data.id}`} as={`/product/${slugify(data.title)}`}>
      {' '}
      <img className='rounded-t-lg ' src={data.thumbnail} alt='alt' />
      <h5 className=' h-16 mb-2 mt-4 text-2xl font-bold tracking-tight '>{data.title}</h5>
      <p className='mb-3 font-normal h-32  text-gray-700 overflow-clip '>{data.description}</p>
      <div className='flex flex-row  space-x-4 mb-3'>
        <p className=' font-normal text-gray-900 '>{data.price} $</p>
        <div className='flex flex-row space-x-1'>
          <StarIcon className='w-6 h-6 text-yellow-400' />
          <p className=' font-normal text-gray-900'>{data.rating} </p>
        </div>
      </div>
      <p className='text-black my-2 font-bold hover:text-gray-700 '>{data.reviews.length} Comment </p>
      <p className='text-gray-800 mb-2'>{data.returnPolicy}</p>
      <div className='flex flex-wrap space-x-3'>
        {data.tags?.map((e, key) => {
          return (
            <p key={key} className='mb-3   font-bold text-gray-900'>
              # {e}
            </p>
          );
        })}
      </div>
    </Link>

    <div className='flex flex-wrap gap-4 mt-10'>
      <MyButton text='Buy Now'></MyButton>
      <Link href={'/deneme'}>
        {' '}
        <MyButton text='Add to Card'></MyButton>
      </Link>
    </div>
  </div>
);

export default ProductCard;
