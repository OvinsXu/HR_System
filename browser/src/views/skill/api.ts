

import axiosInstance from "../../app/http";
import {IPage} from "../common";
import {SkillItem} from "./model";

export const createSkill = async (agreement: any) => {
  return await axiosInstance.post("/skill/",agreement).then(res => res);
}





/**
 * 获取合同分页
 */
export const getSkillPage = async (params: IPage) => {
  return await axiosInstance.get("/skill/page", {params: params}).then(res => res.data);
}

export const updateSkill = async (params: SkillItem) => {
  return await axiosInstance.put("/skill/", params).then(res => res);
}




export const getSkill = async (uid:number) => {
  return await axiosInstance.get("/skill/"+uid).then(res=>res);
}


