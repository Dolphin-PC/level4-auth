import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLogin } from "./auth.api";

interface LoginReq {
  id: string;
  password: string;
}
interface LoginRes {
  token: string;
}

export const __login = createAsyncThunk<
  LoginRes,
  LoginReq,
  { rejectValue: string }
>("tokenSlice/login", async (payload: LoginReq, thunkAPI) => {
  const data = await fetchLogin(payload);
  thunkAPI.fulfillWithValue(data);
  return data;
});
