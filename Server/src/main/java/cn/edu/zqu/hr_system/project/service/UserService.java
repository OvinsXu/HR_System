package cn.edu.zqu.hr_system.project.service;

import cn.edu.zqu.hr_system.project.model.entities.User;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;


public interface UserService extends IService<User> {
  User getOneByUsername(String username);
  List<User> getOneLikeTruename(String username);
}
