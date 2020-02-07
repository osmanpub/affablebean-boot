import { createSlice } from "@reduxjs/toolkit";
import { IS_NODE } from "../helpers/utils";
import { Cart } from "../interfaces/cart";

export const initialState: Cart = {
  items: [],
  numberOfItems: 0,
  subtotal: 0
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { cart, numberOfItems, subtotal } = action.payload;
      state.items = getCartItems(cart);
      state.numberOfItems = IS_NODE ? numberOfItems : cart.numberOfItems;
      state.subtotal = IS_NODE ? subtotal : cart.subtotal;
    },
    clearCart: (state, action) => {
      state.items = [];
      state.numberOfItems = 0;
      state.subtotal = 0;
    },
    updateCart: (state, action) => {
      const { cart, numberOfItems, subtotal } = action.payload;
      state.items = getCartItems(cart);
      state.numberOfItems = IS_NODE ? numberOfItems : cart.numberOfItems;
      state.subtotal = IS_NODE ? subtotal : cart.subtotal;
    }
  }
});

function getCartItems(cart: any) {
  return IS_NODE ? cart.items : JSON.parse(cart.items);
}

export const { addToCart, clearCart, updateCart } = cart.actions;

const cartReducer = cart.reducer;

export default cartReducer;
