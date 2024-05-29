import Link from 'next/link';

const Summary = ({ items }) => {
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = 0;
  const finalPrice = totalPrice - discount;

  return (
    <div className='p-4 bg-gray-50 rounded-md '>
      <div className='mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md'>
        <div className='flow-root'>
          <div className='-my-3 divide-y divide-gray-200 dark:divide-gray-800'>
            <dl className='flex items-center justify-between gap-4 py-3'>
              <dt className='text-base font-normal text-gray-500 '>Sepet</dt>
              <dd>${totalPrice.toFixed(2)}</dd>
            </dl>

            <dl className='flex items-center justify-between gap-4 py-3'>
              <dt className='text-base font-normal text-gray-500 '>Kargop</dt>
              <dd>-${discount.toFixed(2)}</dd>
            </dl>

            <dl className='flex items-center justify-between gap-4 py-3'>
              <dt className='text-base font-normal text-black font-bold'>Toplam Fiyat</dt>
              <dd>${finalPrice.toFixed(2)}</dd>
            </dl>
          </div>
        </div>

        <div className='space-y-3'>
          <button
            type='submit'
            className=' bg-blue-700 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 '
          >
            Proceed to Payment
          </button>

          <p className='text-sm font-normal text-gray-500 '>
            One or more items in your cart require an account.{' '}
            <a
              href='#'
              title=''
              className='font-medium text-primary-700 underline hover:no-underline dark:text-primary-500'
            >
              Sign in or create an account now.
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
