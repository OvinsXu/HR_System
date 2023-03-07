package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.NoticeMapper;
import cn.edu.zqu.hr_system.project.model.entities.Notice;
import cn.edu.zqu.hr_system.project.service.NoticeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice> implements NoticeService {
}


