package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName(value = "wage")
public class WageEntity {
  @TableId(type = IdType.AUTO)
  private Long id;
  private int base;
  private int reward;
  private int status;
  private int year;
  private int month;
  private long userId;
}
