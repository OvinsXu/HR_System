package cn.edu.zqu.hr_system.project.service;

import cn.edu.zqu.hr_system.project.model.entities.TrainEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface TrainService {

  int createTrain(Long uid, MultipartFile file);

  int deleteTrain(Long tid);

  TrainEntity findTrain(Long tid);

  List<TrainEntity> findTrain();

  List<TrainEntity> findTrainByUser(Long uid);

  int updateTrain(TrainEntity train);

}
