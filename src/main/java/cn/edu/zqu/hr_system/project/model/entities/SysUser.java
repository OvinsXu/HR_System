package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "sys_user")
public class SysUser {
  @TableId(type = IdType.AUTO)
  private Long id;
  private String username;
  private String password;
  private String role;
}
