import { clear } from '@/Store/CartSlice';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const dispatch = useDispatch();

  const ClearBasket = () => {
    dispatch(clear());
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]{1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (/^[0-9]{4}$/.test(text)) {
      const newOtp = text.split('');
      setOtp(newOtp);
      inputs.current[3].focus();
    }
  };

  useEffect(() => {
    inputs.current[0].focus();
  }, []);

  return (
    <div className='max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow'>
      <header className='mb-8'>
        <h1 className='text-2xl font-bold mb-1'>3d Secury Verification</h1>
        <p className='text-[15px] text-slate-500'>
          Enter the 4-digit verification code that was sent to your phone number.
        </p>
      </header>
      <form>
        <div className='flex items-center justify-center gap-3'>
          {otp.map((digit, index) => (
            <input
              key={index}
              type='text'
              className='w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
              maxLength='1'
              value={digit}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(el) => (inputs.current[index] = el)}
            />
          ))}
        </div>
        <div className='max-w-[260px] mx-auto mt-4'>
          <button
            onClick={() => {
              ClearBasket();
            }}
            type='submit'
            className='w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150'
          >
            Verify Code
          </button>
        </div>
      </form>
      <div className='text-sm text-slate-500 mt-4'>
        Didnt receive code? <a className='font-medium text-indigo-500 hover:text-indigo-600'>Resend</a>
      </div>
    </div>
  );
};

export default OtpForm;
