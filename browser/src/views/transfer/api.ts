// import {ILogin, UserItem} from "./user";
//
 import axiosInstance from "../../app/http";
 import {IPage} from "../common";
import {TransferItem} from "./model";
//
export const createTransfer = async (user: TransferItem) => {
  return await axiosInstance.post("/transfer/",user).then(res => res);
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
export const getTransferPage = async (params: IPage) => {
  return await axiosInstance.get("/transfer/page", {params: params}).then(res => res.data);
}
export const getTransferPageByStatus = async (params: any) => {
  return await axiosInstance.get("/transfer/page/status", {params: params}).then(res => res.data);
}
export const getTransferbyID = async (params: number) => {
  return await axiosInstance.get("/transfer/" + params).then(res => res.data);
}
export const getTransferList= async (params: number[]) => {
  return await axiosInstance.post("/transfer/list/{pids}" , params).then(res => res.data);
}

export const updateTransfer = async (params: TransferItem) => {
  return await axiosInstance.put("/transfer/", params).then(res => res);
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


