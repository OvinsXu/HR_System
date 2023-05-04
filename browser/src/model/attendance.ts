export interface AttendanceItem {
  id: number; //
  uid: number;
  leaves: number; // 缺勤假
  holiday: number; //带薪假
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

export interface LeavesTypeItem {
  name: string;
}

export interface LeavesItem {
  id: number; 
  uid: number;
  hid: number;
  beginDate: Date;
  endDate: Date;
  details: string;
  status: string;
}
