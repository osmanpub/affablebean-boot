import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  didInvalidate: false,
  isPosting: false,
  order: {}
};

const purchase = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    clearPurchase: (state, action) => {
      state.order = {};
    },
    didInvalidate: (state, action) => {
      state.didInvalidate = action.payload;
    },
    isPosting: (state, action) => {
      state.isPosting = action.payload;
    },
    orderPurchase: (state, action) => {
      state.order = { ...action.payload.order };
    }
  }
});

export const {
  clearPurchase,
  didInvalidate,
  isPosting,
  orderPurchase
} = purchase.actions;

const purchaseReducer = purchase.reducer;

export default purchaseReducer;
