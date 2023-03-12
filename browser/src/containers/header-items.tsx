import React from "react";
import {Link} from "react-router-dom";
import {ProfileOutlined, ReconciliationOutlined, SettingOutlined, VerifiedOutlined} from "@ant-design/icons";

const userItems = [
  {
    key: `1`,
    icon: React.createElement(ProfileOutlined),
    label: (
      <Link to={"agreement"}>合同管理</Link>
    ),
  },
  {
    key: `2`,
    icon: React.createElement(VerifiedOutlined),
    label: (
      <Link to={"skill"}>技能考核</Link>
    ),
  },
  {
    key: `3`,
    icon: React.createElement(ReconciliationOutlined),
    label: (
      <Link to={"attendance"}>考勤信息</Link>
    )
  },
  {
    key: '4',
    icon: React.createElement(SettingOutlined),
    label: (
      <Link to={"system"}>系统</Link>
    )
  },
];
const hrItems = [
  {
    key: `user`,
    icon: React.createElement(VerifiedOutlined),
    label: "员工管理",
    children: [
      {
        key: `user.info`,
        label: (
          <Link to={"user/mgr"}>数字档案</Link>
        ),
      },
      {
        key: `user.post`,
        label: (
          <Link to={"user/post"}>岗位管理</Link>
        ),
      },
      {
        key: `user.template`,
        label: (
          <Link to={"user/template"}>打印模板</Link>
        ),
      },
      {
        key: `user.other`,
        label: (
          <Link to={"user/other"}>其他事项</Link>
        ),
      },
    ]
  },
  {
    key: `1`,
    icon: React.createElement(ProfileOutlined),
    label: (
      <Link to={""}>组织管理</Link>
    ),
  },
  {
    key: `3`,
    icon: React.createElement(ReconciliationOutlined),
    label: "考勤管理",
  },
  {
    key: '4',
    icon: React.createElement(SettingOutlined),
    label: (
      <Link to={"system"}>培训管理</Link>
    )
  },
  {
    key: '5',
    icon: React.createElement(SettingOutlined),
    label: (
      <Link to={"system"}>薪资管理</Link>
    )
  },
  {
    key: '6',
    icon: React.createElement(SettingOutlined),
    label: (
      <Link to={"system"}>招聘管理</Link>
    )
  },
];

export {
  userItems, hrItems
}
