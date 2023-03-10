export interface WageItem {
  id: number; //
  department: string; // 部门
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
