import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Tüm reducer'ları toplayan bir dosya oluşturacağız.

const store = configureStore({
  reducer: rootReducer,
});

export default store;
