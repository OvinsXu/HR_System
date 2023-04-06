package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.ClocksMapper;
import cn.edu.zqu.hr_system.project.model.entities.Clocks;
import cn.edu.zqu.hr_system.project.service.ClocksService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class ClocksServiceImpl extends ServiceImpl<ClocksMapper, Clocks> implements ClocksService {
}
