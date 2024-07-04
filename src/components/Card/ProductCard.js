import Link from 'next/link';
import MyButton from '../MyButton';
import { StarIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataById } from '../../Store/CartSlice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Notification from './NotificationCard';

// Fonksiyon: Ürün adını URL dostu şekle dönüştürür
function slugify(productName) {
  return productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Alfanümerik olmayan karakterleri tire ile değiştirir
    .replace(/^-+|-+$/g, ''); // Başta ve sonda bulunan tireleri kaldırır
}

const ProductCard = ({ data }) => {
  const [showNotification, setShowNotification] = useState(false);

  // Redux store'a aksiyon göndermek için kullanılan hook
  const dispatch = useDispatch();

  // Redux store'dan kullanıcı oturum durumu alınır
  const { loggedIn } = useSelector((state) => state.auth);

  // Next.js Router hook'u
  const router = useRouter();

  const handleProductAdd = () => {
    // Ürün ekleme işlemi başarılı olduğunda
    setShowNotification(true);

    // İsteğe bağlı olarak, bir süre sonra bildirimi kapatmak için:
    setTimeout(() => setShowNotification(false), 5000); // 5 saniye sonra kapat
  };

  return (
    <div className='max-w-xs    p-5 max-md:max-w-xl max-md:mx-6 border border-gray-200 rounded-lg shadow'>
      {/* Ürün detay sayfasına yönlendirme için Link */}
      <Link href={`/product/${slugify(data.title)}?id=${data.id}`} as={`/product/${slugify(data.title)}`}>
        <img className='rounded-t-lg' src={data.thumbnail} alt={data.title} />
        <h5 className='h-16 mb-2 mt-4 text-2xl font-bold tracking-tight'>{data.title}</h5>
        <p className='mb-3 font-normal h-32 text-gray-700 overflow-clip'>{data.description}</p>
        <div className='flex items-center space-x-4 mb-3'>
          <p className='font-normal text-gray-900'>{data.price} $</p>
          <div className='flex items-center space-x-1'>
            <StarIcon className='w-6 h-6 text-yellow-400' />
            <p className='font-normal text-gray-900'>{data.rating}</p>
          </div>
        </div>
        <p className='text-black my-2 font-bold hover:text-gray-700'>{data.reviews.length} Comment</p>
        <p className='text-gray-800 mb-2'>{data.returnPolicy}</p>
        <div className='flex flex-wrap space-x-3'>
          {data.tags?.map((tag, index) => (
            <p key={index} className='mb-3 font-bold text-gray-900'>
              #{tag}
            </p>
          ))}
        </div>
      </Link>

      {/* Satın Alma ve Sepete Ekle butonları */}
      <div className='flex flex-wrap items-center justify-center gap-4 mt-10 w-full '>
        <MyButton className='w-full' text='Buy Now' />
        <MyButton
          className='w-full'
          text='Add to Cart'
          onClick={() => {
            if (!loggedIn) {
              router.push('/login'); // Kullanıcı giriş yapmamışsa login sayfasına yönlendirme
            } else {
              dispatch(fetchDataById(data.id)); // Redux üzerinden ürün eklenmesi işlemi
              handleProductAdd();
            }
          }}
        />
      </div>

      {showNotification && (
        <Notification
          bgColor='bg-green-500'
          message='Ürün başarıyla eklendi!'
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
