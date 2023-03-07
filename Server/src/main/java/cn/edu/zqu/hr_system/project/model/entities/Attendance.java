package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data

public class Attendance {
  @TableId(type = IdType.AUTO)
  Long id; //
  Long uid; // 用户编号

  int absence; // 缺勤天数
  int leaves;//请假天数

  int year;//年份
  int month;//月份
}

