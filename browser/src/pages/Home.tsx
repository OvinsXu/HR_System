import React, {FC, useEffect} from "react";
import {Layout} from "antd";
import Sider from "../containers/sider";
import Header from "../containers/header";
import {Content, Footer} from "antd/lib/layout/layout";
import {Outlet, useNavigate} from "react-router-dom";


const App: FC = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if (sessionStorage.getItem("token")==null){
      navigate("/login")
    }
  },[navigate]);

  return (
    <>
      <Layout style={{padding: '24px 50px', minHeight: 620}}>
        <Sider/>
        <Layout>
          <Header/>
          <Content style={{padding: '0 24px'}}>
            <Outlet/>
          </Content>
          <Footer style={{textAlign: 'center', backgroundColor: '#d1d1d1', padding: 10}}> 人事管理系统 @ovins</Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
