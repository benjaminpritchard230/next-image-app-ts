import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface AuthState {
  id: number;
  token: string;
  username: string;
  remember: boolean;
}

const initialState: AuthState = {
  id: NaN,
  token: "",
  username: "",
  remember: false,
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
    setRemember: (state) => {
      state.remember = !state.remember;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState); // THIS LINE
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials, setRemember } = authSlice.actions;

export default authSlice.reducer;
