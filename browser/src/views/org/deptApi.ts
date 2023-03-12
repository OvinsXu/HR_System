import {IPage} from "../common";
import axiosInstance from "../../app/http";
import {DeptItem} from "./deptModel";

export const getDeptPage= async (params: IPage) => {
  return await axiosInstance.get("/dept/page", {params: params}).then(res => res.data);
}

export const createDept= async (params: DeptItem) => {
  return await axiosInstance.post("/dept/", {...params}).then(res => res);
}

export const getDept= async () => {
  return await axiosInstance.get("/dept/").then(res => res.data);
}
