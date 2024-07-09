import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { __login } from "./auth.slice.thunk";

export interface InitialState {
  data: {
    token: string;
    expiredAt: number | null;
    isExpired: boolean;
  };
}

const initialState: InitialState = {
  data: {
    token: "",
    expiredAt: null,
    isExpired: false,
  },
};

export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.data.token = "";
      state.data.expiredAt = null;
      state.data.isExpired = false;
    },
    setTokenExpire: (state, action: PayloadAction<boolean>) => {
      state.data.isExpired = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__login.fulfilled, (state, action) => {
      state.data.token = action.payload.token;
      state.data.expiredAt = new Date().getTime() + 1000 * 60 * 60;
      state.data.isExpired = false;
    });
  },
});

export const { logout, setTokenExpire } = tokenSlice.actions;

export default tokenSlice.reducer;
