package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.sql.Date;

@Data

public class TrainLog {
  @TableId(type = IdType.AUTO)
  Long id; //
  Long tuid; // 培训用户编号

  String title; // 记录标题
  String content; // 记录内容

  Long createBy; // 创建者
  @TableField(fill = FieldFill.INSERT)
  Date createTime; // 创建时间

  Long updateBy; // 更改者
  @TableField(fill = FieldFill.INSERT_UPDATE)
  Date updateTime; // 更改时间
}


