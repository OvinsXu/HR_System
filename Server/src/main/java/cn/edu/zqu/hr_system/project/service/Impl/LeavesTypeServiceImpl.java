package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.LeavesTypeMapper;
import cn.edu.zqu.hr_system.project.model.entities.LeavesType;
import cn.edu.zqu.hr_system.project.service.LeavesTypeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class LeavesTypeServiceImpl extends ServiceImpl<LeavesTypeMapper, LeavesType> implements LeavesTypeService {
}

