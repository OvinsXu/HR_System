import {IPage} from "../views/common";
import axiosInstance from "../app/http";
import {RecruitItem} from "../model/recruit";

export const createRecruit = async (recruit: RecruitItem) => {
  return await axiosInstance.post("/recruit/",recruit).then(res => res);
}

export const getRecruitPage = async (params: IPage) => {
  return await axiosInstance.get("/recruit/page", {params: params}).then(res => res.data);
}
export const getRecruitPageByStatus = async (params: any) => {
  return await axiosInstance.get("/recruit/page/status", {params: params}).then(res => res.data);
}
export const getRecruitbyID = async (params: number) => {
  return await axiosInstance.get("/recruit/" + params).then(res => res.data);
}
export const getRecruitList= async (params: number[]) => {
  return await axiosInstance.post("/recruit/list/{pids}" , params).then(res => res.data);
}

export const updateRecruit = async (params: RecruitItem) => {
  return await axiosInstance.put("/recruit/", params).then(res => res);
}

export const eraseRecruit= async (pid:number) => {
  return await axiosInstance.delete("/recruit/"+pid).then(res => res.data);
}
export const getRecruit= async () => {
  return await axiosInstance.get("/recruit/").then(res => res.data);
}

export const getAllRecruit = async () => {
    return await axiosInstance.get("/recruit/").then(res => res);
}




