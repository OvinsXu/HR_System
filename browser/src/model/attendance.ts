export interface AttendanceItem {
  id: number; //
  uid: number;
  absence: number; // 缺勤天数
  leaves: number;//请假天数

  year: number; // 时间
  month: number; // 时间
}
export interface ClockItem {
  id: number; //
  uid: number;
  clockin: Date;
  clockout: Date;

  clockother: Date;
  status: string;
}

