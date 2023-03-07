import React from "react";


//登录参数
export interface ILogin {
  username: string;
  password: string;
  remember: boolean;
}


//用户参数
export interface UserItem {
  id: number;
  pid: number;            // 岗位编号
  username: string;       // 账号
  password: string;       // 密码
  truename: string;       // 姓名
  sex: string;            // 性别
  age: number;            // 年龄
  avatar: number;         // 头像
  nativePlace: string;    // 籍贯
  email: string;          // 邮箱
  phone: string;          // 手机号码
  address: string;        // 住址
  card: string;           // 银行卡号
  idCard: string;         // 身份证号码
  cash: string;           // 工资结算方式
  status: string;         // 状态
}

