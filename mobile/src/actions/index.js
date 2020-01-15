import { createAction } from "redux-starter-kit";

export const addToCart = createAction("ADD_TO_CART");

export const clearCart = createAction("CLEAR_CART");

export const updateCart = createAction("UPDATE_CART");

export const receiveCategory = createAction("RECEIVE_CATEGORY");

export const receiveCategories = createAction("RECEIVE_CATEGORIES");

export const receiveSubjects = createAction("RECEIVE_SUBJECTS");

export const clearPurchase = createAction("CLEAR_PURCHASE");

export const orderPurchase = createAction("ORDER_PURCHASE");
