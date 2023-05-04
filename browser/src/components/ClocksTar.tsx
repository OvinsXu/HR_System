import { Button } from "antd/es/radio";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import notification from 'antd/lib/notification';
import {NotificationPlacement} from "antd/es/notification/interface";
import { clockDing } from "../api/attendance";

const App: FC = () => {
  const onClick = () => { 
    clockDing().then((res) => {
      if (res.status != 200) {
        openNotification('top', "打卡失败", res.data)
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
  const currentTime = new Date();

  const startTime = new Date();
  startTime.setHours(8, 0, 0, 0);

  const endTime = new Date();
  endTime.setHours(9, 0, 0, 0);



  const startDay = moment().startOf('day').minute(0);
  //判断当前时间是否在 8:00 和 9:00 之间
  //const [isBetween8And9, setIsBetween8And9] = useState(moment().isBetween(startDay.hour(8), startDay.hour(9), 'hour'));
  const [isBetween8And9, setIsBetween8And9] = useState(currentTime >= startTime && currentTime <= endTime);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setIsBetween8And9(moment().isBetween(startDay.hour(8), startDay.hour(9), 'hour'));//每秒生成随机数,触发页面刷新
  //   }, 1000);
  //   // 组件卸载清除定时器
  //   return () => clearInterval(timer);
  // }, []);
  return (
    <div>
      {contextHolder}
      {isBetween8And9 ?
        <Button style={{color:'green'}} onClick={onClick}>上班打卡</Button>
        :
        <Button style={{color:'blue'}} onClick={onClick}>下班打卡</Button>
      }
    </div>
  );
}

export default App;

