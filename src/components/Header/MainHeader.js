import React from 'react';
import { Bars3Icon, ShoppingBagIcon, HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Header = () => {
  // Redux store'dan sepet verilerini almak için kullanılan hook
  const cartData = useSelector((state) => state.cart);

  return (
    <header className='relative bg-white'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='border-b border-gray-200'>
          <div className='flex h-16 items-center'>
            {/* Mobil görünümde menüyü açan buton */}
            <button type='button' className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'>
              <span className='absolute -inset-0.5'></span>
              <Bars3Icon className='w-6 h-6 text-black' />
            </button>

            {/* Büyük ekran görünümünde menü */}
            <div className='hidden lg:ml-8 lg:block lg:self-stretch'>
              <div className='flex h-full space-x-8 items-center '>
                {/* Ana sayfa linki */}
                <Link href={'/'} className='flex flex-row items-center justify-center'>
                  <HomeIcon className='w-8 h-8 text-black p-2' />
                  Home
                </Link>

                {/* Kadın kategorisi linki */}
                <Link
                  href={'/'}
                  className='relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800'
                >
                  Women
                </Link>

                {/* Erkek kategorisi linki */}
                <Link
                  href=''
                  className='relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800'
                >
                  Men
                </Link>

                {/* Şirket linki */}
                <Link href='#' className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'>
                  Company
                </Link>

                {/* Mağazalar linki */}
                <Link href='#' className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'>
                  Stores
                </Link>
              </div>
            </div>

            {/* Sağ üst köşede giriş ve kayıt ol linkleri */}
            <div className='ml-auto flex items-center'>
              <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                <Link href='login' className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                  Sign in
                </Link>
                <Link href='#' className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                  Create account
                </Link>
              </div>

              {/* Sepet ikonu ve ürün sayısı */}
              <div className='flex items-center justify-center space-x-1'>
                <Link href='/basket'>
                  <ShoppingBagIcon
                    href='/basket'
                    className={`w-6 h-6  flex lg:ml-6 ${
                      cartData.data.length === 0 ? 'text-gray-500' : 'text-green-500'
                    }`}
                  />
                </Link>
                <p className='mt-1'>{cartData.data.length}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
