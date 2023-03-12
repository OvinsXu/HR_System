
export interface role {
  id: number;
  name: string;
  mean: string;
  recruit: number;
}

export const roles: Array<Partial<role>> = [
  { id: 1, name: "Owner", mean: "厂长", },
  { id: 2, name: "Head ", mean: "主任", },
  { id: 3, name: "HD", mean: "人力开发员", },
  { id: 4, name: "HP", mean: "人力规划员", },
  { id: 5, name: "PIA  ", mean: "工资及保险管理员", },
  { id: 6, name: "TSM  ", mean: "职称管理、工资奖惩员", },
  { id: 7, name: "LP", mean: "劳动计划统计员兼定员定额员", },
  { id: 8, name: "LO", mean: "劳动组织工资调配员", },
  { id: 9, name: "ET", mean: "教育培训管理员", },
  { id: 10, name: "Arch ", mean: "档案管理员", },
  { id: 11, name: "EAA  ", mean: "经济责任制管理员", },
  { id: 12, name: "Assessment ", mean: "考核管理员", },
  { id: 13, name: "Workshop", mean: "车间", },
  { id: 14, name: "Quality ", mean: "质检部", },
  { id: 15, name: "Sales", mean: "销售部", },
  { id: 16, name: "Economic", mean: "经济运行部", },
  { id: 17, name: "Finance", mean: "财务部", },
  { id: 18, name: "Logistics", mean: "后勤部", },
  { id: 100, name: "kunkun", mean: "个人练习生", },
]
