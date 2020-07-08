import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../interfaces/cart";

export const initialState: Cart = {
  didInvalidate: false,
  isFetching: false,
  items: [],
  numberOfItems: 0,
  subtotal: 0,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { items, numberOfItems, subtotal } = action.payload;
      state.items = items;
      state.numberOfItems = numberOfItems;
      state.subtotal = subtotal;
    },
    clearCart: (state, action) => {
      state.items = [];
      state.numberOfItems = 0;
      state.subtotal = 0;
    },
    didInvalidate: (state, action) => {
      state.didInvalidate = action.payload;
    },
    isFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    updateCart: (state, action) => {
      const { items, numberOfItems, subtotal } = action.payload;
      state.items = items;
      state.numberOfItems = numberOfItems;
      state.subtotal = subtotal;
    },
  },
});

export const {
  addToCart,
  clearCart,
  didInvalidate,
  isFetching,
  updateCart,
} = cart.actions;

const cartReducer = cart.reducer;

export default cartReducer;
