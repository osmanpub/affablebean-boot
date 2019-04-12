import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";

const addToCart = createReducer(
  {
    cart: {
      items: "",
      numberOfItems: 0,
      subtotal: 0
    }
  },
  {
    ADD_TO_CART: (state, action) => {
      const { cart } = state;
      let { items } = cart;
      const newCart = action.payload.cart;

      cart.subtotal += newCart.subtotal;
      cart.numberOfItems += newCart.numberOfItems;

      const item = JSON.stringify(newCart.items[0]) + "\n";
      cart.items = items + item;
    }
  }
);

const category = createReducer(
  {
    categories: [],
    category: {},
    isFetching: false,
    didInvalidate: false,
    products: []
  },
  {
    RECEIVE_CATEGORY: (state, action) => {
      state.categories = action.payload.categories;
      state.category = action.payload.category;
      state.didInvalidate = false;
      state.isFetching = false;
      state.products = action.payload.products;
    }
  }
);

const categories = createReducer(
  {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  {
    RECEIVE_CATEGORIES: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = false;
      state.items = action.payload;
    }
  }
);

const rootReducer = combineReducers({
  addToCart,
  category,
  categories
});

export default rootReducer;
