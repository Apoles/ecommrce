import React, { useState } from 'react';
import { Bars3Icon, HomeIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';

const UserHeader = () => {
  const [bar, setBar] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logOut'); // logout API endpoint'ini çağır

      window.location.href = '/';
    } catch (error) {}
  };

  const { loggedIn, status, data } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  return (
    <div className='bg-white'>
      <header className='relative bg-white'>
        <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <button
                onClick={() => setBar(!bar)}
                type='button'
                className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
              >
                <span className='absolute -inset-0.5'></span>
                <Bars3Icon className='w-6 h-6 text-black' />
              </button>

              <div className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='flex h-full space-x-8'>
                  <Link className='flex flex-row items-center  justify-center ' href={'/'}>
                    <HomeIcon className='w-8 h-8 text-black p-2 ' />
                    Home
                  </Link>
                  <Link
                    href=''
                    type='button'
                    className='relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800'
                  >
                    Women
                  </Link>

                  <Link
                    href=''
                    type='button'
                    className='relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800'
                  >
                    Men
                  </Link>

                  <Link href='#' className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'>
                    Company
                  </Link>
                  <Link href='#' className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'>
                    Stores
                  </Link>
                </div>
              </div>

              <div className='ml-auto flex  items-center'>
                <Menu>
                  <MenuButton className=''>Welcome {loggedIn?.user?.firstName}</MenuButton>

                  <MenuItems anchor='bottom start' className=' bg-white shadow-md rounded-xl space-y-2 py-3 px-3'>
                    <MenuItem>
                      <a className='block data-[focus]:bg-blue-100 rounded-md p-1 ' href='/settings'>
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a className='block data-[focus]:bg-blue-100 rounded-md p-1' href='/support'>
                        Support
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a className='block data-[focus]:bg-blue-100 rounded-md p-1' href='/license'>
                        License
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
                <Menu>
                  {' '}
                  <MenuButton onClick={handleLogout} className={'mx-6 text-black hover:text-red-500'}>
                    {' '}
                    Log Out{' '}
                  </MenuButton>
                </Menu>
                <div className='flex items-center justify-center space-x-1 '>
                  {' '}
                  <Link href='/basket'>
                    <ShoppingBagIcon
                      href='/basket'
                      className={`w-6 h-6  flex lg:ml-6 ${
                        cart.data.length == 0 ? 'text-gray-500' : 'text-green-500'
                      }  `}
                    ></ShoppingBagIcon>
                  </Link>
                  <p className='mt-1'>{cart.data.length}</p>{' '}
                </div>{' '}
              </div>
            </div>
          </div>
          {bar && (
            <div className='lg:hidden'>
              <div className='space-y-1 px-2 pt-2 pb-3'>
                <Link
                  href='/'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-800'
                >
                  Home
                </Link>
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
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default UserHeader;
