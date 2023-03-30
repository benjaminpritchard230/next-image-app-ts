import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  id: number;
  token: string;
  username: string;
}

const initialState: AuthState = {
  id: NaN,
  token: "",
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { id, token, username } }) => {
      state.id = id;
      state.token = token;
      state.username = username;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
