package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.FileMapper;
import cn.edu.zqu.hr_system.project.model.entities.FileEntity;
import cn.edu.zqu.hr_system.project.service.FileService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
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
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;

@Service
public class FileServiceImpl extends ServiceImpl<FileMapper, FileEntity> implements FileService {

  @Autowired
  private HttpServletResponse response;
  @Value("${file.path}")
  private String dir;


  @Override
  public Long upload(MultipartFile file, String type, long uid) {
    if (file.isEmpty()) {
      return 0L;
    }

    String fileName = file.getOriginalFilename();
    String path = dir + uid + "/" + type + "/" + fileName;
    if (new File(path).getParentFile().exists()) {
      new File(path).getParentFile().mkdirs();
    }

    try {
      InputStream is = file.getInputStream();
      Files.copy(is, Paths.get(path), StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException e) {
      return -1L;
    }

    //文件名,无后缀
    String suffix = fileName.substring(fileName.lastIndexOf("."));//文件后缀

    FileEntity fileEntity = new FileEntity();
    fileEntity.setUid(uid);
    fileEntity.setName(fileName);
    fileEntity.setSuffix(suffix);
    fileEntity.setPath(path);
    fileEntity.setCreateBy(uid);
    fileEntity.setCreateTime(new Date(System.currentTimeMillis()));
    fileEntity.setUpdateBy(uid);
    fileEntity.setUpdateTime(new Date(System.currentTimeMillis()));


    return fileEntity.getId();
  }

  /**
   * @param fid 文件Id
   */
  @Override
  public void download(long fid) {
    FileEntity file = getById(fid);
    String path = file.getPath();
    try {
      // 读到流中
      InputStream inputStream = new FileInputStream(path);// 文件的存放路径
      response.reset();
      response.setContentType("application/octet-stream");
      String filename = new File(path).getName();
      response.addHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(filename, StandardCharsets.UTF_8));
      ServletOutputStream outputStream = response.getOutputStream();
      byte[] b = new byte[1024];
      int len;
      //从输入流中读取一定数量的字节，并将其存储在缓冲区字节数组中，读到末尾返回-1
      while ((len = inputStream.read(b)) > 0) {
        outputStream.write(b, 0, len);
      }
      inputStream.close();
    } catch (Exception e) {
      //System.out.println(e);
    }
  }
}
