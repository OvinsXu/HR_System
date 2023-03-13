import React, {FC} from "react";
import {Image, Menu} from "antd";
import LoginInfo from "../components/LoginInfo";
import Sider from "antd/es/layout/Sider";
import {userItems} from "./sider-items";

const App: FC = () => {

  return (
    <>
      <Sider style={{backgroundColor: "white"}} className="site-layout-background" width={200}>
        <Image src='./logo.png' preview={false}/>
        <LoginInfo/>
        <Menu
          mode="inline"
          items={userItems}
        />
      </Sider>
    </>
  );
}

export default App;
