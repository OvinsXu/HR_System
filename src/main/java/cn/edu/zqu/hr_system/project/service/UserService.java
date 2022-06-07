package cn.edu.zqu.hr_system.project.service;

import cn.edu.zqu.hr_system.project.model.entities.UserEntity;
import cn.edu.zqu.hr_system.project.model.params.User.CreateUserParam;

import java.util.List;


public interface UserService {

  /**
   * 新建用户
   *
   * @param createUserParam 创建用户参数
   * @return 结果
   */
  int createUser(CreateUserParam createUserParam) throws Exception;


  /**
   * 通过用户ID查询用户
   *
   * @param userId 用户ID
   * @return 用户实体对象
   */
  UserEntity findUserById(Long userId);

  /**
   * 通过用户邮箱查询用户
   *
   * @param email
   * @return 用户实体对象
   */
  UserEntity findUserByEmail(String email);

//  /**
//   * 根据条件分页查询用户列表
//   *
//   * @param user 用户信息
//   * @return 用户实体对象集合
//   */
//  List<UserEntity> findUserList(UserEntity user);

  /**
   * 根据用户ID查询用户所属岗位组
   *
   * @param userId 用户名
   * @return 结果
   */
  String findUserRoleGroup(Long userId);

  /**
   * 查找所有用户
   *
   * @return 用户实体对象集合
   */
  List<UserEntity> findAll();

  /**
   * 校验用户邮箱是否唯一
   *
   * @param email 用户名称
   * @return 结果
   */
  boolean checkUserEmailUnique(String email);

  /**
   * 更新用户基本信息
   *
   * @param user 更新参数对象
   * @return 结果
   */
  int updateUser(UserEntity user);

//  /**
//   * 更改用户登录邮箱
//   *
//   * @param email 邮箱
//   * @return
//   */
//  int updateUserEmail(String email);

  /**
   * 通过用户id恢复软删除
   *
   * @param userId
   * @return
   */
  int unDeleteById(Long userId);

  /**
   * 通过用户ID软删除用户
   *
   * @param userId
   * @return 结果
   */
  int deleteUserById(Long userId);

  /**
   * 批量软删除用户信息
   *
   * @param userIds 需要删除的用户ID列表
   * @return 结果
   */
  int deleteUserByIds(List<Long> userIds);

  /**
   * 通过用户ID真删除用户
   *
   * @param userId
   * @return 结果
   */
  int eraseUserById(Long userId);

  /**
   * 批量真删除用户信息
   *
   * @param userIds 需要删除的用户ID列表
   * @return 结果
   */
  int eraseUserByIds(List<Long> userIds);

}
