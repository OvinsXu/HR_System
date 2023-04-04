package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

@Data

public class UserRole extends BaseEntity {
  Long uid; // 用户编号
  Long rid; // 角色编号
  Character status; // 状态
}

