import { createSlice } from '@reduxjs/toolkit';

const initialMyAppState = {
  isOpen: false,
  isHamburger: true,
};

const myAppSlice = createSlice({
  name: 'myApp',
  initialState: initialMyAppState,
  reducers: {
    setIsOpen: (
      state: { isOpen: boolean },
      action: {
        payload: boolean;
      },
    ) => {
      state.isOpen = action.payload;
    },
    toggleIsOpen: (state: { isOpen: boolean }) => {
      state.isOpen = !state.isOpen;
    },
    setIsHamburger: (state: { isHamburger: boolean }, action: { payload: boolean }) => {
      state.isHamburger = action.payload;
    },
  },
});

export const myAppActions = myAppSlice.actions;

export default myAppSlice.reducer;
