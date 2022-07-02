package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;


@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(allowSetters = true, value = {"password"})
@Data

public class User {
  @TableId(type = IdType.AUTO)
  Long id; //
  Long pid; // 岗位编号
  String username; // 账号
  String password; // 密码
  String truename; // 姓名
  char sex; // 性别
  int age; // 年龄
  int avatar; // 头像
  String nativePlace; // 籍贯
  String email; // 邮箱
  String phone; // 手机号码
  String address; // 住址
  String card; // 银行卡号
  String idCard; // 身份证号码
  @TableField(insertStrategy = FieldStrategy.NOT_NULL)
  char cash; // 工资结算方式
  @TableField(insertStrategy = FieldStrategy.NOT_NULL)
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
