import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './RootReducer'; // Tüm reducer'ları toplayan bir dosya oluşturacağız.

const store = configureStore({
  reducer: RootReducer,
});

export default store;
