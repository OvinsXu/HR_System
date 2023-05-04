export interface TrainItem {
  id: number; //


  sum: number; // 培训人数

  title: string; // 培训名称
  brief: string; // 培训简介
  content: string; // 培训内容

  status: string; // 状态


  beginTime: Date;  // '开始时间',
  endTime: Date;  // '结束时间',

  createBy: number; // 创建者
  createTime: Date; // 创建时间
  updateBy: number; // 更改者
  updateTimeL: Date; // 更改时间
}
export interface SkillItem{
  id:number; //
  uid:number; // 用户编号
  name:string; // 证书名称
  beginTime:Date; // 开始时间
  endTime:Date; // 结束时间
  status:string; // 状态
}



