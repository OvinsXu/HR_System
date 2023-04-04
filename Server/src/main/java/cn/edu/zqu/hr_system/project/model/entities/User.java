package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(allowSetters = true, value = {"password"})
@Data
public class User extends BaseEntity {
    Long pid; // 岗位编号
    String username; // 账号
    String password; // 密码
    String truename; // 姓名
    Character sex; // 性别
    Integer age; // 年龄
    Integer avatar; // 头像
    String nativePlace; // 籍贯
    String email; // 邮箱
    String phone; // 手机号码
    String address; // 住址
    String card; // 银行卡号
    String idCard; // 身份证号码
    @TableField(insertStrategy = FieldStrategy.NOT_NULL)
    Character cash; // 工资结算方式
    @TableField(insertStrategy = FieldStrategy.NOT_NULL)
    Character status; // 状态
}
