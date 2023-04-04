package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

@Data

public class Role extends BaseEntity {
  String code; // 角色编码
  String name; // 角色名称
  Character status; // 状态
}
