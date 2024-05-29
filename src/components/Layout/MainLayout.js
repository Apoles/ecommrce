import Link from 'next/link';
import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-gray-800 text-white p-4'>
        <Link href={'/'}>
          {' '}
          <h1>Main Site</h1>
        </Link>
      </header>
      <main className='flex-grow p-4'>{children}</main>
      <footer className='bg-gray-800 text-white p-4 text-center'>© 2024 Main Site</footer>
    </div>
  );
};

export default MainLayout;
