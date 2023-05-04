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
    UsergroupAddOutlined,
    VerifiedOutlined
} from "@ant-design/icons";

const userItems = [
    {
        key: `common.info`,
        icon: <TeamOutlined/>,
        label: <Link to={"user/self"}>信息管理</Link>
    },
    // {
    //     key: `common.leave`,
    //     icon: <ProfileOutlined/>,
    //     label: "请假管理",
    // },
    // {
    //     key: `common.attendance`,
    //     icon: <ScheduleOutlined/>,
    //     label: "查看考勤",
    // },
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
                icon: <ProfileOutlined/>,
                label: (
                    <Link to={"user/info"}>数字档案</Link>
                ),
            },
            {
                key: `user.post`,
                icon: <NodeIndexOutlined/>,
                label: (
                    <Link to={"user/post"}>岗位调动</Link>
                ),
            },
            {
                key: `user.agreement`,
                icon: <EllipsisOutlined/>,
                label: (
                    <Link to={"user/agreement"}>合同信息</Link>
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
        label: "考勤管理",
        children: [
            {
                key: `attendance.leaves`,
                icon: <ProfileOutlined/>,
                label: (
                    <Link to={"attendance/leaves"}>请假管理</Link>
                ),
            },
            {
                key: `attendance.info`,
                icon: <ProfileOutlined/>,
                label: (
                    <Link to={"attendance/info"}>考勤情况</Link>
                ),
            },
            {
                key: `attendance.clock`,
                icon: <NodeIndexOutlined/>,
                label: (
                    <Link to={"attendance/clock"}>打卡信息</Link>
                ),
            },
        ]
    },
    {
        key: `devel`,
        icon: <TeamOutlined/>,
        label: "人才培养",
        children: [
            {
                key: 'devel.train',
                icon: <ReadOutlined/>,
                label: (
                    <Link to={"devel/train"}>培训管理</Link>
                )
            },
            {
                key: 'devel.skill',
                icon: <VerifiedOutlined />,
                label: (
                    <Link to={"devel/skill"}>技能证书</Link>
                )
            },
        ]
    },

    {
        key: 'wage',
        icon: <MoneyCollectOutlined/>,
        label:'薪资管理',
        children: [
            {
                key: 'wage.bonus',
                icon: <TrophyOutlined/>,
                label: (
                    <Link to={"wage/bonus"}>绩效奖金</Link>
                )
            },
            {
                key: 'wage.count',
                icon: <TrophyOutlined/>,
                label: (
                    <Link to={"wage/count"}>薪资核算</Link>
                )
            },
        ],

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
