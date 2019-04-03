import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";

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
  categories
});

export default rootReducer;
