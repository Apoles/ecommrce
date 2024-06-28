// Gerekli bileşenler ve kütüphaneler import edildi
import CheckoutCard from '@/components/Basket/Checkout'; // Ödeme kartı bileşeni import edildi
import { useSelector } from 'react-redux'; // React Redux'tan useSelector hook'u import edildi
import { ArrowLeftIcon, InformationCircleIcon } from '@heroicons/react/24/solid'; // Hero Icons'tan gerekli simgeler import edildi
import Link from 'next/link'; // Next.js'ten Link bileşeni import edildi

// CheckOut bileşeni
const CheckOut = () => {
  const isLog = useSelector((state) => state.auth); // Redux store'dan kullanıcı giriş durumu alındı

  // Kullanıcı giriş yapmamışsa veya giriş durumu belirsizse gösterilecek içerik
  if (isLog.loggedIn.success === false || isLog.loggedIn === undefined || isLog.loggedIn === null) {
    return (
      <section className='bg-white'>
        <div className='container flex items-center justify-center py-24 mx-auto px-4'>
          <div className='flex flex-col items-center max-w-sm text-center'>
            <p className='p-3 text-sm font-medium rounded-full'>
              <InformationCircleIcon className='w-10 h-10 text-gray-800' />
            </p>
            <h1 className='mt-3 text-2xl font-semibold text-gray-800 md:text-3xl'>{"Don't have an account?"}</h1>
            <p className='mt-4 text-gray-500'>Here are some helpful links:</p>

            <div className='flex flex-col sm:flex-row items-center w-full mt-6 gap-y-2 gap-x-3'>
              <Link href={'/'}>
                <button className='flex items-center justify-center w-full sm:w-auto px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100'>
                  <ArrowLeftIcon className='w-4 h-4 text-gray-900' />
                  <span>Take me home</span>
                </button>
              </Link>

              <Link href={'/login'}>
                <button className='flex items-center justify-center w-full sm:w-auto px-12 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100'>
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Kullanıcı giriş yapmışsa ödeme kartı bileşeni gösterilecek
  if (isLog.loggedIn.success === true) {
    return (
      <div className='px-4 py-8'>
        <CheckoutCard />
      </div>
    );
  }
};

export default CheckOut;
