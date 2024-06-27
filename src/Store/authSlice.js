// src/store/mySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const checkLoginStatus = createAsyncThunk('auth/checkLoginStatus', async () => {
  const response = await fetch('api/loggedIn');
  const data = await response.json();
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { loggedIn: false, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggedIn = action.payload;
      })
      .addCase(checkLoginStatus.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;
