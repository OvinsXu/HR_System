import React, {FC} from "react";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

/**
 * 显示登录用户的信息,如果还没登录,也会跳转到登录界面
 */
const App: FC = () => {
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem("userinfo");
    sessionStorage.removeItem("userrole");
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/login");
  }
  const userinfo = JSON.parse(sessionStorage.getItem("userinfo")+"");

  return (
    <>
      {sessionStorage.getItem("token")!=null &&
        <>
            <h3>欢迎你,{userinfo!=null&&userinfo.truename}</h3>
            <Button type={"primary" } danger onClick={Logout}>注销</Button>
        </>
      }
    </>
  );
}
export default App;
