package cn.edu.zqu.hr_system.project.service.impl;

import cn.edu.zqu.hr_system.project.mapper.RoleMapper;
import cn.edu.zqu.hr_system.project.model.entities.RoleEntity;
import cn.edu.zqu.hr_system.project.service.RoleService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

  @Autowired
  private RoleMapper roleMapper;

  /**
   * @param role
   * @return
   */
  @Override
  public int createRole(RoleEntity role) {
    return roleMapper.insert(role);
  }

  /**
   * @param rid
   * @return
   */
  @Override
  public int deleteRole(Long rid) {
    return roleMapper.deleteById(rid);
  }

  /**
   * @param rid
   * @return
   */
  @Override
  public RoleEntity findRoleById(Long rid) {
    return roleMapper.selectById(rid);
  }

  /**
   * @param name
   * @return
   */
  @Override
  public RoleEntity findRoleByName(String name) {
    QueryWrapper<RoleEntity> wrapper = new QueryWrapper();
    wrapper.eq("name", name);
    return roleMapper.selectOne(wrapper);
  }

  /**
   * @param recruit
   * @return
   */
  @Override
  public List<RoleEntity> findRoleByRecruit(String recruit) {
    QueryWrapper<RoleEntity> wrapper = new QueryWrapper<>();
    wrapper.gt("recruit", 0);
    return roleMapper.selectList(wrapper);
  }

  /**
   * @param role
   * @return
   */
  @Override
  public int update(RoleEntity role) {
    return roleMapper.updateById(role);
  }
}
