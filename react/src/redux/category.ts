import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  categories: [],
  category: {},
  isFetching: false,
  didInvalidate: false,
  products: []
};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    receiveCategory: (state, action) => {
      const { category, categories, products } = action.payload;
      state.categories = categories;
      state.category = category;
      state.didInvalidate = false;
      state.isFetching = false;
      state.products = products;
    }
  }
});

export const { receiveCategory } = category.actions;

const categoryReducer = category.reducer;

export default categoryReducer;
