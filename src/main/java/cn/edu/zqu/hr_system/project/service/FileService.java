package cn.edu.zqu.hr_system.project.service;

import cn.edu.zqu.hr_system.project.model.entities.FileEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface FileService {

  /**
   * 上传文件
   *
   * @param file    文件对象
   * @param type    文件类型
   * @param user_id 上传者ID
   * @return 文件ID
   */
  Long uploadFile(MultipartFile file, String type, Long user_id);

  int deleteFile(Long fid);

  /**
   * @param fid 指想要下载的文件的编号
   * @功能描述 下载文件:将输入流中的数据循环写入到响应输出流中，而不是一次性读取到内存
   */
  void downloadFile(Long fid);

  FileEntity findFileById(Long fid);


  List<FileEntity> findFileByUser(Long uid);

  List<FileEntity> findFileByType(Long tid);


}
