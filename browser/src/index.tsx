import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {getLoginUser, getUserRole} from "./api/user";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//如果存在token,获取用户来测试是否有效
if (localStorage.getItem("token") && !sessionStorage.getItem("token")) {
  console.log("local有信息,session无信息")
  sessionStorage.setItem("token", localStorage.getItem("token")!);

  getLoginUser().then((res) => {
    if (res.status === 100) {
      sessionStorage.setItem("userinfo", JSON.stringify(res.data));

      getUserRole().then((role) => {
        if (role.status == 100) {
          const userrole = role.data.map((arr: any) => arr.authority.replace("ROLE_", ""));
          sessionStorage.setItem("userrole", JSON.stringify(userrole));
        }
      })
    } else {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
    }
  });
}

root.render(<App/>);

// reportWebVitals(console.log);    //进行性能分析,将结果保存到console.log

