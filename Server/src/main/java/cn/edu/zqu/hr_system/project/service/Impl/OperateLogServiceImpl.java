package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.OperateLogMapper;
import cn.edu.zqu.hr_system.project.model.entities.OperateLog;
import cn.edu.zqu.hr_system.project.service.OperateLogService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;


@Service
public class OperateLogServiceImpl extends ServiceImpl<OperateLogMapper, OperateLog> implements OperateLogService {
}
