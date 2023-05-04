import axiosInstance from "../app/http";
import {IPage} from "../views/common";
import {SkillItem, TrainItem} from "../model/devel";


export const createTrain = async (user: TrainItem) => {
  return await axiosInstance.post("/train/",user).then(res => res);
}

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

export const createSkill = async (agreement: any) => {
  return await axiosInstance.post("/skill/",agreement).then(res => res);
}

export const getSkillPage = async (params: IPage) => {
  return await axiosInstance.get("/skill/page", {params: params}).then(res => res.data);
}

export const updateSkill = async (params: SkillItem) => {
  return await axiosInstance.put("/skill/", params).then(res => res);
}

export const getSkill = async (uid:number) => {
  return await axiosInstance.get("/skill/"+uid).then(res=>res);
}


export const eraseSkill= async (pid:number) => {
  return await axiosInstance.delete("/skill/"+pid).then(res => res.data);
}