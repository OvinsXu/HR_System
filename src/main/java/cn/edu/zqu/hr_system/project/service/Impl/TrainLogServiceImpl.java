package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.TrainLogMapper;
import cn.edu.zqu.hr_system.project.model.entities.TrainLog;
import cn.edu.zqu.hr_system.project.service.TrainLogService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class TrainLogServiceImpl extends ServiceImpl<TrainLogMapper, TrainLog> implements TrainLogService {
}


