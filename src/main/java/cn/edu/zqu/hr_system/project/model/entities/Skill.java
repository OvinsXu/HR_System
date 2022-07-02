package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.sql.Date;

@Data

public class Skill {
  @TableId(type = IdType.AUTO)
  Long id; //
  Long uid; // 用户编号

  String name; // 证书名称


  Date beginTime; // 开始时间
  Date endTime; // 结束时间

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
