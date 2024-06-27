import { HeartIcon, XCircleIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import AlsoBoughtCard from '../Card/AlsoBoughtCard';
import Summary from './Summary';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../MyButton';
import Link from 'next/link';
import { AddFromCart, RemoveAllFromCart, RemoveFromCart } from '@/utils/CartFunction/CartActions';

const BasketCard = () => {
  // Redux store'a aksiyon göndermek için kullanılan hook
  const dispatch = useDispatch();

  // Redux store'dan cart durumunu seçmek için kullanılan hook
  const cart = useSelector((state) => state.cart);

  return (
    <section className='bg-white py-8 antialiased md:py-16'>
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <h1 className='text-2xl font-semibold text-gray-900 sm:text-3xl'>Shopping Cart</h1>

        <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
          <div className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'>
            <div className='space-y-6 mb-8'>
              <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
                {cart.data.length === 0 ? (
                  <div className='w-full h-44 flex flex-col items-center justify-center'>
                    <p className='text-black'>Your shopping cart is currently empty.</p>
                    <Link className='mt-3' href='/'>
                      <MyButton text='Start Shopping' />
                    </Link>
                  </div>
                ) : (
                  cart.data.map((cartItem, key) => (
                    <div
                      key={key}
                      className='mb-12 space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-12'
                    >
                      <a href='#' className='shrink-0 md:order-1'>
                        <img className='h-32 w-32 object-cover' src={cartItem.images[0]} alt={cartItem.title} />
                      </a>

                      <label htmlFor={`counter-input-${key}`} className='sr-only'>
                        Choose quantity:
                      </label>
                      <div className='flex items-center justify-between md:order-3 md:justify-end'>
                        <div className='flex items-center'>
                          <MinusCircleIcon
                            onClick={() => {
                              RemoveFromCart(dispatch, cartItem.id);
                            }}
                            className='w-7 h-7 text-gray-400 hover:text-red-500'
                          />
                          <input
                            type='text'
                            id={`counter-input-${key}`}
                            data-input-counter
                            className='w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0'
                            value={cartItem.qty}
                            readOnly
                          />
                          <PlusCircleIcon
                            onClick={() => {
                              AddFromCart(dispatch, cartItem.id);
                            }}
                            className='w-7 h-7 text-gray-400 hover:text-red-500'
                          />
                        </div>
                        <div className='text-end md:order-4 md:w-32'>
                          <p className='text-base font-bold text-gray-900'>${cartItem.price * cartItem.qty}</p>
                        </div>
                      </div>

                      <div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
                        <h2 className='font-semibold text-base'>{cartItem.title}</h2>
                        <p className='text-sm font-medium text-gray-900'>{cartItem.description}</p>

                        <div className='flex items-center gap-4'>
                          <button className='flex flex-row space-x-2 items-center justify-center hover:text-red-500'>
                            <HeartIcon className='w-6 h-6 text-red-500' />
                            <span>Add to favorite</span>
                          </button>

                          <button
                            onClick={() => {
                              RemoveAllFromCart(dispatch, cartItem.id);
                            }}
                            className='flex flex-row space-x-2 items-center justify-center hover:text-red-500'
                          >
                            <XCircleIcon className='w-6 h-6 text-red-500' />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <AlsoBoughtCard />
          </div>

          <Summary
            data={cart.totalAmount}
            saving={cart.savings}
            storePickup={10}
            tax={50}
            title='Proceed to Checkout'
            href='checkout'
          />
        </div>
      </div>
    </section>
  );
};

export default BasketCard;
