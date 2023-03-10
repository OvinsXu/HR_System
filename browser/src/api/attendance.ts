// import {ILogin, UserItem} from "./user";
//
 import axiosInstance from "../app/http";
 import {IPage} from "../views/common";
import {AttendanceItem} from "../views/attendance/model";
//
export const createAttendance = async (user: AttendanceItem) => {
  return await axiosInstance.post("/attendance/",user).then(res => res);
}

/**
 * 获取用户分页
 */
export const getAttendancePage = async (params: IPage) => {
  return await axiosInstance.get("/attendance/page", {params: params}).then(res => res.data);
}
export const getAttendancePageByTime = async (params: any) => {
  return await axiosInstance.get("/attendance/page/time", {params: params}).then(res => res.data);
}
export const getAttendancebyID = async (params: number) => {
  return await axiosInstance.get("/attendance/" + params).then(res => res.data);
}
export const getAttendanceList= async (params: number[]) => {
  return await axiosInstance.post("/attendance/list/{pids}" , params).then(res => res.data);
}

export const getAttendanceTime= async () => {
  return await axiosInstance.get("/attendance/time").then(res => res.data);
}

export const updateAttendance = async (params: AttendanceItem) => {
  return await axiosInstance.put("/attendance/", params).then(res => res);
}



