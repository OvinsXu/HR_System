package cn.edu.zqu.hr_system.project.model.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

@Data

public class Attendance extends BaseEntity{
    @TableId(type = IdType.AUTO)
    Long id; //
    Long uid; // 用户编号
    Integer Leaves; // 缺勤天数
    Integer holiday; // 缺勤天数
    Integer year;//年份
    Integer month;//月份
}

