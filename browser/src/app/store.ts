import { configureStore } from '@reduxjs/toolkit';
import homeSlice from "../pages/homeSlice";
import userSlice from "../views/user/userSlice";
import deptSlice from "../views/system/dept/deptSlice";

export  const store = configureStore({
  reducer: {
    home:homeSlice,
    user:userSlice,
    dept:deptSlice,
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
