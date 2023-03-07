// import {ILogin, UserItem} from "./user";
//
 import axiosInstance from "../../app/http";
 import {IPage} from "../common";
import {TrainItem} from "./model";
//
export const createTrain = async (user: TrainItem) => {
  return await axiosInstance.post("/train/",user).then(res => res);
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
export const getTrainPage = async (params: IPage) => {
  return await axiosInstance.get("/train/page", {params: params}).then(res => res.data);
}
export const getTrainPageByStatus = async (params: any) => {
  return await axiosInstance.get("/train/page/status", {params: params}).then(res => res.data);
}
export const getTrainbyID = async (params: number) => {
  return await axiosInstance.get("/train/" + params).then(res => res.data);
}
export const getTrainList= async (params: number[]) => {
  return await axiosInstance.post("/train/list/{pids}" , params).then(res => res.data);
}

export const updateTrain = async (params: TrainItem) => {
  return await axiosInstance.put("/train/", params).then(res => res);
}



