import React, { FC } from "react";
import { Image, Menu } from "antd";
import LoginInfo from "../components/LoginInfo";
import Sider from "antd/es/layout/Sider";
import { userItems } from "./sider-items";
import { clockDing } from "../api/attendance";
import notification from 'antd/lib/notification';
import { NotificationPlacement } from "antd/es/notification/interface";


const App: FC = () => {

  const onClick = (key: string) => {
    clockDing().then((res) => {
      if (res.status === 203) {
        openNotification('top',"打卡失败",res.data)
      }
    })
  }
  //通知框,使用Hook
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement, message: string, description: string) => {
    api.error({
      message,
      description,
      placement,
      duration: 3
    });
  }

  return (
    <>
      {contextHolder}
      <Sider style={{ backgroundColor: "white" }} className="site-layout-background" width={200}>
        <Image src='./logo.png' preview={false} />
        <LoginInfo />
        <Menu
          mode="inline"
          items={userItems}
          selectable={false}
          onClick={(e) => onClick(e.key)}
        />
      </Sider>
    </>
  );
}

export default App;
