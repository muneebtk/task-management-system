import { configureStore } from "@reduxjs/toolkit";
import SignupReducer from "../features/singup/SignupSlice";
import TaskReducer from "../features/dashboard/DashboardSlice";
import SinginReducer from "../features/signin/SigninSlice";

export const store = configureStore({
  reducer: {
    signup: SignupReducer,
    tasks: TaskReducer,
    signin: SinginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
