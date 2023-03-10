import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {getLoginUser} from "./api/user";

import {store} from "./store/store";
import {setUserInfo} from "./views/user/userSlice";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//如果存在token,获取用户来测试是否有效
if (localStorage.getItem("token") && !sessionStorage.getItem("token")) {
  console.log("local有信息,session无信息")
  sessionStorage.setItem("token", localStorage.getItem("token")!);

  getLoginUser().then((res) => {
    if (res.status === 100) {
      store.dispatch(setUserInfo(res.data))
    } else {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
    }
  });
}

root.render(<App/>);

// reportWebVitals(console.log);    //进行性能分析,将结果保存到console.log

