package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.RecruitMapper;
import cn.edu.zqu.hr_system.project.model.entities.Recruit;
import cn.edu.zqu.hr_system.project.service.RecruitService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class RecruitServiceImpl extends ServiceImpl<RecruitMapper, Recruit> implements RecruitService {
}
