import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";

const category = createReducer(
  {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  {
    RECEIVE_CATEGORY: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = false;
      state.items = action.payload;
    },
    REQUEST_CATEGORY: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = true;
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
    },
    REQUEST_CATEGORIES: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = true;
    }
  }
);

const rootReducer = combineReducers({
  category,
  categories
});

export default rootReducer;
