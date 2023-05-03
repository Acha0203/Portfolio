import { createSlice } from '@reduxjs/toolkit';

const initialMyAppState = {
  isOpen: false,
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
  },
});

export const myAppActions = myAppSlice.actions;

export default myAppSlice.reducer;
