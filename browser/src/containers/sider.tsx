import React, {FC} from "react";
import {Image, Menu} from "antd";
import LoginInfo from "../components/LoginInfo";
import Sider from "antd/es/layout/Sider";

import {setIndex} from "../store/homeSlice";
import {useDispatch} from "react-redux";
import {userItems} from "./sider-items";

const App: FC = () => {

  const siderItems = userItems;
  const dispatch = useDispatch()

  const itemOnClick = (item: any) => {
    dispatch(setIndex({index: item.key}))
  }

  return (
    <>
      <Sider style={{backgroundColor: "white"}} className="site-layout-background" width={200}>
        <Image src='./logo.png' preview={false}/>
        <LoginInfo/>
        <Menu
          mode="inline"
          items={siderItems}
          onClick={itemOnClick}
        />

      </Sider>
    </>
  );
}

export default App;
