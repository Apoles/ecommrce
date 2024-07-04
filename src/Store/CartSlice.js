// src/store/mySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SaveToLocalStorage, LoadFromLocalStorage, saveToLocalStorageTwo } from '../utils/LocalStroge.js';
import { DiscountPercentage } from '@/utils/DisountPercent.js';

export const fetchDataById = createAsyncThunk('cart/fetchDataById', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = LoadFromLocalStorage('cart') || {
  data: [],
  totalAmount: 0,
  savings: 0,
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      state.data.push({ ...action.payload, qty: 1 });
      state.totalAmount = state.data.reduce((total, item) => total + item.price * item.qty, 0);
      SaveToLocalStorage('cart', state);
    },
    removeAll(state, action) {
      const { id } = action.payload;
      const newData = state.data.filter((item) => item.id !== id);
      const newTotalAmount = newData.reduce((total, item) => total + item.price * item.qty, 0);
      const newSavings = state.data.reduce(
        (total, item) => total + DiscountPercentage(item.price, item.discountPercentage) * item.qty,
        0
      );

      SaveToLocalStorage('cart', { data: newData, totalAmount: newTotalAmount, savings: newSavings });
      return { data: newData, totalAmount: newTotalAmount };
    },
    remove(state, action) {
      const { id } = action.payload;
      const newData = state.data
        .map((item) => {
          if (item.id === id) {
            // Eğer qty 1'den büyükse, qty'yi bir azalt
            if (item.qty > 1) {
              return { ...item, qty: item.qty - 1 };
            } else {
              // Eğer qty 1 ise, bu öğeyi tamamen sil
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null);

      const newTotalAmount = newData.reduce((total, item) => total + item.price * item.qty, 0);
      const newSavings = newData.reduce(
        (total, item) => total + DiscountPercentage(item.price, item.discountPercentage) * item.qty,
        0
      );

      SaveToLocalStorage('cart', { data: newData, totalAmount: newTotalAmount, savings: newSavings });
      return { data: newData, totalAmount: newTotalAmount, savings: newSavings };
    },
    clear(state) {
      state.data = [];
      state.totalAmount = 0;

      SaveToLocalStorage('cart', state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDataById.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const debn = JSON.stringify(state.data);
        const az = JSON.parse(debn);

        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          // İlgili öğeyi bulduysan qty değerini güncelle
          state.data[index].qty += 1;
          state.totalAmount = state.data.reduce((total, item) => total + item.price * item.qty, 0);
          state.savings = state.data.reduce(
            (total, item) => total + DiscountPercentage(item.price, item.discountPercentage) * item.qty,
            0
          );
          SaveToLocalStorage('cart', state);
        } else {
          state.data.push({ ...action.payload, qty: 1 });
          state.totalAmount = state.data.reduce((total, item) => total + item.price * item.qty, 0);
          state.savings = state.data.reduce(
            (total, item) => total + DiscountPercentage(item.price, item.discountPercentage) * item.qty,
            0
          );

          SaveToLocalStorage('cart', state);
        }
      })
      .addCase(fetchDataById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { add, remove, clear, removeAll } = cartSlice.actions;
export default cartSlice.reducer;
