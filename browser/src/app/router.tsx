import React, {FC} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
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


const App:FC=()=>{
  return (
    <>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="/" element={<Home/>}>
          {/*顶部*/}
          <Route path="agreement" element={<AgreementMgr/>}/>
          <Route path="skill" element={<SkillMgr/>}></Route>
          <Route path="attendance" element={<Attendance/>}></Route>


          <Route path="system">
            <Route path=""  element={<System/>}></Route>

            <Route path="config" element={<Config/>}></Route>
            <Route path="login_log" element={<LoginLog/>}></Route>
            <Route path="opt_log" element={<OperateLog/>}></Route>
            <Route path="department" element={<Department/>}></Route>
            <Route path="auth" element={<Auth/>}></Route>
            <Route path="file" element={<FileSys/>}></Route>
          </Route>

          {/*侧边*/}
          <Route path="post" >
            <Route path="mgr" element={<PostMgr/>}></Route>
            <Route path="move" element={<Transfer/>}></Route>
          </Route>
          <Route path="user">
            <Route path="mgr" element={<UserMgr/>}></Route>
            <Route path="add" element={<UserAdd/>}></Route>
          </Route>
          <Route path="wage">
            <Route path="bonustype" element={<BonusType/>}></Route>
            <Route path="bonus" element={<Bonus/>}></Route>
            <Route path="info" element={<WageInfo/>}></Route>
            <Route path="add" element={<WageAdd/>}></Route>
          </Route>
          <Route path="train" element={<Train />}></Route>


        </Route>
      </Routes>
    </>
  );
}

export default App;
