import { createSlice } from "@reduxjs/toolkit";
import { IS_NODE } from "../helpers/utils";
import { Cart, CartItem } from "../interfaces/cart";

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
      const { cart } = action.payload;
      state.items = state.items.concat(getCartItem(cart));
      state.numberOfItems += cart.numberOfItems;
      state.subtotal += cart.subtotal;
    },
    clearCart: (state, action) => {
      state.items = [];
      state.numberOfItems = 0;
      state.subtotal = 0;
    },
    updateCart: (state, action) => {
      const { cart, id, qty } = action.payload;

      if (qty < 0) {
        return state;
      }

      const updatedItem = cart.items[0];
      let numberOfItemsChange = 0;
      let subtotalChange = 0;

      let items: Array<CartItem> = [];

      if (qty === 0) {
        const removedItem: CartItem = state.items.filter(
          (item: CartItem) => item.product.id === id
        )[0];

        numberOfItemsChange = removedItem.quantity * -1;
        subtotalChange = removedItem.total * -1;
        items = state.items.filter((item: CartItem) => item.product.id !== id);
      } else {
        items = state.items.map((item: CartItem) => {
          if (item.product.id === id) {
            numberOfItemsChange = updatedItem.quantity - item.quantity;
            subtotalChange = updatedItem.total - item.total;
            return getCartItem(cart);
          }

          return item;
        });
      }

      state.items = items;
      state.numberOfItems += numberOfItemsChange;
      state.subtotal += subtotalChange;
    }
  }
});

function getCartItem(cart: any) {
  return IS_NODE ? cart.cart.items : JSON.parse(JSON.stringify(cart.items[0]));
}

export const { addToCart, clearCart, updateCart } = cart.actions;

const cartReducer = cart.reducer;

export default cartReducer;
