import { createAction } from "redux-starter-kit";

export const addToCart = createAction("ADD_TO_CART");

export const clearCart = createAction("CLEAR_CART");

export const updateCart = createAction("UPDATE_CART");

export const orderPurchase = createAction("ORDER_PURCHASE");

export const receiveCategory = createAction("RECEIVE_CATEGORY");

export const receiveCategories = createAction("RECEIVE_CATEGORIES");
