package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

@Data
public class Bonus extends BaseEntity {
  Long uid; // 用户编号
  Long btid; // 奖金类型
  Double sum; // 金额
  int year; // 发放年份
  int month; // 发放月份

}
