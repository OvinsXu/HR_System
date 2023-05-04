export interface WageItem {
  id: number; //
  days: number; // 带薪天数
  truename: string; // 姓名
  idCard: string; // 身份证号码
  base: number; // 基本工资
  bonus: number; // 奖金
  preTax: number; // 税前总金额
  postTax: number; // 税后总金额
  bonusDetail: string; // 奖金详情
  year: number; // 时间
  month: number; // 时间
}
export interface BonusTypeItem {
  id:number; //
  name:string; // 奖金名称
  status:string; // 状态
  gap:number;//间隔月份
  createBy:number; // 创建者
  createTime:Date; // 创建时间
  updateBy:number; // 更改者
  updateTimeL:Date; // 更改时间
}

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
