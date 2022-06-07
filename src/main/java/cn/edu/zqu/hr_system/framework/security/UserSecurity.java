package cn.edu.zqu.hr_system.framework.security;

import cn.edu.zqu.hr_system.project.mapper.RoleMapper;
import cn.edu.zqu.hr_system.project.model.entities.RoleEntity;
import cn.edu.zqu.hr_system.project.model.entities.UserEntity;
import cn.edu.zqu.hr_system.project.service.impl.UserServiceImpl;
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
  private UserServiceImpl userService;
  @Autowired
  private RoleMapper roleMapper;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    //mybatis plus不直接支持多表查询,下面是一种解决方案,另一种是写mybatis xml
    UserEntity user = this.userService.findUserByEmail(email);
    if (user == null) {
      throw new UsernameNotFoundException("用户名不存在");
    }
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();

    QueryWrapper<RoleEntity> wrapperRole = new QueryWrapper<>();
    wrapperRole.eq("id", user.getRoleId());
    RoleEntity roleEntity = roleMapper.selectOne(wrapperRole);
    authorities.add(new SimpleGrantedAuthority(roleEntity.getName()));

    return new org.springframework.security.core.userdetails.User(user.getEmail(),
            user.getPassword(), authorities);
  }
}
