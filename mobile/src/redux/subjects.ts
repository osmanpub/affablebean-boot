import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
};

const subjects = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    receiveSubjects: (state, action) => {
      state.didInvalidate = false;
      state.isFetching = false;
      state.items = action.payload;
    },
  },
});

export const {receiveSubjects} = subjects.actions;

const subjectsReducer = subjects.reducer;

export default subjectsReducer;
