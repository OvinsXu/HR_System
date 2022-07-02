package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data

public class Wage {
  @TableId(type = IdType.AUTO)
  Long id; //
  String department; // 部门
  String truename; // 姓名
  String idCard; // 身份证号码

  int base; // 基本工资
  int bonus; // 奖金
  int preTax; // 税前总金额
  int postTax; // 税后总金额

  String bonusDetail; // 奖金详情

  int year; // 发放年份
  int month; // 发放月份
}

