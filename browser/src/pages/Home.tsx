import React, {FC, useEffect} from "react";
import {Layout} from "antd";

import Sider from "./components/sider";
import Header from "./components/header-hr";
import Content from "./components/content";
import Footer from "./components/footer";

const App:FC=()=>{

  return (
    <>
      <Layout style={{padding: '24px 50px', minHeight: 620}}>
        <Sider/>
        <Layout>
          <Header/>
          <Content/>
          <Footer/>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
