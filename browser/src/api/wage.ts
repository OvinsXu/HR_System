// import {ILogin, UserItem} from "./user";
//
import axiosInstance from "../app/http";
import {IPage} from "../views/common";
import {BonusItem, BonusTypeItem, WageItem} from "../model/wage";

//
export const generateWage = async (params: any) => {
  return await axiosInstance.get("/wage/",{params: params}).then(res => res);
}
export const exportWage = async (params: any) => {
  return await axiosInstance.get("/wage/export",{params: params,responseType:'blob'}).then(res => res);
}

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


export const createBonusType = async (user: BonusTypeItem) => {
  return await axiosInstance.post("/bonustype/",user).then(res => res);
}

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


export const getBonusType = async () => {
  return await axiosInstance.get("/bonustype/").then(res=>res);
}

///////////

export const createBonus = async (user: BonusItem) => {
  return await axiosInstance.post("/bonus/",user).then(res => res);
}

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

export const eraseBonus= async (pid:number) => {
  return await axiosInstance.delete("/bonus/"+pid).then(res => res.data);
}
