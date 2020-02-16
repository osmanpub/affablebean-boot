import {createSlice} from '@reduxjs/toolkit';
import {Cart} from '../interfaces/cart';

export const initialState: Cart = {
  items: [],
  numberOfItems: 0,
  subtotal: 0,
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {items, numberOfItems, subtotal} = action.payload;
      state.items = items;
      state.numberOfItems = numberOfItems;
      state.subtotal = subtotal;
    },
    clearCart: (state, action) => {
      state.items = [];
      state.numberOfItems = 0;
      state.subtotal = 0;
    },
    updateCart: (state, action) => {
      const {items, numberOfItems, subtotal} = action.payload;
      state.items = items;
      state.numberOfItems = numberOfItems;
      state.subtotal = subtotal;
    },
  },
});

export const {addToCart, clearCart, updateCart} = cart.actions;

const cartReducer = cart.reducer;

export default cartReducer;
