package cn.edu.zqu.hr_system.project.service;

import cn.edu.zqu.hr_system.project.model.entities.FileEntity;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;


public interface FileService extends IService<FileEntity> {

  Long upload(MultipartFile file, String type, long uid);

  void download(long fid);
}
