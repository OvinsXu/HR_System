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

export interface AgreementItem{
  id:number; //
  uid:number; // 用户编号
  wage:number; // 基本工资
  insurance:number;
  beginTime:Date; // 开始时间
  endTime:Date; // 结束时间
  status:string; // 状态
}

export interface TransferItem {
  id:number; //
  uid:number; // 用户编号
  pid:number; // 岗位编号
  status:string; // 状态

  createBy:number; // 创建者
  createTime:Date; // 创建时间
  updateBy:number; // 更改者
  updateTime:Date; // 更改时间
}