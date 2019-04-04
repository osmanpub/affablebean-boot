import { createAction } from "redux-starter-kit";

export const requestCategory = createAction("REQUEST_CATEGORY");

export const receiveCategory = createAction("RECEIVE_CATEGORY");

export const requestCategories = createAction("REQUEST_CATEGORIES");

export const receiveCategories = createAction("RECEIVE_CATEGORIES");
