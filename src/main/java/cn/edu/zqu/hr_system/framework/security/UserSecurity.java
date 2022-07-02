package cn.edu.zqu.hr_system.framework.security;


import cn.edu.zqu.hr_system.project.model.entities.Role;
import cn.edu.zqu.hr_system.project.model.entities.User;
import cn.edu.zqu.hr_system.project.model.entities.UserRole;
import cn.edu.zqu.hr_system.project.service.RoleService;
import cn.edu.zqu.hr_system.project.service.UserRoleService;
import cn.edu.zqu.hr_system.project.service.UserService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserSecurity implements UserDetailsService {

  @Autowired
  private UserService userService;

  @Autowired
  private RoleService roleService;

  @Autowired
  private UserRoleService userRoleService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


    //mybatis plus不直接支持多表查询,下面是一种解决方案,即手动查询两次,另一种是写mybatis xml
    //多表查询会增加复杂度,三张表以上的联合查询再写xml
    User user = userService.getOneByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("用户名不存在");
    }
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();

    QueryWrapper<UserRole> wrapper = new QueryWrapper<>();
    wrapper.eq("uid", user.getId());
    //wrapper.eq("status", 'Y');
    List<UserRole> userRolesList = userRoleService.list(wrapper);

    for (UserRole userRole : userRolesList) {
      Role role = roleService.getById(userRole.getRid());
      //System.out.println(role);
      authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getCode()));
      //System.out.println(authorities);
    }

    return new UserInfo(user.getUsername(),
            user.getPassword(), user.getId(), authorities);
  }
}
