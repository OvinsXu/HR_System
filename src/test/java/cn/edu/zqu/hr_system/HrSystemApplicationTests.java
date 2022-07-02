package cn.edu.zqu.hr_system;

import cn.edu.zqu.hr_system.project.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class HrSystemApplicationTests {
  @Autowired
  UserMapper userMapper;

  @Test
  void contextLoads() {
//    List<User> users = userMapper.selectByRoleId(2);
//    System.out.println(users);
  }

}
