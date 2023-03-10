import axiosInstance from "../app/http";
import {IPage} from "../views/common";
import {AgreementItem} from "../model/agreement";

export const createAgreement = async (agreement: any) => {
  return await axiosInstance.post("/agreement/",agreement).then(res => res);
}





/**
 * 获取合同分页
 */
export const getAgreementPage = async (params: IPage) => {
  return await axiosInstance.get("/agreement/page", {params: params}).then(res => res.data);
}

export const updateAgreement = async (params: AgreementItem) => {
  return await axiosInstance.put("/agreement/", params).then(res => res);
}




export const getAgreement = async (uid:number) => {
  return await axiosInstance.get("/agreement/"+uid).then(res=>res);
}

export const getAgreementList = async () => {
  return await axiosInstance.get("/agreement/").then(res=>res);
}

