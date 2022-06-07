package cn.edu.zqu.hr_system.project.service.impl;

import cn.edu.zqu.hr_system.project.mapper.TrainMapper;
import cn.edu.zqu.hr_system.project.model.entities.TrainEntity;
import cn.edu.zqu.hr_system.project.service.TrainService;
import cn.edu.zqu.hr_system.project.service.UserService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class TrainServiceImpl implements TrainService {
  @Autowired
  private FileServiceImpl fileService;
  @Autowired
  private UserService userService;
  @Autowired
  private TrainMapper trainMapper;


  /**
   * @param uid
   * @param file
   * @return
   */
  @Override
  public int createTrain(Long uid, MultipartFile file) {
    Long result = this.fileService.uploadFile(file, "train", uid);

    TrainEntity trainEntity = new TrainEntity();
    trainEntity.setFileId(result);
    trainEntity.setUserId(uid);

    return trainMapper.insert(trainEntity);
  }

  /**
   * @return
   */
  @Override
  public int deleteTrain(Long tid) {
    return trainMapper.deleteById(tid);
  }

  /**
   * @param tid
   * @return
   */
  @Override
  public TrainEntity findTrain(Long tid) {
    return trainMapper.selectById(tid);
  }

  /**
   * @return
   */
  @Override
  public List<TrainEntity> findTrain() {
    return trainMapper.selectList(null);
  }

  /**
   * @param uid
   * @return
   */
  @Override
  public List<TrainEntity> findTrainByUser(Long uid) {
    QueryWrapper<TrainEntity> wrapper = new QueryWrapper<>();
    wrapper.eq("user_id", uid);

    return trainMapper.selectList(wrapper);
  }

  /**
   * @param train
   * @return
   */
  @Override
  public int updateTrain(TrainEntity train) {
    return trainMapper.updateById(train);
  }
}
