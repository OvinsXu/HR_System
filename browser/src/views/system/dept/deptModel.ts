export interface DeptItem {
  id: number;  //
  did: number; // 父级部门
  uid: number; // 部门主任
  name: string; // 部门名称
  status: string; // 状态
  createBy: number; // 创建者
  createTime: Date; // 创建时间
  updateBy: number; // 更改者
  updateTime: Date; // 更改时间
}
