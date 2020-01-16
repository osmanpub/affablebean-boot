import { createSlice } from "@reduxjs/toolkit";
import { CategoryProducts } from "../interfaces/categories";

export const initialState: CategoryProducts = {
  categories: [],
  category: { id: -1, name: "", _links: {} },
  didInvalidate: false,
  isFetching: false,
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
      state.products = products._embedded.productList;
    }
  }
});

export const { receiveCategory } = category.actions;

const categoryReducer = category.reducer;

export default categoryReducer;
