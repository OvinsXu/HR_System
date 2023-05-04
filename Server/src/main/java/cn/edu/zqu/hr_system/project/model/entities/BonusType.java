package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

@Data

public class BonusType extends BaseEntity {
  String name; // 奖金名称
  int gap; // 间隔月份
  char status; // 状态

}

