package cn.edu.zqu.hr_system.project.model.entities;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.sql.Date;

@Data

public class LoginLog {
  @TableId(type = IdType.AUTO)
  Long id; //

  String name; // 账号

  String ipaddr; // ip地址
  String location; // ip定位

  String browser; // 浏览器
  String os; // 操作系统

  Boolean status; // 登录状态

  Date time; // 操作时间
}


