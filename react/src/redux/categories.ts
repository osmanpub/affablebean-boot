import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../interfaces/categories";

export type CategoryState = Category & { _links: any };

export interface CategoriesState {
  isFetching: boolean;
  didInvalidate: boolean;
  items: Array<CategoryState>;
}

export const initialState: CategoriesState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    receiveCategories: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = false;
      state.items = action.payload;
    }
  }
});

export const { receiveCategories } = categories.actions;

const categoriesReducer = categories.reducer;

export default categoriesReducer;
