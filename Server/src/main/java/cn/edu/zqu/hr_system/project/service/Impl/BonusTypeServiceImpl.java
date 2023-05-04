package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.BonusTypeMapper;
import cn.edu.zqu.hr_system.project.model.entities.BonusType;
import cn.edu.zqu.hr_system.project.service.BonusTypeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class BonusTypeServiceImpl extends ServiceImpl<BonusTypeMapper, BonusType> implements BonusTypeService {
}

