package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.LeavesMapper;
import cn.edu.zqu.hr_system.project.model.entities.Leaves;
import cn.edu.zqu.hr_system.project.service.LeavesService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class LeavesServiceImpl extends ServiceImpl<LeavesMapper, Leaves> implements LeavesService {
}

