import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenSlice from "../features/auth/auth.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducer = combineReducers({
  token: tokenSlice,
});

const store = configureStore({
  reducer: persistReducer(
    {
      key: "redux",
      storage,
      whitelist: ["token"],
    },
    reducer
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducer>;

export default store;
