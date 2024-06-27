import { fetchDataById, remove, removeAll } from '@/Store/cartSlice';

// removeFromCart function
export const RemoveFromCart = (dispatch, id) => {
  dispatch(remove({ id }));
};

// removeAllFromCart function
export const RemoveAllFromCart = (dispatch, id) => {
  dispatch(removeAll({ id }));
};

// addFromCart function
export const AddFromCart = (dispatch, id) => {
  dispatch(fetchDataById(id));
};
