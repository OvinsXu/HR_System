import React, {FC, useState} from "react";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";

const App: FC = () => {
  const navigate = useNavigate();
  //const {userinfo}=useSelector((state:RootState)=>state.user);


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
