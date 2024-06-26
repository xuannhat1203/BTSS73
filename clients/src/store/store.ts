import { configureStore } from "@reduxjs/toolkit";
import jobReducers from "./reducers/render";
export const store = configureStore({
  reducer: {
    jobs: jobReducers,
  },
});
