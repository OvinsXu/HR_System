package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Timestamp;

@Data
@TableName(value = "file")
public class FileEntity {
  @TableId(type = IdType.AUTO)
  private Long id;
  private Long userId;
  private String name;
  private String type;
  private Timestamp uploadTime;
}
