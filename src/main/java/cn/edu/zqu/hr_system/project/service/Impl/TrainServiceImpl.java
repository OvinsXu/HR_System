package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.TrainMapper;
import cn.edu.zqu.hr_system.project.model.entities.Train;
import cn.edu.zqu.hr_system.project.service.TrainService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TrainServiceImpl extends ServiceImpl<TrainMapper, Train> implements TrainService {
  @Override
  public int createTrain(String username, MultipartFile file) {
    return 0;
  }
}


