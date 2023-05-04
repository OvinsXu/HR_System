package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

import java.time.LocalDateTime;


@Data
public class Leaves extends BaseEntity {
    Long uid;
    Long hid;
    LocalDateTime beginDate;
    LocalDateTime endDate;
    String details;
    Character status;
}