// import {ILogin, UserItem} from "./user";
//
 import axiosInstance from "../app/http";
 import {IPage} from "../views/common";
import {BonusItem} from "../views/bonus/model";
//
export const createBonus = async (user: BonusItem) => {
  return await axiosInstance.post("/bonus/",user).then(res => res);
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
export const getBonusPage = async (params: IPage) => {
  return await axiosInstance.get("/bonus/page", {params: params}).then(res => res.data);
}
export const getBonusPageByStatus = async (params: any) => {
  return await axiosInstance.get("/bonus/page/status", {params: params}).then(res => res.data);
}
export const getBonusbyID = async (params: number) => {
  return await axiosInstance.get("/bonus/" + params).then(res => res.data);
}
export const getBonusList= async (params: number[]) => {
  return await axiosInstance.post("/bonus/list/{pids}" , params).then(res => res.data);
}

export const updateBonus = async (params: BonusItem) => {
  return await axiosInstance.put("/bonus/", params).then(res => res);
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


