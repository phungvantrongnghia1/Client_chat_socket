import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginApi } from "../api/UserApi";
import { TokenStore } from "./TokenStore";
export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  socketId: string;
};
type InitialState = {
  user: User | null;
};
const initialState: InitialState = {
  user: null,
};
type payload = {
  data: { userName: string; password: string };
  callback: () => any;
};
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload: payload, { getState, requestId }) => {
    const response = await loginApi(payload.data);
    if (response) {
      payload.callback();
    }
    TokenStore.setTokenFromResponse(response);
    return response.data;
  }
);
// First, create the thunk
export const PrifileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [loginAction.fulfilled.toString()]: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = PrifileSlice.actions;

export default PrifileSlice.reducer;
