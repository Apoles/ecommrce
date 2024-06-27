import { combineReducers } from 'redux';
import counterReducer from './counterSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import paymentReducer from './paymentSlice';

const rootReducer = combineReducers({
  // Add your slice reducers here
  counter: counterReducer,
  cart: cartReducer,
  auth: authReducer,
  payment: paymentReducer,
});

export default rootReducer;
