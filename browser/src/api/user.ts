import {UserItem} from "../model/user";
import axiosInstance from "../app/http";
import {IPage} from "../views/common";

/**
 * 新建用户
 */
export const createUser = async (user: any) => {
  return await axiosInstance.post("/user/",user).then(res => res);
}

/**
 * @description: 用户登录
 */
export const Login = async (username: any, password: any) => {
  return await axiosInstance.post('/user/login', {username:username,password:password}).then(res => res);
};

/**
 * 获取用户分页
 */
export const getUserPage = async (params: IPage) => {
  return await axiosInstance.get("/user/page", {params: params}).then(res => res.data);
}
/**
 * 更新用户信息
 */
export const updateUser = async (params: UserItem) => {
  return await axiosInstance.put("/user/", params).then(res => res);
}

/**
 * 获取登录用户的信息
 */
export const getLoginUser = async () => {
  return await axiosInstance.get("/user/loginUser").then(res=>res);
}

/**
 * 获取登录用户的角色
 */
export const getUserRole = async () => {
  return await axiosInstance.get("/user/loginUserRole/").then(res => res);
}
/**
 * 根据id查询一个用户
 */
export const getUser = async (uid:number) => {
  return await axiosInstance.get("/user/"+uid).then(res=>res);
}
/**
 * 根据id查询多个用户
 */
export const getUserList= async (uids: number[]) => {
  return await axiosInstance.post("/user/list/" , uids).then(res => res.data);
}
/**
 * 根据truename模糊查询多个用户
 */
export const getUserListLike= async (truename:string) => {
  return await axiosInstance.get("/user/like" , {params:{truename}}).then(res => res.data);
}
/**
 * 根据id删除用户
 */
export const eraseUser= async (uid:number) => {
  return await axiosInstance.delete("/user/"+uid).then(res => res.data);
}
