// import {ILogin, UserItem} from "./user";
//
import axiosInstance from "../app/http";
import {IPage} from "../views/common";
import {BonusTypeItem} from "../model/bounstype";
//
export const createBonusType = async (user: BonusTypeItem) => {
  return await axiosInstance.post("/bonustype/",user).then(res => res);
}
//
//
// /**
//  * @description: 用户登录
//  */
// export const Login = async (username: any, password: any) => {
//   return await axiosInstance.post('/user/login', {username:username,password:password}).then(res => res);
// };




/**
 * 获取用户分页
 */
export const getBonusTypePage = async (params: IPage) => {
  return await axiosInstance.get("/bonustype/page", {params: params}).then(res => res.data);
}
export const getBonusTypePageByStatus = async (params: any) => {
  return await axiosInstance.get("/bonustype/page/status", {params: params}).then(res => res.data);
}
export const getBonusTypebyID = async (params: number) => {
  return await axiosInstance.get("/bonustype/" + params).then(res => res.data);
}
export const getBonusTypeList= async (params: number[]) => {
  return await axiosInstance.post("/bonustype/list/{pids}" , params).then(res => res.data);
}

export const updateBonusType = async (params: BonusTypeItem) => {
  return await axiosInstance.put("/bonustype/", params).then(res => res);
}
//
//
// export const getLoginUser = async () => {
//   return await axiosInstance.get("/user/loginUser").then(res=>res);
// }
//
// export const getUser = async (uid:number) => {
//   return await axiosInstance.get("/user/"+uid).then(res=>res);
// }


