package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

@Data
public class Department extends BaseEntity {
  @TableField(updateStrategy = FieldStrategy.IGNORED)
  Long did; // 父级部门
  Long uid; // 部门主任
  String name; // 部门名称
  Character status; // 状态
}

