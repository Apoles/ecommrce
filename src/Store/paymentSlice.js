// Import necessary functions from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the slice
const initialState = {
  formData: {
    name: '',
    email: '',
    country: 'United States',
    city: 'San Francisco',
    phoneNumber: '',
    address: '',
    companyName: '',
    vatNumber: '',
    fullName: '',
  },
  paymentData: {
    cardNumber: '',
    cardExpiration: '',
    cvv: '',
  },
  userData: {
    savings: 0,
    storePickup: 0,
    username: '',
    email: '',
    totalAmount: 0,
    product: [],
  },
};

// Create the slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updatePaymentData: (state, action) => {
      state.paymentData = { ...state.paymentData, ...action.payload };
    },
    updateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

// Export the actions
export const { updateFormData, updatePaymentData, updateUserData } = paymentSlice.actions;

// Export the reducer
export default paymentSlice.reducer;
