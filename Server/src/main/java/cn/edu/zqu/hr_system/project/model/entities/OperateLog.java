package cn.edu.zqu.hr_system.project.model.entities;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.sql.Date;

@Data

public class OperateLog {
  @TableId(type = IdType.AUTO)
  Long id; //
  Long uid; // 用户编号

  String title; // 模块标题
  String type;// 操作类型
  String method; // 方法名称
  String param; // 操作参数
  char status; // 操作状态
  String result; // 操作结果

  Date time; // 操作时间
}
