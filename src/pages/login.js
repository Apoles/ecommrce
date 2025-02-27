// Gerekli kütüphaneler ve bileşenler import edildi
import Notification from '@/components/Card/NotificationCard';
import axios from 'axios'; // Axios kütüphanesi import edildi
import { useRouter } from 'next/router'; // Next.js router hook'u import edildi
import React, { useState } from 'react'; // React ve useState hook'u import edildi

// Login bileşeni
const Login = () => {
  const [myEmail, setMyEmail] = useState(''); // Email state'i
  const [myPassword, setMyPassword] = useState(''); // Şifre state'i
  const [log, setLog] = useState(false); // Login durumu state'i
  const [showNotification, setShowNotification] = useState(false);

  const [error, setError] = useState(false); // Hata durumu state'i

  // Email alanı değiştiğinde çalışan fonksiyon
  const handleEmail = (event) => {
    setMyEmail(event.target.value); // Email state'ini günceller
  };

  // Şifre alanı değiştiğinde çalışan fonksiyon
  const handlePass = (event) => {
    setMyPassword(event.target.value); // Şifre state'ini günceller
  };

  // Form gönderimini yöneten fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun varsayılan gönderimini engeller

    try {
      const response = await axios.post('/api/login', { myEmail, myPassword }); // Axios ile login isteği yapılır

      if (response.data.success === true) {
        setLog(true); // Giriş başarılıysa login durumunu true yapar

        window.location.href = '/';
      }
    } catch (error) {
      setError(true); // Hata durumu state'ini günceller
    }
  };

  // JSX dönüşü
  return (
    <div className='flex max-sm:w-screen max-sm:p-0 max-sm:m-0 max-sm:pr-3 flex-col justify-start  py-12 px-24 sm:px-6 h-full lg:px-8'>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4  py-8 bg-gray-50 shadow sm:rounded-lg sm:px-10'>
        <form onSubmit={handleSubmit} method='POST' className='space-y-6'>
          {/* Email giriş alanı */}
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email address
          </label>
          <div className='mt-1'>
            <input
              id='email'
              name='email'
              type='string'
              onChange={handleEmail}
              required
              className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>

          {/* Şifre giriş alanı */}
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <div className='mt-1'>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              onChange={handlePass}
              required
              className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>

          {/* Remember me ve Forgot password linki */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input id='remember-me' name='remember-me' type='checkbox' className='h-4 w-4 border-gray-300 rounded' />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a href='#' className='font-medium'>
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Giriş butonu */}
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#333]'
          >
            Sign in
          </button>

          {log == false ? null : (
            <Notification
              bgColor={'bg-green-500'}
              onClose={() => setShowNotification(false)}
              message={'Giriş Başarılı'}
            ></Notification>
          )}
          {error == true ? (
            <Notification
              bgColor={'bg-red-500'}
              onClose={() => setError(false)}
              message={'Kullanıcı Bulunamadı'}
            ></Notification>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
