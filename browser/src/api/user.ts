import {AgreementItem, TransferItem, UserItem} from "../model/user";
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
 * 获取用户分页
 */
export const getUserSelf = async () => {
  return await axiosInstance.get("/user/self/").then(res => res.data);
}

/**
 * 更新用户信息
 */
export const updateUser = async (params: UserItem) => {
  return await axiosInstance.put("/user/", params).then(res => res);
}
/**
 * 更新用户信息
 */
export const updateUserSelf = async (params: UserItem) => {
  return await axiosInstance.put("/user/self/", params).then(res => res);
}
/**
 * 更新用户密码
 */
export const updatePwd = async (params: any) => {
  return await axiosInstance.put("/user/password", params).then(res => res);
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


export const createAgreement = async (agreement: any) => {
  return await axiosInstance.post("/agreement/",agreement).then(res => res);
}

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

export const createTransfer = async (user: TransferItem) => {
  return await axiosInstance.post("/transfer/",user).then(res => res);
}

export const getTransferPage = async (params: IPage) => {
  return await axiosInstance.get("/transfer/page", {params: params}).then(res => res.data);
}
export const getTransferPageByStatus = async (params: any) => {
  return await axiosInstance.get("/transfer/page/status", {params: params}).then(res => res.data);
}
export const getTransferbyID = async (params: number) => {
  return await axiosInstance.get("/transfer/" + params).then(res => res.data);
}
export const getTransferList= async (params: number[]) => {
  return await axiosInstance.post("/transfer/list/{pids}" , params).then(res => res.data);
}

export const updateTransfer = async (params: TransferItem) => {
  return await axiosInstance.put("/transfer/", params).then(res => res);
}

export const eraseTransfer= async (pid:number) => {
  return await axiosInstance.delete("/transfer/"+pid).then(res => res.data);
}