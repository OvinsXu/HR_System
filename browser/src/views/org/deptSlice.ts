import {createSlice} from '@reduxjs/toolkit';

export const Slice = createSlice({
  name: 'dept', // 命名空间，在调用action的时候会默认的设置为action的前缀
  // 初始值
  initialState: {
    depts: [{}],
    //title: 'redux toolkit pre',
  },
  // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
  reducers: {
    setDepts(state,{payload}){
      state.depts=payload;
    }

  },
});



export const {  setDepts } = Slice.actions;// 导出actions
export default Slice.reducer; // 导出reducer，在创建store时使用到
