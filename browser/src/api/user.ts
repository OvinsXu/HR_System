import {ILogin, UserItem} from "../views/user/model";

import axiosInstance from "../app/http";
import {IPage} from "../views/common";

export const createUser = async (user: any) => {
  return await axiosInstance.post("/user/",user).then(res => res);
}


/**
 * @description: 用户登录
 */
export const Login = async (username: any, password: any) => {
  return await axiosInstance.post('/user/login', {username:username,password:password}).then(res => res);
};




/**
 * 获取用户分页
 */
export const getUserPage = async (params: IPage) => {
  return await axiosInstance.get("/user/page", {params: params}).then(res => res.data);
}

export const updateUser = async (params: UserItem) => {
  return await axiosInstance.put("/user/", params).then(res => res);
}


export const getLoginUser = async () => {
  return await axiosInstance.get("/user/loginUser").then(res=>res);
}

export const getUser = async (uid:number) => {
  return await axiosInstance.get("/user/"+uid).then(res=>res);
}

export const getUserList= async (params: number[]) => {
  return await axiosInstance.post("/user/list/{pids}" , params).then(res => res.data);
}
