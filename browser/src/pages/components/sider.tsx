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
import {setIndex} from "../homeSlice";
import {useDispatch} from "react-redux";


const App: FC = () => {
  const siderItems = [
    {
      key: `10`,
      icon: React.createElement(AuditOutlined),
      label: `岗位`,
      children: [
        {key: '11', label: "岗位管理"},
        {key: '12', label: "调动申请"},
      ]
    },
    {
      key: `20`,
      icon: React.createElement(UserOutlined),
      label: `用户`,
      children: [

        {key: '21', label: "用户管理"},
        {key: '22', label: "录入新员"},
      ]
    },
    {
      key: '30',
      label: "工资",
      icon: React.createElement(PayCircleOutlined),
      children: [
        {key: '31', label: "奖金类型"},
        {key: '32', label: "奖金管理"},
        {key: '33', label: "查看历史工资表"},
        {key: '34', label: "生成工资表"},
      ]
    },

    {
      key: '40',
      label: "培训",
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
