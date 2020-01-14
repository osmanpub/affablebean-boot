import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  order: {}
};

const purchase = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    clearPurchase: (state, action) => {
      state.order = {};
    },
    orderPurchase: (state, action) => {
      state.order = { ...action.payload.order };
    }
  }
});

export const { clearPurchase, orderPurchase } = purchase.actions;

const purchaseReducer = purchase.reducer;

export default purchaseReducer;
