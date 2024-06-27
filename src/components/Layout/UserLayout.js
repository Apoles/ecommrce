import React from 'react';
import Header from '../Header/MainHeader';
import UserHeader from '../Header/UserHeader';

const UserLayout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <UserHeader></UserHeader>
      <main className='flex-grow p-4'>{children}</main>
      <footer className='bg-blue-600 text-white p-4 text-center'>© 2024 User Dashboard</footer>
    </div>
  );
};

export default UserLayout;
