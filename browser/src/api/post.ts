// import {ILogin, UserItem} from "./user";
//
 import axiosInstance from "../app/http";
 import {IPage} from "../views/common";
import {PostItem} from "../views/post/model";
//
export const createPost = async (user: PostItem) => {
  return await axiosInstance.post("/post/",user).then(res => res);
}
//
//
// /**
//  * @description: 用户登录
//  */
// export const Login = async (username: any, password: any) => {
//   return await axiosInstance.post('/user/login', {username:username,password:password}).then(res => res);
// };




/**
 * 获取用户分页
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
//
//
// export const getLoginUser = async () => {
//   return await axiosInstance.get("/user/loginUser").then(res=>res);
// }
//
// export const getUser = async (uid:number) => {
//   return await axiosInstance.get("/user/"+uid).then(res=>res);
// }


