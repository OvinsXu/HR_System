package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.FileBindMapper;
import cn.edu.zqu.hr_system.project.model.entities.FileBind;
import cn.edu.zqu.hr_system.project.service.FileBindService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class FileBindServiceImpl extends ServiceImpl<FileBindMapper, FileBind> implements FileBindService {
}
