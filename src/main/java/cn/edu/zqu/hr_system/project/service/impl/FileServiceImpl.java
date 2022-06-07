package cn.edu.zqu.hr_system.project.service.impl;

import cn.edu.zqu.hr_system.project.mapper.FileMapper;
import cn.edu.zqu.hr_system.project.model.entities.FileEntity;
import cn.edu.zqu.hr_system.project.service.FileService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.List;

@Service
public class FileServiceImpl implements FileService {
  @Autowired
  private HttpServletResponse response;

  @Autowired
  private FileMapper userMapper;
  @Autowired
  private FileMapper fileMapper;


  @Value("${file.path}")
  private String dir;

  public Long uploadFile(MultipartFile file, String type, Long user_id) {

    if (file.isEmpty()) {
      return 0l;
    }

    String fileName = file.getOriginalFilename();
    String path = dir + user_id + "/" + type + "/" + fileName;
    if (new File(path).getParentFile().exists()) {
      new File(path).getParentFile().mkdirs();
    }

    try {
      InputStream is = file.getInputStream();
      Files.copy(is, Paths.get(path), StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException e) {
      System.out.println(e);
      return -1l;
    }

    FileEntity fileEntity = new FileEntity();
    fileEntity.setName(fileName);
    fileEntity.setType(type);
    fileEntity.setUserId(user_id);
    fileEntity.setUploadTime(new Timestamp(System.currentTimeMillis()));
    fileMapper.insert(fileEntity);

    return fileEntity.getId();
  }


  public void downloadFile(Long fid) {
    FileEntity file = findFileById(fid);
    String path = dir + file.getUserId() + "/" + file.getType() + "/" + file.getName();
    try {
      // 读到流中
      InputStream inputStream = new FileInputStream(path);// 文件的存放路径
      response.reset();
      response.setContentType("application/octet-stream");
      String filename = new File(path).getName();
      response.addHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(filename, "UTF-8"));
      ServletOutputStream outputStream = response.getOutputStream();
      byte[] b = new byte[1024];
      int len;
      //从输入流中读取一定数量的字节，并将其存储在缓冲区字节数组中，读到末尾返回-1
      while ((len = inputStream.read(b)) > 0) {
        outputStream.write(b, 0, len);
      }
      inputStream.close();
    } catch (Exception e) {
      System.out.println(e);
    }


  }

  /**
   * @param fid
   * @return
   */
  @Override
  public FileEntity findFileById(Long fid) {
    return fileMapper.selectById(fid);
  }

  /**
   * @param uid
   * @return
   */
  @Override
  public List<FileEntity> findFileByUser(Long uid) {
    QueryWrapper<FileEntity> wrapper = new QueryWrapper<>();
    wrapper.eq("user_id", uid);
    return fileMapper.selectList(wrapper);
  }

  /**
   * @param tid
   * @return
   */
  @Override
  public List<FileEntity> findFileByType(Long tid) {
    QueryWrapper<FileEntity> wrapper = new QueryWrapper<>();
    wrapper.eq("type_id", tid);
    return fileMapper.selectList(wrapper);
  }

  /**
   * @param fid
   */
  @Override
  public int deleteFile(Long fid) {
    return fileMapper.deleteById(fid);
  }


}
