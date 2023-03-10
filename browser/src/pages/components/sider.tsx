import React, {FC} from "react";
import {Image, Menu} from "antd";
import LoginBar from "../../views/user/UserInfo";

import Sider from "antd/es/layout/Sider";
import {
  AuditOutlined,
  UserOutlined,
  PayCircleOutlined,
  ProjectOutlined,

} from "@ant-design/icons";
import {setIndex} from "../../store/features/homeSlice";
import {useDispatch} from "react-redux";


const App: FC = () => {
  const siderItems = [
    {
      key: `10`,
      icon: React.createElement(AuditOutlined),
      label: `打卡`,
    },
    {
      key: `20`,
      icon: React.createElement(UserOutlined),
      label: `申请加班`,
    },
    {
      key: '30',
      label: "请假",
      icon: React.createElement(PayCircleOutlined),
    },

    {
      key: '40',
      label: "外出办公",
      icon: React.createElement(ProjectOutlined)
    },


  ];

  const dispatch = useDispatch()

  const itemOnClick = (item: any) => {
    dispatch(setIndex({index: item.key}))
  }

  return (
    <>
      <Sider style={{backgroundColor: "white"}} className="site-layout-background" width={200}>
        <Image src='./logo.png' preview={false}/>
        <LoginBar/>
        <Menu
          mode="inline"
          // defaultSelectedKeys={['10']}
          // defaultOpenKeys={['10']}
          items={siderItems}
          onClick={itemOnClick}
        />

      </Sider>
    </>
  );
}

export default App;
