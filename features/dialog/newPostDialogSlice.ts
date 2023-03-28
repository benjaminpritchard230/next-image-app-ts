import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface NewPostDialogState {
  isOpen: boolean;
}

const initialState: NewPostDialogState = {
  isOpen: false,
};

export const newPostDialogSlice = createSlice({
  name: "newPostDialog",
  initialState,
  reducers: {
    openClose: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openClose } = newPostDialogSlice.actions;

export default newPostDialogSlice.reducer;
