package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data

public class Agreement extends BaseEntity {
    Long uid; // 用户编号
    Integer wage; // 基本工资
    Integer insurance;
    Integer housingFund; // 住房公积金
    LocalDateTime beginTime; // 开始时间
    LocalDateTime endTime; // 结束时间
    Character status; // 状态

}
