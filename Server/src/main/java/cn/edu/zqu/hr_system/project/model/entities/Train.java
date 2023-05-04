package cn.edu.zqu.hr_system.project.model.entities;

import java.sql.Date;

import cn.edu.zqu.hr_system.project.base.BaseEntity;
import lombok.Data;

@Data
public class Train extends BaseEntity{

  String title; // 培训名称
  String brief; // 培训简介
  String content; // 培训内容

  char status; // 状态

  int sum;// 培训人数,

  Date beginTime;  // '开始时间',
  Date endTime;  // '结束时间',


}

