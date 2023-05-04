import {createBrowserRouter, createHashRouter} from "react-router-dom";
import Home from "../pages/Home";
import System from "../views/system/System";
import Department from "../views/org/DeptMgr";
import Config from "../views/system/Config";
import Login from "../pages/Login";
import UserInfo from "../views/user/UserInfo";
import OperateLog from "../views/system/OperateLog";
import LoginLog from "../views/system/LoginLog";
import Auth from "../views/system/Auth";
import FileSys from "../views/system/FileSys";
import Attendance from "../views/attendance/Attendance";
import Train from "../views/devel/Train";
import Org from "../views/org/Org";
import Recruit from "../views/recruit/Recruit";
import Wage from "../views/wage/Wage";
import UserPost from "../views/user/UserPost";
import UserOther from "../views/user/Agreement";
import Skill from "../views/devel/Skill";
import ClockInfo from "../views/attendance/ClockInfo";
import Bonus from "../views/wage/Bonus";
import Leaves from "../views/attendance/Leaves";
import SelfInfo from "../views/user/SelfInfo";
import Agreement from "../views/user/Agreement";

//const router = createBrowserRouter([
const router = createHashRouter([
    {path: "/login", element: <Login/>,},
    {
        path: "/", element: <Home/>,
        children: [
            {
                path: "user",
                children: [
                    {path: "info", element: <UserInfo/>,},
                    {path: "post", element: <UserPost/>,},
                    {path: "agreement", element: <Agreement/>,},
                    {path: "self", element: <SelfInfo/>,},
                ],
            },
            {path: "org", element: <Org/>},
            {
                path: "attendance", children: [
                    {path: "leaves", element: <Leaves/>,},
                    {path: "info", element: <Attendance/>,},
                    {path: "clock", element: <ClockInfo/>,}
                ]
            },
            {
                path: "devel", children: [
                    {path: "skill", element: <Skill/>,},
                    {path: "train", element: <Train/>,},
                ]
            },

            {
                path: "wage", children: [
                    {path: "count", element: <Wage/>,},
                    {path: "bonus", element: <Bonus/>,},
                ]
            },
            {path: "recruit", element: <Recruit/>},
            {
                path: "system", element: <System/>,
                children: [
                    {path: "config", element: <Config/>,},
                    {path: "login_log", element: <LoginLog/>,},
                    {path: "opt_log", element: <OperateLog/>,},
                    {path: "department", element: <Department/>,},
                    {path: "auth", element: <Auth/>,},
                    {path: "file", element: <FileSys/>,},
                ]
            },
        ],
    },
]);

export default router;
