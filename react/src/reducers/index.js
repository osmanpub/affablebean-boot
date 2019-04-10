import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";

const addToCart = createReducer(
  {
    cart: {
      items: [],
      numberOfItems: 0,
      subtotal: 0
    }
  },
  {
    ADD_TO_CART: (state, action) => {
      const { cart } = state;
      const newCart = action.payload.cart;

      cart.subtotal += newCart.subtotal;
      cart.numberOfItems += newCart.numberOfItems;
      cart.items = cart.items.concat(newCart.items[0]);
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
