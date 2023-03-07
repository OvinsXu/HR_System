package cn.edu.zqu.hr_system.project.service;

import cn.edu.zqu.hr_system.project.model.entities.Post;
import com.baomidou.mybatisplus.extension.service.IService;


public interface PostService extends IService<Post> {
  Post getByName(String name);
}

