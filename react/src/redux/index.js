import { combineReducers } from "redux";
import cartReducer from "./cart";
import categoriesReducer from "./categories";
import categoryReducer from "./category";
import purchaseReducer from "./purchase";
import subjectsReducer from "./subjects";

export default combineReducers({
  cart: cartReducer,
  category: categoryReducer,
  categories: categoriesReducer,
  purchase: purchaseReducer,
  subjects: subjectsReducer
});
