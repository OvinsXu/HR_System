import React, {FC} from "react";
import {Image, Menu} from "antd";
import LoginInfo from "../components/LoginInfo";
import Sider from "antd/es/layout/Sider";
import {userItems} from "./sider-items";
import {clockDing} from "../api/attendance";
import notification from 'antd/lib/notification';
import {NotificationPlacement} from "antd/es/notification/interface";
import ClocksTar from "../components/ClocksTar";
import LeavesTar from "../components/LeavesTar";


const App: FC = () => {

  const onClick = (key: string) => {
    clockDing().then((res) => {
      console.log('res');
      console.log(res);
      if (res.status != 200) {
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
    <div>
      {contextHolder}
      <Sider style={{height:"100%", backgroundColor: "white"}} className="site-layout-background" width={200}>
        <Image src='./logo.png' preview={false} />
        <LoginInfo />
        <ClocksTar/>
        <LeavesTar/>
      </Sider>
    </div>
  );
}

export default App;
