package cn.edu.zqu.hr_system.project.service;

import cn.edu.zqu.hr_system.project.model.entities.RoleEntity;

import java.util.List;

public interface RoleService {

  int createRole(RoleEntity role);

  int deleteRole(Long rid);

  RoleEntity findRoleById(Long rid);

  RoleEntity findRoleByName(String name);

  List<RoleEntity> findRoleByRecruit(String recruit);

  int update(RoleEntity role);
}
