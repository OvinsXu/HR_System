import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, HashRouter} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {getLoginUser} from "./views/user/api";
import {Provider} from "react-redux";
import {store} from "./app/store";
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
    }else{
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
    }
  });
}


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App/>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
