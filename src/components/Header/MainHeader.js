import React, { useState } from 'react';
import { Bars3Icon, ShoppingBagIcon, HomeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Header = () => {
  // Redux store'dan sepet verilerini almak için kullanılan hook
  const cartData = useSelector((state) => state.cart);

  const [bar, setBar] = useState(false);

  return (
    <header className='relative bg-white'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='border-b border-gray-200'>
          <div className='flex h-16 items-center justify-between'>
            {/* Logo ve Ana Sayfa Linki */}
            <Link href='/' className='flex items-center space-x-2'>
              <HomeIcon className='w-8 h-8 text-black p-2' />
              <span className='text-xl font-bold'>Home</span>
            </Link>

            {/* Mobil görünümde menüyü açan buton */}
            <button
              onClick={() => setBar(!bar)}
              type='button'
              className='lg:hidden relative rounded-md bg-white p-2 text-gray-400'
            >
              <Bars3Icon className='w-6 h-6 text-black' />
            </button>

            {/* Büyük ekran görünümünde menü */}
            <div className='hidden lg:flex lg:items-center lg:space-x-8'>
              <Link href='/' className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                Women
              </Link>
              <Link href='/' className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                Men
              </Link>
              <Link href='/' className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                Company
              </Link>
              <Link href='/' className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                Stores
              </Link>
            </div>

            {/* Sağ üst köşede giriş ve kayıt ol linkleri */}
            <div className='flex items-center space-x-4'>
              <div className='hidden lg:flex lg:items-center lg:space-x-6'>
                <Link href='login' className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                  Sign in
                </Link>
                <Link href='#' className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                  Create account
                </Link>
              </div>

              {/* Sepet ikonu ve ürün sayısı */}
              <div className='flex items-center'>
                <Link href='/basket' className='relative'>
                  <ShoppingBagIcon
                    className={`w-6 h-6 ${cartData.data.length === 0 ? 'text-gray-500' : 'text-green-500'}`}
                  />
                  {cartData.data.length > 0 && (
                    <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs'>
                      {cartData.data.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobil menü */}
          {bar && (
            <div className='lg:hidden'>
              <div className='space-y-1 px-2 pt-2 pb-3'>
                <Link
                  href='/women'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-800'
                >
                  Women
                </Link>
                <Link
                  href='/men'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-800'
                >
                  Men
                </Link>
                <Link
                  href='#'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-800'
                >
                  Company
                </Link>
                <Link
                  href='#'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-800'
                >
                  Stores
                </Link>
                <Link
                  href='login'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-800'
                >
                  Sign in
                </Link>
                <Link
                  href='#'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-800'
                >
                  Create account
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
