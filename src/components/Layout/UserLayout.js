import React from 'react';

const UserLayout = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-blue-600 text-white p-4'>
        <h1>User Dashboard</h1>
      </header>
      <main className='flex-grow p-4'>{children}</main>
      <footer className='bg-blue-600 text-white p-4 text-center'>© 2024 User Dashboard</footer>
    </div>
  );
};

export default UserLayout;
