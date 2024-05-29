import Link from 'next/link';
import MyInput from '../MyInput';
import Summary from './Summary';
import { useState } from 'react';

const CheckoutCard = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Kulaklık',
      description: 'dolar ipsum',
      image: '/bir.jpg',
      price: 100,
      quantity: 1,
    },
    {
      id: 1,
      title: 'Ürün 1',
      description: 'Bu bir ürün açıklamasıdır.',
      image: '/iki.jpg',
      price: 100,
      quantity: 1,
    },
    {
      id: 1,
      title: 'Ürün 1',
      description: 'Bu bir ürün açıklamasıdır.',
      image: '/favicon.ico',
      price: 100,
      quantity: 1,
    },
  ]);
  return (
    <section className='bg-white py-8 antialiased  md:py-16'>
      <form action='#' className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <div className='mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16'>
          <div className='min-w-0 flex-1 space-y-8'>
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold text-gray-900 '>Delivery Details</h2>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label htmlFor='your_name' className='mb-2 block text-sm font-medium text-gray-900 '>
                    {' '}
                    Your name{' '}
                  </label>
                  <MyInput type='text' id='text' placeholder='Abdullah Gümüş' required></MyInput>
                </div>

                <div>
                  <label htmlFor='your_email' className='mb-2 block text-sm font-medium text-gray-900 '>
                    Your email*
                  </label>
                  <MyInput type='text' id='text' placeholder='abdullahgumus14@hotmail.com' required></MyInput>
                </div>

                <div>
                  <div className='mb-2 flex items-center gap-2'>
                    <label htmlFor='select-country-input-3' className='block text-sm font-medium text-gray-900 '>
                      Country*
                    </label>
                  </div>
                  <select
                    id='select-country-input-3'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 '
                  >
                    <option selected>United States</option>
                    <option value='AS'>Australia</option>
                    <option value='FR'>France</option>
                    <option value='ES'>Spain</option>
                    <option value='UK'>United Kingdom</option>
                  </select>
                </div>

                <div>
                  <div className='mb-2 flex items-center gap-2'>
                    <label htmlFor='select-city-input-3' className='block text-sm font-medium text-gray-900 '>
                      {' '}
                      City*{' '}
                    </label>
                  </div>
                  <select
                    id='select-city-input-3'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-50'
                  >
                    <option selected>San Francisco</option>
                    <option value='NY'>New York</option>
                    <option value='LA'>Los Angeles</option>
                    <option value='CH'>Chicago</option>
                    <option value='HU'>Houston</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='phone-input-3' className='mb-2 block text-sm font-medium text-gray-900 '>
                    Phone Number*
                  </label>
                  <div className='flex items-center'>
                    <div className='relative w-full'>
                      <MyInput type='text' id='phone' placeholder='05416945683' required></MyInput>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900 '>
                    {' '}
                    Adress
                  </label>
                  <MyInput
                    type='text'
                    id='adres'
                    placeholder='Sinanbey Mah. Ahmet Akyolu Cad. No 64 / 10 İnegöl/Bursa'
                    required
                  ></MyInput>
                </div>

                <div>
                  <label htmlFor='company_name' className='mb-2 block text-sm font-medium text-gray-900 '>
                    {' '}
                    Company name{' '}
                  </label>
                  <MyInput type='text' id='companyName' placeholder='Alttantire' required></MyInput>
                </div>

                <div>
                  <label htmlFor='vat_number' className='mb-2 block text-sm font-medium text-gray-900 '>
                    {' '}
                    VAT number{' '}
                  </label>
                  <MyInput type='text' id='vatNumber' placeholder='DE42313253' required></MyInput>
                </div>

                <div className='sm:col-span-2'>
                  <button
                    type='submit'
                    className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100  '
                  >
                    <svg
                      className='h-5 w-5'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <path
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M5 12h14m-7 7V5'
                      />
                    </svg>
                    Add new address
                  </button>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-xl font-semibold text-gray-900 '>Payment</h3>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4'>
                  <div className='flex items-start'>
                    <div className='flex h-5 items-center'>
                      <input
                        id='credit-card'
                        aria-describedby='credit-card-text'
                        type='radio'
                        name='payment-method'
                        value=''
                        className='h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 '
                        checked
                      />
                    </div>

                    <div className='ms-4 text-sm'>
                      <label htmlFor='credit-card' className='font-medium leading-none text-gray-900 '>
                        {' '}
                        Credit Card{' '}
                      </label>
                      <p id='credit-card-text' className='mt-1 text-xs font-normal text-gray-500 '>
                        Pay with your credit card
                      </p>
                    </div>
                  </div>

                  <div className='mt-4 flex items-center gap-2'>
                    <button type='button' className='text-sm font-medium text-gray-500 hover:text-gray-900  '>
                      Delete
                    </button>

                    <div className='h-3 w-px shrink-0 bg-gray-200 '></div>

                    <button type='button' className='text-sm font-medium text-gray-500 hover:text-gray-900  '>
                      Edit
                    </button>
                  </div>
                </div>

                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4  '>
                  <div className='flex items-start'>
                    <div className='flex h-5 items-center'>
                      <input
                        id='pay-on-delivery'
                        aria-describedby='pay-on-delivery-text'
                        type='radio'
                        name='payment-method'
                        value=''
                        className='h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600    '
                      />
                    </div>

                    <div className='ms-4 text-sm'>
                      <label htmlFor='pay-on-delivery' className='font-medium leading-none text-gray-900 '>
                        {' '}
                        Payment on delivery{' '}
                      </label>
                      <p id='pay-on-delivery-text' className='mt-1 text-xs font-normal text-gray-500 '>
                        +$15 payment processing fee
                      </p>
                    </div>
                  </div>

                  <div className='mt-4 flex items-center gap-2'>
                    <button type='button' className='text-sm font-medium text-gray-500 hover:text-gray-900  '>
                      Delete
                    </button>

                    <div className='h-3 w-px shrink-0 bg-gray-200 '></div>

                    <button type='button' className='text-sm font-medium text-gray-500 hover:text-gray-900  '>
                      Edit
                    </button>
                  </div>
                </div>

                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4  '>
                  <div className='flex items-start'>
                    <div className='flex h-5 items-center'>
                      <input
                        id='paypal-2'
                        aria-describedby='paypal-text'
                        type='radio'
                        name='payment-method'
                        value=''
                        className='h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600    '
                      />
                    </div>

                    <div className='ms-4 text-sm'>
                      <label htmlFor='paypal-2' className='font-medium leading-none text-gray-900 '>
                        {' '}
                        Paypal account{' '}
                      </label>
                      <p id='paypal-text' className='mt-1 text-xs font-normal text-gray-500 '>
                        Connect to your account
                      </p>
                    </div>
                  </div>

                  <div className='mt-4 flex items-center gap-2'>
                    <button type='button' className='text-sm font-medium text-gray-500 hover:text-gray-900  '>
                      Delete
                    </button>

                    <div className='h-3 w-px shrink-0 bg-gray-200 '></div>

                    <button type='button' className='text-sm font-medium text-gray-500 hover:text-gray-900  '>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-xl font-semibold text-gray-900 '>Delivery Methods</h3>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4  '>
                  <div className='flex items-start'>
                    <div className='flex h-5 items-center'>
                      <input
                        id='dhl'
                        aria-describedby='dhl-text'
                        type='radio'
                        name='delivery-method'
                        value=''
                        className='h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600    '
                        checked
                      />
                    </div>

                    <div className='ms-4 text-sm'>
                      <label htmlFor='dhl' className='font-medium leading-none text-gray-900 '>
                        {' '}
                        $15 - DHL Fast Delivery{' '}
                      </label>
                      <p id='dhl-text' className='mt-1 text-xs font-normal text-gray-500 '>
                        Get it by Tommorow
                      </p>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4  '>
                  <div className='flex items-start'>
                    <div className='flex h-5 items-center'>
                      <input
                        id='fedex'
                        aria-describedby='fedex-text'
                        type='radio'
                        name='delivery-method'
                        value=''
                        className='h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600    '
                      />
                    </div>

                    <div className='ms-4 text-sm'>
                      <label htmlFor='fedex' className='font-medium leading-none text-gray-900 '>
                        {' '}
                        Free Delivery - FedEx{' '}
                      </label>
                      <p id='fedex-text' className='mt-1 text-xs font-normal text-gray-500 '>
                        Get it by Friday, 13 Dec 2023
                      </p>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4  '>
                  <div className='flex items-start'>
                    <div className='flex h-5 items-center'>
                      <input
                        id='express'
                        aria-describedby='express-text'
                        type='radio'
                        name='delivery-method'
                        value=''
                        className='h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600    '
                      />
                    </div>

                    <div className='ms-4 text-sm'>
                      <label htmlFor='express' className='font-medium leading-none text-gray-900 '>
                        {' '}
                        $49 - Express Delivery{' '}
                      </label>
                      <p id='express-text' className='mt-1 text-xs font-normal text-gray-500 '>
                        Get it today
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor='voucher' className='mb-2 block text-sm font-medium text-gray-900 '>
                {' '}
                Enter a gift card, voucher or promotional code{' '}
              </label>
              <div className='flex max-w-md items-center gap-4'>
                <MyInput type='text' id='voucher' required></MyInput>

                <button
                  type='button'
                  className='flex items-center justify-center rounded-lg bg-blue-700  text-white px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300'
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <Summary items={items}></Summary>
        </div>
      </form>
    </section>
  );
};

export default CheckoutCard;
