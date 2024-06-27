import React, { useState } from 'react';
import MyInput from '../MyInput';
import Summary from './Summary';
import { PlusIcon, CalendarDaysIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, updatePaymentData, updateUserData } from '@/Store/paymentSlice';

const CheckoutCard = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);
  const den = useSelector((state) => state.payment);

  console.log(cart);
  console.log(user);
  console.log(payment);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: 'United States',
    city: 'San Francisco',
    phoneNumber: '',
    address: '',
    companyName: '',
    vatNumber: '',
  });

  const [paymentData, setPaymentData] = useState({
    fullName: '',
    cardNumber: '',
    cardExpiration: '',
    cvv: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    companyName: '',
    vatNumber: '',
    fullName: '',
    cardNumber: '',
    cardExpiration: '',
    cvv: '',
  });

  const handleChangeForm = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    // Clear previous error message if any
    setFormErrors({
      ...formErrors,
      [id]: '',
    });
  };

  const handleChangePayment = (e) => {
    const { id, value } = e.target;
    setPaymentData({
      ...paymentData,
      [id]: value,
    });
    // Clear previous error message if any
    setFormErrors({
      ...formErrors,
      [id]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;

    // Validate full name
    if (paymentData.fullName.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        fullName: 'Please enter your full name as it appears on the card.',
      }));
      isValid = false;
    }

    // Validate companyName
    if (formData.companyName.trim() === '' || !isValidEmpty(formData.companyName)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        companyName: 'Required .',
      }));
      isValid = false;
    }

    // Validate card expiration
    if (!isValidCardExpiration(paymentData.cardExpiration.trim())) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        cardExpiration: 'Please enter a valid expiration date (mm/yy format).',
      }));
      isValid = false;
    }

    // Validate vatNumber

    if (formData.vatNumber.trim() === '' || !isValidEmpty(formData.vatNumber)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        vatNumber: 'Required .',
      }));
      isValid = false;
    }

    // Validate address
    if (formData.address.trim() === '' || !isValidEmpty(formData.name)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        address: 'Required .',
      }));
      isValid = false;
    }

    //Validate name
    if (validateForm.name.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Please enter your full name .',
      }));
      isValid = false;
    }

    // Validate email
    if (formData.email.trim() === '' || !isValidEmail(formData.email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email.',
      }));
      isValid = false;
    }

    // Validate phone number
    if (isNaN(formData.phoneNumber.trim()) || formData.phoneNumber.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Please enter a valid phone number.',
      }));
      isValid = false;
    }

    // Validate card number
    if (!isValidCardNumber(paymentData.cardNumber.trim())) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        cardNumber: 'Please enter a valid card number.',
      }));
      isValid = false;
    }

    // Validate CVV
    if (isNaN(paymentData.cvv.trim()) || paymentData.cvv.trim().length !== 3) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        cvv: 'Please enter a valid CVV.',
      }));
      isValid = false;
    }

    return isValid;
  };

  const isValidEmpty = (text) => {
    const regex = /.+/;
    return regex.test(text);
  };
  const isValidText = (text) => {
    const regex = /^[a-zA-Z]+$/g;
    return regex.test(text);
  };
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidCardNumber = (cardNumber) => {
    const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|9[0-9]{15})$/;
    return regex.test(cardNumber);
  };

  const isValidCardExpiration = (expiration) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

    if (!regex.test(expiration)) return false;

    // Check if it's a valid future date
    const today = new Date();
    const [month, year] = expiration.split('/');
    const cardExpirationDate = new Date(`20${year}`, month - 1);

    return cardExpirationDate > today;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateFormData(formData));
      dispatch(updatePaymentData(paymentData));
      dispatch(
        updateUserData({
          username: user.loggedIn.user.firstName,
          email: user.loggedIn.user.email,
          totalAmount: cart.totalAmount,
          savings: cart.savings,
          storePickup: 100,
          product: cart.data,
        })
      );
    }
  };

  return (
    <section className='bg-white py-8 antialiased md:py-16'>
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0 mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16'>
        <div className='w-2/3 mx-auto'>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-gray-900'>Delivery Details</h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label htmlFor='name' className='mb-2 block text-sm font-medium text-gray-900'>
                  Your name
                </label>
                <MyInput onChange={handleChangeForm} type='text' id='name' placeholder='Abdullah Gümüş' required />
                {formErrors.name && <p className='text-red-500 text-sm mt-1'>{formErrors.name}</p>}
              </div>
              <div>
                <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900'>
                  Your email*
                </label>
                <MyInput
                  onChange={handleChangeForm}
                  type='text'
                  id='email'
                  placeholder='abdullahgumus14@hotmail.com'
                  required
                />
                {formErrors.email && <p className='text-red-500 text-sm mt-1'>{formErrors.email}</p>}
              </div>
              <div>
                <label htmlFor='country' className='mb-2 block text-sm font-medium text-gray-900'>
                  Country*
                </label>
                <select
                  onChange={handleChangeForm}
                  id='country'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                >
                  <option value='United States'>United States</option>
                  <option value='Australia'>Australia</option>
                  <option value='France'>France</option>
                  <option value='Spain'>Spain</option>
                  <option value='United Kingdom'>United Kingdom</option>
                </select>
              </div>
              <div>
                <label htmlFor='city' className='mb-2 block text-sm font-medium text-gray-900'>
                  City*
                </label>
                <select
                  onChange={handleChangeForm}
                  id='city'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                >
                  <option value='San Francisco'>San Francisco</option>
                  <option value='New York'>New York</option>
                  <option value='Los Angeles'>Los Angeles</option>
                  <option value='Chicago'>Chicago</option>
                  <option value='Houston'>Houston</option>
                </select>
              </div>
              <div>
                <label htmlFor='phoneNumber' className='mb-2 block text-sm font-medium text-gray-900'>
                  Phone Number*
                </label>
                <MyInput onChange={handleChangeForm} type='tel' id='phoneNumber' placeholder='05416945683' required />
                {formErrors.phoneNumber && <p className='text-red-500 text-sm mt-1'>{formErrors.phoneNumber}</p>}
              </div>
              <div>
                <label htmlFor='address' className='mb-2 block text-sm font-medium text-gray-900'>
                  Address
                </label>
                <MyInput
                  onChange={handleChangeForm}
                  type='text'
                  id='address'
                  placeholder='Sinanbey Mah. Ahmet Akyolu Cad. No 64 / 10 İnegöl/Bursa'
                  required
                />
                {formErrors.address && <p className='text-red-500 text-sm mt-1'>{formErrors.address}</p>}
              </div>
              <div>
                <label htmlFor='companyName' className='mb-2 block text-sm font-medium text-gray-900'>
                  Company name
                </label>
                <MyInput onChange={handleChangeForm} type='text' id='companyName' placeholder='Alttantire' required />
                {formErrors.companyName && <p className='text-red-500 text-sm mt-1'>{formErrors.companyName}</p>}
              </div>
              <div>
                <label htmlFor='vatNumber' className='mb-2 block text-sm font-medium text-gray-900'>
                  VAT number
                </label>
                <MyInput onChange={handleChangeForm} type='text' id='vatNumber' placeholder='DE42313253' required />
                {formErrors.vatNumber && <p className='text-red-500 text-sm mt-1'>{formErrors.vatNumber}</p>}
              </div>
            </div>
          </div>

          <section className='bg-white md:py-16'>
            <div className='2xl:px-0'>
              <h2 className='text-xl font-semibold text-gray-900 mt-4 sm:text-2xl'>Payment</h2>
              <div className='mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12'>
                <form
                  onSubmit={handleSubmit}
                  className='w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8'
                >
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label htmlFor='fullName' className='mb-2 block text-sm font-medium text-gray-900'>
                        Full name
                      </label>
                      <MyInput
                        onChange={handleChangePayment}
                        type='text'
                        id='fullName'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                        placeholder='Bonnie Green'
                        required
                      />
                      {formErrors.fullName && <p className='text-red-500 text-sm mt-1'>{formErrors.fullName}</p>}
                    </div>
                    <div>
                      <label htmlFor='cardNumber' className='mb-2 block text-sm font-medium text-gray-900'>
                        Card number*
                      </label>
                      <MyInput
                        onChange={handleChangePayment}
                        type='text'
                        id='cardNumber'
                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 ${
                          formErrors.cardNumber && 'border-red-500'
                        }`}
                        placeholder='xxxx-xxxx-xxxx-xxxx'
                        required
                      />
                      {formErrors.cardNumber && <p className='text-red-500 text-sm mt-1'>{formErrors.cardNumber}</p>}
                    </div>
                    <div>
                      <label htmlFor='cardExpiration' className='mb-2 block text-sm font-medium text-gray-900'>
                        Card expiration*
                      </label>
                      <div className='relative'>
                        <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5'>
                          <CalendarDaysIcon className='w-3.5' />
                        </div>
                        <MyInput
                          onChange={handleChangePayment}
                          datepicker
                          datepicker-format='mm/yy'
                          id='cardExpiration'
                          type='text'
                          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900'
                          placeholder='12/23'
                          required
                        />
                      </div>
                      {formErrors.cardExpiration && (
                        <p className='text-red-500 text-sm mt-1'>{formErrors.cardExpiration}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor='cvv' className='mb-2 block text-sm font-medium text-gray-900'>
                        CVV*
                      </label>
                      <div className='flex items-center'>
                        <MyInput
                          onChange={handleChangePayment}
                          type='number'
                          id='cvv'
                          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 ${
                            formErrors.cvv && 'border-red-500'
                          }`}
                          placeholder='•••'
                          required
                        />
                        <button
                          data-tooltip-target='cvv-desc'
                          data-tooltip-trigger='hover'
                          className='text-gray-400 hover:text-gray-900'
                        >
                          <InformationCircleIcon className='w-4 h-4' />
                        </button>
                        <div
                          id='cvv-desc'
                          role='tooltip'
                          className='tooltip invisible absolute z-10 p-2 -mt-3 ml-2 text-sm text-white bg-gray-900 rounded-lg shadow-sm'
                        >
                          The last 3 digits on the back of the card
                        </div>
                      </div>
                      {formErrors.cvv && <p className='text-red-500 text-sm mt-1'>{formErrors.cvv}</p>}
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='flex items-center justify-center w-full py-2.5 mt-4 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100'
                  >
                    <PlusIcon className='w-5 h-5 text-black' />
                    Add new Card
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
        <Summary
          data={cart.totalAmount}
          saving={cart.savings}
          storePickup={10}
          tax={50}
          title='Complete Purchase'
          href={'/den'}
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
};

export default CheckoutCard;
