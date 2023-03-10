export interface PostItem {
  id:number; //
  did:number; // 所属部门
  code:string; // 岗位编码
  name:string; // 岗位名称
  status:string; // 状态
  recruit:number;//招聘人数
  createBy:number; // 创建者
  createTime:Date; // 创建时间
  updateBy:number; // 更改者
  updateTimeL:Date; // 更改时间
}
