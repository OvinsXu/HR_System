import {IPage} from "../views/common";
import axiosInstance from "../app/http";
import {DeptItem, PostItem} from "../model/org";


export const createDept = async (dept: DeptItem) => {
  return await axiosInstance.post("/dept/",dept).then(res => res);
}

/**
 * 获取部门分页
 */
export const getDeptPage = async (params: IPage) => {
  return await axiosInstance.get("/dept/page", {params: params}).then(res => res.data);
}
export const getDeptPageByStatus = async (params: any) => {
  return await axiosInstance.get("/dept/page/status", {params: params}).then(res => res.data);
}
export const getDeptbyID = async (params: number) => {
  return await axiosInstance.get("/dept/" + params).then(res => res.data);
}
export const getDeptList= async (params: number[]) => {
  return await axiosInstance.post("/dept/list/{pids}" , params).then(res => res.data);
}

export const updateDept = async (params: DeptItem) => {
  return await axiosInstance.put("/dept/", params).then(res => res);
}

/**
 * 根据id删除部门岗位
 */
export const eraseDept= async (pid:number) => {
  return await axiosInstance.delete("/dept/"+pid).then(res => res.data);
}
export const getDept= async () => {
  return await axiosInstance.get("/dept/").then(res => res.data);
}

/**
 * 获取组织列表
 */
export const getAllDept = async () => {
    return await axiosInstance.get("/dept/").then(res => res);
}


export const createPost = async (post: PostItem) => {
  return await axiosInstance.post("/post/",post).then(res => res);
}

/**
 * 获取岗位分页
 */
export const getPostPage = async (params: IPage) => {
  return await axiosInstance.get("/post/page", {params: params}).then(res => res.data);
}
export const getPostPageByStatus = async (params: any) => {
  return await axiosInstance.get("/post/page/status", {params: params}).then(res => res.data);
}
export const getPostbyID = async (params: number) => {
  return await axiosInstance.get("/post/" + params).then(res => res.data);
}
export const getPostList= async (params: number[]) => {
  return await axiosInstance.post("/post/list/{pids}" , params).then(res => res.data);
}

export const updatePost = async (params: PostItem) => {
  return await axiosInstance.put("/post/", params).then(res => res);
}

export const getAllPost = async () => {
  return await axiosInstance.get("/post/").then(res => res);
}

/**
 * 根据id删除岗位
 */
export const erasePost= async (pid:number) => {
  return await axiosInstance.delete("/post/"+pid).then(res => res.data);
}



