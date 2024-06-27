import Link from 'next/link';
import React from 'react';
import Header from '../Header/MainHeader';

const MainLayout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header></Header>

      <main className='flex-grow p-4'>{children}</main>
      <footer className='bg-gray-800 text-white p-4 text-center'>© 2024 Main Site</footer>
    </div>
  );
};

export default MainLayout;
