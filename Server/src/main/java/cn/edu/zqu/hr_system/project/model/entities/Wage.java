package cn.edu.zqu.hr_system.project.model.entities;

import com.alibaba.excel.annotation.ExcelIgnore;
import com.alibaba.excel.annotation.ExcelProperty;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;
@Data
public class Wage extends BaseEntity {
  @ExcelProperty(value = "姓名")
  String truename; // 姓名
  @ExcelProperty(value = "身份证号码")
  String idCard; // 身份证号码
  @ExcelProperty(value = "基本工资")
  Double base; // 基本工资
  @ExcelProperty(value = "奖金")
  Double bonus; // 奖金
  @ExcelProperty(value = "税前工资")
  Double preTax; // 税前总金额
  @ExcelProperty(value = "税后工资")
  Double postTax; // 税后总金额
  @ExcelProperty(value = "奖金详情")
  String bonusDetail; // 奖金详情
  @ExcelProperty(value = "工资天数")
  Integer days; // 工资天数
  @ExcelIgnore
  Integer year; // 发放年份
  @ExcelIgnore
  Integer month; // 发放月份
}

