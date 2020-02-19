import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

const subjects = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    didInvalidate: (state, action) => {
      state.didInvalidate = action.payload;
    },
    isFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    receiveSubjects: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = false;
      state.items = action.payload;
    }
  }
});

export const { didInvalidate, isFetching, receiveSubjects } = subjects.actions;

const subjectsReducer = subjects.reducer;

export default subjectsReducer;
