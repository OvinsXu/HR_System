package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName(value = "role")
public class RoleEntity {
  @TableId(type = IdType.AUTO)
  private Long id;
  private String name;
  private String mean;
  private int recruit;
}
