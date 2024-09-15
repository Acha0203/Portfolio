import { createSlice } from '@reduxjs/toolkit';

const initialMyAppState = {
  isOpen: false,
  isHamburger: true,
  isInTransition: false,
  language: 'English',
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
    setIsInTransition: (state: { isInTransition: boolean }, action: { payload: boolean }) => {
      state.isInTransition = action.payload;
    },
    setLanguage: (state: { language: string }, action: { payload: string }) => {
      state.language = action.payload;
    },
  },
});

export const myAppActions = myAppSlice.actions;

export default myAppSlice.reducer;
