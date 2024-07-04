import { combineReducers } from 'redux';
import cartReducer from './CartSlice';
import authReducer from './AuthSlice';
import paymentReducer from './PaymentSlice';

const RootReducer = combineReducers({
  // Add your slice reducers here
  cart: cartReducer,
  auth: authReducer,
  payment: paymentReducer,
});

export default RootReducer;
