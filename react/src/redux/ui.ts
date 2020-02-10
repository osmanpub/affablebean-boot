import { createSlice } from "@reduxjs/toolkit";
import UI from "../interfaces/ui";

export const initialState: UI = {
  home: false
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    goHome: (state, action) => {
      state.home = action.payload;
    }
  }
});

export const { goHome } = ui.actions;

const uiReducer = ui.reducer;

export default uiReducer;
