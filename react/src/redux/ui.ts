import { createSlice } from "@reduxjs/toolkit";
import UI from "../interfaces/ui";

export const initialState: UI = {
  formErrors: [],
  home: false
};

const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    goHome: (state, action) => {
      state.home = action.payload;
    },
    setFormErrors: (state, action) => {
      state.formErrors = action.payload;
    }
  }
});

export const { goHome, setFormErrors } = ui.actions;

const uiReducer = ui.reducer;

export default uiReducer;
