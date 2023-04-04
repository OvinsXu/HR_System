package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

@Data
public class Transfer extends BaseEntity {
    Long uid; // 用户编号
    Long pid; // 岗位编号
    Character status; // 状态
}
