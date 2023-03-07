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

