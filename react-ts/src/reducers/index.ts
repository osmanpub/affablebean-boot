import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";
import { Action } from "../interfaces/action";
import { Cart, CartItem } from "../interfaces/cart";

function cart(
  state: Cart = {
    items: [],
    numberOfItems: 0,
    subtotal: 0
  },
  action: Action
): Cart {
  function getCartItem(cart: Cart) {
    return JSON.parse(JSON.stringify(cart.items[0]));
  }

  switch (action.type) {
    case "ADD_TO_CART": {
      const { cart } = action.payload;

      return {
        items: state.items.concat(getCartItem(cart)),
        numberOfItems: state.numberOfItems + cart.numberOfItems,
        subtotal: state.subtotal + cart.subtotal
      };
    }

    case "CLEAR_CART": {
      return {
        items: [],
        numberOfItems: 0,
        subtotal: 0
      };
    }

    case "UPDATE_CART": {
      const { qty } = action.payload;

      if (qty < 0) {
        return state;
      }

      const { cart, id } = action.payload;
      const updatedItem: CartItem = cart.items[0];

      let numberOfItemsChange = 0;
      let subtotalChange = 0;

      let items = [];

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

      return {
        items: items,
        numberOfItems: state.numberOfItems + numberOfItemsChange,
        subtotal: state.subtotal + subtotalChange
      };
    }

    default:
      return state;
  }
}

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

const purchase = createReducer(
  {
    order: {}
  },
  {
    CLEAR_PURCHASE: (state, action) => {
      state.order = {};
    },
    ORDER_PURCHASE: (state, action) => {
      state.order = { ...action.payload.order };
    }
  }
);

const subjects = createReducer(
  {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  {
    RECEIVE_SUBJECTS: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = false;
      state.items = action.payload;
    }
  }
);

const rootReducer = combineReducers({
  cart,
  category,
  categories,
  purchase,
  subjects
});

export default rootReducer;
