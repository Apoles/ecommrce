import React, { useState } from 'react';
import MyInput from '../MyInput';
import Summary from './Summary';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, updatePaymentData, updateUserData } from '@/Store/PaymentSlice';

const CheckoutCard = () => {
  const dispatch = useDispatch(); // dispatch fonksiyonu oluşturuluyor.
  const cart = useSelector((state) => state.cart); // cart durumu Redux store'dan alınıyor.
  const user = useSelector((state) => state.auth); // user durumu Redux store'dan alınıyor.
  const payment = useSelector((state) => state.payment); // payment durumu Redux store'dan alınıyor.

  console.log('payment', payment);

  // formData ve paymentData için useState hook'ları kullanılarak başlangıç durumları tanımlanıyor.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    city: '',
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

  // formErrors durumu için useState hook'u kullanılarak başlangıç durumu tanımlanıyor.
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

  // formData güncelleme fonksiyonu
  const handleChangeForm = (e) => {
    const { id, value } = e.target; // input elementinden id ve value değerleri alınıyor.
    setFormData({
      ...formData,
      [id]: value,
    });
    // Önceki hata mesajı varsa temizleniyor.
    setFormErrors({
      ...formErrors,
      [id]: '',
    });
  };

  // paymentData güncelleme fonksiyonu
  const handleChangePayment = (e) => {
    const { id, value } = e.target; // input elementinden id ve value değerleri alınıyor.
    setPaymentData({
      ...paymentData,
      [id]: value,
    });
    // Önceki hata mesajı varsa temizleniyor.
    setFormErrors({
      ...formErrors,
      [id]: '',
    });
  };

  // Form doğrulama fonksiyonu
  const validateForm = () => {
    let isValid = true;

    // fullName doğrulama
    if (paymentData.fullName.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        fullName: 'Please enter your full name as it appears on the card.',
      }));
      isValid = false;
    }

    // companyName doğrulama
    if (formData.companyName.trim() === '' || !isValidEmpty(formData.companyName)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        companyName: 'Required.',
      }));
      isValid = false;
    }

    // cardExpiration doğrulama
    if (!isValidCardExpiration(paymentData.cardExpiration.trim())) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        cardExpiration: 'Please enter a valid expiration date (mm/yy format).',
      }));
      isValid = false;
    }

    // vatNumber doğrulama
    if (formData.vatNumber.trim() === '' || !isValidEmpty(formData.vatNumber)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        vatNumber: 'Required.',
      }));
      isValid = false;
    }

    // address doğrulama
    if (formData.address.trim() === '' || !isValidEmpty(formData.name)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        address: 'Required.',
      }));
      isValid = false;
    }

    // name doğrulama
    if (formData.name.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Please enter your full name.',
      }));
      isValid = false;
    }

    // email doğrulama
    if (formData.email.trim() === '' || !isValidEmail(formData.email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email.',
      }));
      isValid = false;
    }

    // phoneNumber doğrulama
    if (isNaN(formData.phoneNumber.trim()) || formData.phoneNumber.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Please enter a valid phone number.',
      }));
      isValid = false;
    }

    // cardNumber doğrulama
    if (!isValidCardNumber(paymentData.cardNumber.trim())) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        cardNumber: 'Please enter a valid card number.',
      }));
      isValid = false;
    }

    // CVV doğrulama
    if (isNaN(paymentData.cvv.trim()) || paymentData.cvv.trim().length !== 3) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        cvv: 'Please enter a valid CVV.',
      }));
      isValid = false;
    }

    return isValid;
  };

  // Boşluk doğrulama fonksiyonu
  const isValidEmpty = (text) => {
    const regex = /.+/;
    return regex.test(text);
  };

  // Sadece harf doğrulama fonksiyonu
  const isValidText = (text) => {
    const regex = /^[a-zA-Z]+$/g;
    return regex.test(text);
  };

  // E-posta doğrulama fonksiyonu
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Kart numarası doğrulama fonksiyonu
  const isValidCardNumber = (cardNumber) => {
    const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|9[0-9]{15})$/;
    return regex.test(cardNumber);
  };

  // Kart son kullanma tarihi doğrulama fonksiyonu
  const isValidCardExpiration = (expiration) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

    if (!regex.test(expiration)) return false;

    // Gelecek bir tarih olup olmadığını kontrol etme
    const today = new Date();
    const [month, year] = expiration.split('/');
    const cardExpirationDate = new Date(`20${year}`, month - 1);

    return cardExpirationDate > today;
  };

  // Form gönderme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form verilerini ve ödeme verilerini Redux'a dispatch etme
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
    <section className='bg-white py-8 antialiased md:py-16  max-sm:p-0'>
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0 mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16'>
        <div className='w-full lg:w-2/3 mx-auto'>
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
                  <option value='New York'>New York</option>
                  <option value='Los Angeles'>Los Angeles</option>
                  <option value='Chicago'>Chicago</option>
                  <option value='Houston'>Houston</option>
                  <option value='Miami'>Miami</option>
                </select>
              </div>
              <div>
                <label htmlFor='phoneNumber' className='mb-2 block text-sm font-medium text-gray-900'>
                  Your phone number*
                </label>
                <MyInput
                  onChange={handleChangeForm}
                  type='tel'
                  id='phoneNumber'
                  placeholder='+90 535 666 25 36'
                  required
                />
                {formErrors.phoneNumber && <p className='text-red-500 text-sm mt-1'>{formErrors.phoneNumber}</p>}
              </div>
              <div>
                <label htmlFor='address' className='mb-2 block text-sm font-medium text-gray-900'>
                  Your address*
                </label>
                <MyInput onChange={handleChangeForm} type='text' id='address' placeholder='123 Main St.' required />
                {formErrors.address && <p className='text-red-500 text-sm mt-1'>{formErrors.address}</p>}
              </div>
              <div>
                <label htmlFor='companyName' className='mb-2 block text-sm font-medium text-gray-900'>
                  Company Name
                </label>
                <MyInput onChange={handleChangeForm} type='text' id='companyName' placeholder='Company ABC' />
                {formErrors.companyName && <p className='text-red-500 text-sm mt-1'>{formErrors.companyName}</p>}
              </div>
              <div>
                <label htmlFor='vatNumber' className='mb-2 block text-sm font-medium text-gray-900'>
                  VAT Number
                </label>
                <MyInput onChange={handleChangeForm} type='text' id='vatNumber' placeholder='VAT123456' />
                {formErrors.vatNumber && <p className='text-red-500 text-sm mt-1'>{formErrors.vatNumber}</p>}
              </div>
            </div>
          </div>
          <div className='space-y-4 mt-6'>
            <h2 className='text-xl font-semibold text-gray-900'>Payment Information</h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label htmlFor='fullName' className='mb-2 block text-sm font-medium text-gray-900'>
                  Full name as on card*
                </label>
                <MyInput onChange={handleChangePayment} type='text' id='fullName' placeholder='John Doe' required />
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
                  placeholder='1234 5678 9012 3456'
                  required
                />
                {formErrors.cardNumber && <p className='text-red-500 text-sm mt-1'>{formErrors.cardNumber}</p>}
              </div>
              <div>
                <label htmlFor='cardExpiration' className='mb-2 block text-sm font-medium text-gray-900'>
                  Expiration date (MM/YY)*
                </label>
                <MyInput onChange={handleChangePayment} type='text' id='cardExpiration' placeholder='MM/YY' required />
                {formErrors.cardExpiration && <p className='text-red-500 text-sm mt-1'>{formErrors.cardExpiration}</p>}
              </div>
              <div>
                <label htmlFor='cvv' className='mb-2 block text-sm font-medium text-gray-900'>
                  CVV*
                </label>
                <MyInput onChange={handleChangePayment} type='text' id='cvv' placeholder='123' required />
                {formErrors.cvv && <p className='text-red-500 text-sm mt-1'>{formErrors.cvv}</p>}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 lg:mt-0 lg:w-1/3'>
          <Summary
            data={cart.totalAmount}
            saving={cart.savings}
            storePickup={10}
            tax={50}
            title='Complete Purchase'
            href={'/3dSecurity'}
            onClick={handleSubmit}
          />{' '}
        </div>
      </div>
    </section>
  );
};

export default CheckoutCard;
