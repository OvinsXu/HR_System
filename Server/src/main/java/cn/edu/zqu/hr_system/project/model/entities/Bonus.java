package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.sql.Date;

@Data
public class Bonus {
  @TableId(type = IdType.AUTO)
  Long id; //
  Long uid; // 用户编号
  Long btid; // 奖金类型

  int sum; // 金额
  int year; // 发放年份
  int month; // 发放月份

  @TableField(fill = FieldFill.INSERT)
  Long createBy; // 创建者
  @TableField(fill = FieldFill.INSERT)
  Date createTime; // 创建时间
  @TableField(fill = FieldFill.INSERT_UPDATE)
  Long updateBy; // 更改者
  @TableField(fill = FieldFill.INSERT_UPDATE)
  Date updateTime; // 更改时间
}
