import React from "react";
import {Link} from "react-router-dom";
import {
  ClusterOutlined,
  EllipsisOutlined,
  MehOutlined,
  MoneyCollectOutlined,
  NodeIndexOutlined,
  ProfileOutlined,
  ReadOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TeamOutlined,
  TrophyOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";

const userItems = [
  {
    key: `common`,
    icon: <MehOutlined/>,
    label: "普通用户",
  },
];
const adminItems = [
  {
    key: `admin`,
    icon: <SettingOutlined/>,
    label: "管理员",
  },
];
const hrItems = [
  {
    key: `user`,
    icon: <TeamOutlined/>,
    label: "员工管理",
    children: [
      {
        key: `user.info`,
        icon:<ProfileOutlined />,
        label: (
          <Link to={"user/info"}>数字档案</Link>
        ),
      },
      {
        key: `user.post`,
        icon:<NodeIndexOutlined />,
        label: (
          <Link to={"user/post"}>岗位调动</Link>
        ),
      },
      {
        key: `user.other`,
        icon:<EllipsisOutlined />,
        label: (
          <Link to={"user/other"}>其他事项</Link>
        ),
      },
    ]
  },
  {
    key: `org`,
    icon: <ClusterOutlined/>,
    label: (
      <Link to={"org"}>组织管理</Link>
    ),
  },
  {
    key: `attendance`,
    icon: <ScheduleOutlined/>,
    label: (
      <Link to={"attendance"}>考勤管理</Link>
    ),
  },
  {
    key: 'train',
    icon: <ReadOutlined/>,
    label: (
      <Link to={"train"}>培训管理</Link>
    )
  },
  {
    key: 'perf',
    icon: <TrophyOutlined/>,
    label: (
      <Link to={"perf"}>绩效管理</Link>
    )
  },
  {
    key: 'wage',
    icon: <MoneyCollectOutlined/>,
    label: (
      <Link to={"wage"}>薪资管理</Link>
    )
  },
  {
    key: 'recruit',
    icon: <UsergroupAddOutlined/>,
    label: (
      <Link to={"recruit"}>招聘管理</Link>
    )
  },
];

export {
  userItems, hrItems, adminItems
}
