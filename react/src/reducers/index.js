import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";

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
      state.didInvalidate = false;
      state.isFetching = false;
      state.products = action.payload.category;
      state.selectedCategory = action.payload.selectedCategory;
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
  category,
  categories
});

export default rootReducer;
