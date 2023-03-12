import {configureStore} from '@reduxjs/toolkit';
import homeSlice from "./homeSlice";
import userSlice from "./userSlice";
import deptSlice from "../views/system/dept/deptSlice";

/**
 * 建立一个全局配置良好的 Redux 存储，包括组合 reducer，添加 thunk 中间件，以及设置 Redux DevTools 扩展
 * 这里注册Slice,Slice中初始化变量,使用变量用useSelector,改变用useDispatch
 */

export  const store = configureStore({
  reducer: {
    home:homeSlice,
    user:userSlice,
    dept:deptSlice,
  },
  devTools: true
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
