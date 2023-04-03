package cn.edu.zqu.hr_system.project.service.Impl;

import cn.edu.zqu.hr_system.project.mapper.UserMapper;
import cn.edu.zqu.hr_system.project.model.entities.User;
import cn.edu.zqu.hr_system.project.service.UserService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {


  @Override
  public User getOneByUsername(String username) {
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("username", username);
    return getOne(wrapper);
  }

  @Override
  public List<User> getOneLikeTruename(String truename) {
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.like("truename", truename);
    return list(wrapper);
  }

}
