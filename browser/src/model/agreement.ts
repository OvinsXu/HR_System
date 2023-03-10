export interface AgreementItem{
  id:number; //
  uid:number; // 用户编号
  wage:number; // 基本工资
  // endowment:number; // 养老保险
  // medical:number; // 医疗保险
  // unemployment:number; // 失业保险
  // employment:number; // 工伤保险
  // maternity:number; // 生育保险
  insurance:number;
  housingFund:number; // 住房公积金
  beginTime:Date; // 开始时间
  endTime:Date; // 结束时间
  status:string; // 状态
}
