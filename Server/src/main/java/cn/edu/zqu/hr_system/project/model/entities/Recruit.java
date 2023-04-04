package cn.edu.zqu.hr_system.project.model.entities;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

@Data
public class Recruit extends BaseEntity {
    Long pid;// '岗位编号',
    String wage;//'工资',
    String details;//'待遇详情',
    String request;//'工作要求',
    String content;//'工作内容',
    String contact;// '联系方式',
    Integer num;//'招聘人数',
}
