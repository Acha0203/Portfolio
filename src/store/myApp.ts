import { createSlice } from '@reduxjs/toolkit';

const initialMyAppState = {
  isOpen: false,
  isHamburger: true,
  isEnglish: true,
  isInTransition: false,
  viewportTop: 0,
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
    toggleIsEnglish: (state: { isEnglish: boolean }) => {
      state.isEnglish = !state.isEnglish;
    },
    setIsInTransition: (state: { isInTransition: boolean }, action: { payload: boolean }) => {
      state.isInTransition = action.payload;
    },
    setViewportTop: (state: { viewportTop: number }, action: { payload: number }) => {
      state.viewportTop = action.payload;
    },
  },
});

export const myAppActions = myAppSlice.actions;

export default myAppSlice.reducer;
