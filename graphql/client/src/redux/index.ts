import { combineReducers } from "redux";
import { Cart } from "../interfaces/cart";
import { Purchase } from "../interfaces/purchase";
import UI from "../interfaces/ui";
import cartReducer from "./cart";
import purchaseReducer from "./purchase";
import uiReducer from "./ui";

export default combineReducers({
  cart: cartReducer,
  purchase: purchaseReducer,
  ui: uiReducer,
});

export interface RootState {
  cart: Cart;
  purchase: Purchase;
  ui: UI;
}
