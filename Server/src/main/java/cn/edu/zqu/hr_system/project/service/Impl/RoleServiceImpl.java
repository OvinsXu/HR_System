package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.RoleMapper;
import cn.edu.zqu.hr_system.project.model.entities.Role;
import cn.edu.zqu.hr_system.project.service.RoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {
}
