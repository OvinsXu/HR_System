package cn.edu.zqu.hr_system.project.service.impl;

import cn.edu.zqu.hr_system.project.mapper.UserMapper;
import cn.edu.zqu.hr_system.project.model.entities.UserEntity;
import cn.edu.zqu.hr_system.project.model.params.User.CreateUserParam;
import cn.edu.zqu.hr_system.project.service.UserService;
import cn.edu.zqu.hr_system.project.utils.CryptoUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
  @Autowired
  private UserMapper userMapper;
  @Autowired
  private CryptoUtil cryptoUtil;


  /**
   * 新建用户
   *
   * @param createUserParam 创建用户参数
   * @return 结果
   */
  @Override
  public int createUser(CreateUserParam createUserParam) throws Exception {
    if (!createUserParam.password.equals(createUserParam.repassword)) {
      throw new Exception("输入的两次密码不一致!");
    }
    if (!checkUserEmailUnique(createUserParam.email)) {
      throw new Exception("用户邮箱已被占用!");
    }

    UserEntity user = new UserEntity();
    user.setAge(createUserParam.age);
    user.setEmail(createUserParam.email);
    user.setName(createUserParam.username);
    user.setPassword(cryptoUtil.EnCrypt(createUserParam.password));

    return userMapper.insert(user);
  }

  /**
   * 通过用户ID软删除用户
   *
   * @param userId
   * @return 结果
   */
  @Override
  public int deleteUserById(Long userId) {
    UserEntity user = new UserEntity();
    user.setId(userId);
    user.setDel(true);
    return userMapper.updateById(user);
  }

  /**
   * 批量软删除用户信息
   *
   * @param userIds 需要删除的用户ID列表
   * @return 结果
   */
  @Override
  public int deleteUserByIds(List<Long> userIds) {
    for (Long userId : userIds) {
      deleteUserById(userId);
    }
    return 1;
  }

  /**
   * 通过用户ID真删除用户
   *
   * @param userId
   * @return 结果
   */
  @Override
  public int eraseUserById(Long userId) {
    return userMapper.deleteById(userId);
  }

  /**
   * 批量真删除用户信息
   *
   * @param userIds 需要删除的用户ID列表
   * @return 结果
   */
  @Override
  public int eraseUserByIds(List<Long> userIds) {
    return userMapper.deleteBatchIds(userIds);
  }

  /**
   * 通过用户ID查询用户
   *
   * @param userId 用户ID
   * @return 用户实体对象
   */
  @Override
  public UserEntity findUserById(Long userId) {
    return userMapper.selectById(userId);
  }

  /**
   * 通过用户邮箱查询用户
   *
   * @param email
   * @return 用户实体对象
   */
  @Override
  public UserEntity findUserByEmail(String email) {
    QueryWrapper<UserEntity> wrapperUser = new QueryWrapper<>();
    wrapperUser.eq("email", email);
    UserEntity user = userMapper.selectOne(wrapperUser);
    return user;
  }

  /**
   * 根据用户ID查询用户所属岗位组
   *
   * @param userId 用户名
   * @return 结果
   */
  @Override
  public String findUserRoleGroup(Long userId) {
    findUserById(userId).getRoleId();
    return null;
  }

  public List<UserEntity> findAll() {
    return userMapper.selectList(null);
  }

  /**
   * 校验用户邮箱是否唯一
   *
   * @param email 用户名称
   * @return 结果
   */
  @Override
  public boolean checkUserEmailUnique(String email) {
    QueryWrapper<UserEntity> wrapper = new QueryWrapper<>();
    wrapper.eq("email", email);

    if (userMapper.selectOne(wrapper) != null) {
      return false;
    }
    return true;
  }

  /**
   * 更新用户基本信息
   *
   * @param user 更新参数对象
   * @return 结果
   */
  @Override
  public int updateUser(UserEntity user) {
    return userMapper.updateById(user);
  }

  /**
   * 通过用户id恢复软删除
   *
   * @param userId
   * @return
   */
  @Override
  public int unDeleteById(Long userId) {
    UserEntity user = new UserEntity();
    user.setId(userId);
    user.setDel(false);
    return userMapper.updateById(user);
  }

}
