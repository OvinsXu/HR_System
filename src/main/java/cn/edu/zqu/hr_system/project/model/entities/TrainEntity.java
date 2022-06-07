package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "train")
public class TrainEntity {
  @TableId(type = IdType.AUTO)
  private Long id;
  private Long userId;
  private Long fileId;
  private String status;
}
