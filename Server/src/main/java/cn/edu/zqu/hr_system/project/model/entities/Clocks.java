package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Clocks extends BaseEntity {
  Long uid; // 用户编号

  Character status;
  LocalDateTime clockin; // 开始时间
  LocalDateTime clockout; // 结束时间
}
