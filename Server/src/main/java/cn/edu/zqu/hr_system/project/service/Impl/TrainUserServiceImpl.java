package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.TrainUserMapper;
import cn.edu.zqu.hr_system.project.model.entities.TrainUser;
import cn.edu.zqu.hr_system.project.service.TrainUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class TrainUserServiceImpl extends ServiceImpl<TrainUserMapper, TrainUser> implements TrainUserService {
}
