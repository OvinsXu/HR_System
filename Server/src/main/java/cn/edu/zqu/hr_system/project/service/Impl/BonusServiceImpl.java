package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.BonusMapper;
import cn.edu.zqu.hr_system.project.model.entities.Bonus;
import cn.edu.zqu.hr_system.project.service.BonusService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class BonusServiceImpl extends ServiceImpl<BonusMapper, Bonus> implements BonusService {
}
