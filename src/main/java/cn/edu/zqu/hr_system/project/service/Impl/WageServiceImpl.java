package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.WageLogMapper;
import cn.edu.zqu.hr_system.project.model.entities.Wage;
import cn.edu.zqu.hr_system.project.service.WageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class WageServiceImpl extends ServiceImpl<WageLogMapper, Wage> implements WageService {
}

