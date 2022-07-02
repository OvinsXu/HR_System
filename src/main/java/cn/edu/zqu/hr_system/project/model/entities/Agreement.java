package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.sql.Date;

@Data

public class Agreement {
  @TableId(type = IdType.AUTO)
  Long id; //
  Long uid; // 用户编号


  int wage; // 基本工资
  //  int endowment; // 养老保险
//  int medical; // 医疗保险
//  int unemployment; // 失业保险
//  int employment; // 工伤保险
//  int maternity; // 生育保险
  int insurance;
  int housingFund; // 住房公积金

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
