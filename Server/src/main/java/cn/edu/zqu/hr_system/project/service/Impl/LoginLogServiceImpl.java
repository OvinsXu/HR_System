package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.LoginLogMapper;
import cn.edu.zqu.hr_system.project.model.entities.LoginLog;
import cn.edu.zqu.hr_system.project.service.LoginLogService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;


@Service
public class LoginLogServiceImpl extends ServiceImpl<LoginLogMapper, LoginLog> implements LoginLogService {
}


