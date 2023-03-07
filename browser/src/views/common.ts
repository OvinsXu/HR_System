//分页参数
import React from "react";
import {UserItem} from "./user/model";

export interface IPage {
  current: number;
  size: number;
}
//信息行属性
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: UserItem;
  index: number;
  children: React.ReactNode;
}
