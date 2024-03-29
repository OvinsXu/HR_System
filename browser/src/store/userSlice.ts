import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user', // 命名空间，在调用action的时候会默认的设置为action的前缀
    // 初始值
    initialState: {
      userinfo: {} as any,
    },
    // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
    reducers: {
      setUserInfo(state, {payload}) {
        state.userinfo.username = payload.username;
        state.userinfo.truename = payload.truename;
        state.userinfo.role = payload.role;
        //state.userinfo.username = payload.username;
        //...
      },
      clearUserInfo(state) {
        state.userinfo = {};
      },
    }
  }
);

export const {setUserInfo,clearUserInfo} = userSlice.actions;// 导出actions
export default userSlice.reducer; // 导出reducer，在创建store时使用到
