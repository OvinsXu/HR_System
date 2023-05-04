package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

@Data
public class Post extends BaseEntity {
    Long did; // 所属部门
    String code; // 岗位编码
    String name; // 岗位名称
    Character status; // 状态
    Integer recruit;//招聘人数
}

