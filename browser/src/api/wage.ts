// import {ILogin, UserItem} from "./user";
//
 import axiosInstance from "../app/http";
 import {IPage} from "../views/common";
import {WageItem} from "../views/wage/model";
//
export const createWage = async (user: WageItem) => {
  return await axiosInstance.post("/wage/",user).then(res => res);
}

/**
 * 获取用户分页
 */
export const getWagePage = async (params: IPage) => {
  return await axiosInstance.get("/wage/page", {params: params}).then(res => res.data);
}
export const getWagePageByTime = async (params: any) => {
  return await axiosInstance.get("/wage/page/time", {params: params}).then(res => res.data);
}
export const getWagebyID = async (params: number) => {
  return await axiosInstance.get("/wage/" + params).then(res => res.data);
}
export const getWageList= async (params: number[]) => {
  return await axiosInstance.post("/wage/list/{pids}" , params).then(res => res.data);
}

export const getWageTime= async () => {
  return await axiosInstance.get("/wage/time").then(res => res.data);
}

export const updateWage = async (params: WageItem) => {
  return await axiosInstance.put("/wage/", params).then(res => res);
}



