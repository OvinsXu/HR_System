import React from "react";
import {AuditOutlined, PayCircleOutlined, ProjectOutlined, UserOutlined,} from "@ant-design/icons";

const userItems = [
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

export {
  userItems
}
