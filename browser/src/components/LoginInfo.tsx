import React, {FC} from "react";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

/**
 * 显示登录用户的信息,如果还没登录,也会跳转到登录界面
 */
const App: FC = () => {
  const navigate = useNavigate();

  if (sessionStorage.getItem("token")==null){
    navigate("/login")
  }

  const Logout = () => {
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
