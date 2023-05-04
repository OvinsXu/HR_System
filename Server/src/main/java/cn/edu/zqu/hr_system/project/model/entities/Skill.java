package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

import java.sql.Date;

@Data

public class Skill extends BaseEntity {
    Long uid; // 用户编号
    String name; // 证书名称
    Date beginTime; // 开始时间
    Date endTime; // 结束时间
    Character status; // 状态
}
