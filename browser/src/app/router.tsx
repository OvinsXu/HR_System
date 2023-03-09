import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import System from "../views/system/System";
import Department from "../views/system/dept/Dept";
import Config from "../views/system/Config";
import PostMgr from "../views/post/PostMgr";
import Login from "../pages/Login";
import WageInfo from "../views/wage/WageInfo";
import Train from "../views/train/Train";
import UserMgr from "../views/user/UserMgr";
import UserAdd from "../views/user/UserAdd";
import OperateLog from "../views/system/OperateLog";
import LoginLog from "../views/system/LoginLog";
import Auth from "../views/system/Auth";
import FileSys from "../views/system/FileSys";
import Transfer from "../views/transfer/Transfer";
import AgreementMgr from "../views/agreement/AgreementMgr";
import SkillMgr from "../views/skill/SkillMgr";
import Attendance from "../views/attendance/Attendance";
import BonusType from "../views/bonustype/BonusType";
import Bonus from "../views/bonus/Bonus";
import WageAdd from "../views/wage/WageAdd";

const router = createBrowserRouter([
    {path: "/login",element: <Login/>,},
    {path: "/",element: <Home/>,
      children: [
        {path: "agreement",element: <AgreementMgr/>,},
        {path: "skill",element: <SkillMgr/>,},
        {path: "attendance",element: <Attendance/>,},
        {path: "system",element: <System/>,
          children: [
            {path: "config", element: <Config/>,},
            {path: "login_log", element: <LoginLog/>,},
            {path: "opt_log", element: <OperateLog/>,},
            {path: "department", element: <Department/>,},
            {path: "auth", element: <Auth/>,},
            {path: "file", element: <FileSys/>,},
          ]
        },
        {path: "post",
          children: [
            {path: "mgr", element: <PostMgr/>,},
            {path: "move", element: <Transfer/>,},
          ],
        },
        {path: "user",
          children: [
            {path: "mgr", element: <UserMgr/>,},
            {path: "add", element: <UserAdd/>,},
          ],
        },
        {
          path: "wage", children: [
            {path: "bonustype", element: <BonusType/>,},
            {path: "bonus", element: <Bonus/>,},
            {path: "info", element: <WageInfo/>,},
            {path: "add", element: <WageAdd/>,},
          ],
        },
        {path: "train", element: <Train/>,},
      ],
    },
  ])
;

export default router;
