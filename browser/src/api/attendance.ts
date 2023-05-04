// import {ILogin, UserItem} from "./user";
//
import axiosInstance from "../app/http";
import {IPage} from "../views/common";
import {AttendanceItem, ClockItem, LeavesItem, LeavesTypeItem} from "../model/attendance";
//


export const createLeavesType = async (user: LeavesTypeItem) => {
  return await axiosInstance.post("/leavestype/",user).then(res => res);
}


export const getLeavesTypePage = async (params: IPage) => {
  return await axiosInstance.get("/leavestype/page", {params: params}).then(res => res.data);
}
export const getLeavesTypePageByStatus = async (params: any) => {
  return await axiosInstance.get("/leavestype/page/status", {params: params}).then(res => res.data);
}
export const getLeavesTypebyID = async (params: number) => {
  return await axiosInstance.get("/leavestype/" + params).then(res => res.data);
}
export const getLeavesTypeList= async (params: number[]) => {
  return await axiosInstance.post("/leavestype/list/{pids}" , params).then(res => res.data);
}

export const updateLeavesType = async (params: LeavesTypeItem) => {
  return await axiosInstance.put("/leavestype/", params).then(res => res);
}


export const getLeavesType = async () => {
  return await axiosInstance.get("/leavestype/").then(res=>res);
}

//////////////////////////////////////////////////////////

export const createLeaves = async (user: LeavesItem) => {
  return await axiosInstance.post("/leaves/",user).then(res => res);
}

export const getLeavesPage = async (params: IPage) => {
  return await axiosInstance.get("/leaves/page", {params: params}).then(res => res.data);
}
export const getLeavesAllType = async () => {
  return await axiosInstance.get("/leaves/type").then(res => res.data);
}

export const getLeavesPageByStatus = async (params: any) => {
  return await axiosInstance.get("/leaves/page/timestatus", {params: params}).then(res => res.data);
}
export const getLeavesbyID = async (params: number) => {
  return await axiosInstance.get("/leaves/" + params).then(res => res.data);
}

export const updateLeaves = async (params: LeavesItem) => {
  return await axiosInstance.put("/leaves/", params).then(res => res);
}

export const eraseLeaves= async (pid:number) => {
  return await axiosInstance.delete("/leaves/"+pid).then(res => res.data);
}

/////////////////////////////////////////////////////////////
export const createAttendance = async (user: AttendanceItem) => {
  return await axiosInstance.post("/attendance/",user).then(res => res);
}

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


///////////////////////////////////////
export const createClock = async (user: ClockItem) => {
  return await axiosInstance.post("/clock/",user).then(res => res);
}

/**
 * 获取用户分页
 */
export const getClockPage = async (params: IPage) => {
  return await axiosInstance.get("/clock/page", {params: params}).then(res => res.data);
}
export const clockDing = async () => {
  return await axiosInstance.post("/clock/ding").then(res => res);
}

export const getClockPageByTime = async (params: any) => {
  return await axiosInstance.get("/clock/page/time", {params: params}).then(res => res.data);
}

export const getClockPageByStatus = async (params: any) => {
  return await axiosInstance.get("/clock/page/status", {params: params}).then(res => res.data);
}
export const getClockPageByTimeStatus = async (params: any) => {
  return await axiosInstance.get("/clock/page/timestatus", {params: params}).then(res => res.data);
}
export const getClockbyID = async (params: number) => {
  return await axiosInstance.get("/clock/" + params).then(res => res.data);
}
export const getClockList= async (params: number[]) => {
  return await axiosInstance.post("/clock/list/{pids}" , params).then(res => res.data);
}

export const getClockTime= async () => {
  return await axiosInstance.get("/clock/time").then(res => res.data);
}

export const updateClock = async (params: ClockItem) => {
  return await axiosInstance.put("/clock/", params).then(res => res);
}
