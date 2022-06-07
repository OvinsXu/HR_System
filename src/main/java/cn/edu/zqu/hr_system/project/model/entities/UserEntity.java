package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Timestamp;


@Data
@TableName(value = "user")
public class UserEntity {
  @TableId(type = IdType.AUTO)
  private Long id;
  private String name;
  private Integer age;
  private String email;
  private String password;
  private Long roleId;
  private boolean del;
  private Timestamp agreement;
}
