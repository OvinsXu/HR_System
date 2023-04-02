package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.sql.Date;

@Data
public class Department {
  @TableId(type = IdType.AUTO)
  Long id; //
  @TableField(updateStrategy = FieldStrategy.IGNORED)
  Long did; // 父级部门
  Long uid; // 部门主任

  String name; // 部门名称

  char status; // 状态

  @TableField(fill = FieldFill.INSERT)
  long createBy; // 创建者

  @TableField(fill = FieldFill.INSERT)
  Date createTime; // 创建时间

  @TableField(fill = FieldFill.INSERT_UPDATE)
  long updateBy; // 更改者

  @TableField(fill = FieldFill.INSERT_UPDATE)
  Date updateTime; // 更改时间

}

