package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.PostMapper;
import cn.edu.zqu.hr_system.project.model.entities.Post;
import cn.edu.zqu.hr_system.project.service.PostService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl extends ServiceImpl<PostMapper, Post> implements PostService {

  @Override
  public Post getByName(String name) {
    QueryWrapper<Post> wrapper = new QueryWrapper<>();
    wrapper.eq("name", name);
    return getOne(wrapper);
  }
}

