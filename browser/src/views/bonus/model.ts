export interface BonusItem {
  id:number; //
  uid:number; // 用户
  btid:number; // 奖金类型

  sum:number; // 金额
  year:number; // 发放年份
  month:number; // 发放月份

  createBy:number; // 创建者
  createTime:Date; // 创建时间
  updateBy:number; // 更改者
  updateTimeL:Date; // 更改时间
}



