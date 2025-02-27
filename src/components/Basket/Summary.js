import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

const Summary = ({ data, saving, storePickup, tax, title, href, onClick }) => {
  const calculateSavings = (data, saving) => {
    const savings = saving - data;
    return isNaN(savings) ? 0 : Math.round(savings * 100) / 100;
  };

  return (
    <section className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'>
      <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
        <h2 className='text-xl font-semibold text-gray-900'>Order summary</h2>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-500'>Original price</dt>
              <dd className='text-base font-medium text-gray-900'>${(Math.round(data * 100) / 100).toFixed(2)}</dd>
            </dl>

            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-500'>Savings</dt>
              <dd className='text-base font-medium text-green-600'>${calculateSavings(data, saving)}</dd>
            </dl>

            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-500'>Store Pickup</dt>
              <dd className='text-base font-medium text-gray-900'>${data !== 0 ? storePickup.toFixed(2) : 0}</dd>
            </dl>

            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-500'>Tax</dt>
              <dd className='text-base font-medium text-gray-900'>${data !== 0 ? tax.toFixed(2) : 0}</dd>
            </dl>
          </div>

          <dl className='flex items-center justify-between gap-4 border-t border-gray-200 pt-2'>
            <dt className='text-base font-bold text-gray-900'>Total</dt>
            <dd className='text-base font-bold text-gray-900'>
              ${(Math.round(data * 100) / 100 + storePickup + tax).toFixed(2)}
            </dd>
          </dl>
        </div>

        <Link
          onClick={onClick}
          href={href}
          className='hover:bg-[#333] hover:text-white flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800'
        >
          {title}
        </Link>

        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-gray-500'>or</span>
          <Link
            href='/3dSecurity'
            className='inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline'
          >
            Continue Shopping
            <ArrowRightIcon className='w-5 h-5 text-black hover:text-red-500' />
          </Link>
        </div>
      </div>

      <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6'>
        <form className='space-y-4'>
          <div>
            <label htmlFor='voucher' className='mb-2 block text-sm font-medium text-gray-900'>
              Do you have a voucher or gift card?
            </label>
            <input
              type='text'
              id='voucher'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500'
              placeholder=''
              required
            />
          </div>
          <button
            type='submit'
            className='flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium'
          >
            Apply Code
          </button>
        </form>
      </div>
    </section>
  );
};

export default Summary;
