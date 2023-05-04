import React from "react";
import {PayCircleOutlined, ProjectOutlined} from "@ant-design/icons";

const userItems = [
  {
    key: `clockin`,
    icon: React.createElement(ProjectOutlined),
    label: `上班打卡`,
  },
  {
    key: `clockout`,
    icon: React.createElement(PayCircleOutlined),
    label: `下班打卡`,
  },
  // {
  //   key: `20`,
  //   icon: React.createElement(UserOutlined),
  //   label: `申请加班`,
  // },
  // {
  //   key: '30',
  //   label: "请假",
  //   icon: React.createElement(PayCircleOutlined),
  // },
  //
  // {
  //   key: '40',
  //   label: "外出办公",
  //   icon: React.createElement(ProjectOutlined)
  // },
];

export {
  userItems
}
