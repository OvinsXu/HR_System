package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.common.response.ResultData;
import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.UserEntity;
import cn.edu.zqu.hr_system.project.model.params.User.CreateUserParam;
import cn.edu.zqu.hr_system.project.model.params.User.LoginParam;
import cn.edu.zqu.hr_system.project.service.UserService;
import cn.edu.zqu.hr_system.project.utils.JwtUtil;
import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Api(tags = "用户管理")
@RestController
@RequestMapping("/user")
public class UserController extends BaseController {
  @Autowired
  private UserService userService;

  //@PreAuthorize("hasAnyRole('Owner','Head')")
  @ApiOperation("创建用户")
  @PostMapping
  public String createUser(@RequestBody @Valid CreateUserParam createUserParam) throws Exception {
    return Result(userService.createUser(createUserParam));
  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
  @ApiOperation("硬删除用户")
  @DeleteMapping("/{id}")
  public String eraseUser(@PathVariable Long id) {
    return Result(userService.eraseUserById(id));
  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
  @ApiOperation("硬删除用户列表")
  @PostMapping("/deleteList")
  public String eraseUsers(@RequestBody List<Long> userIds) {
    return "硬删除了" + userService.eraseUserByIds(userIds) + "个条目!";
  }

  //@PreAuthorize("hasAnyRole('Head')")
  @ApiOperation("用户查找")
  @GetMapping("/{id}")
  public UserEntity findOne(@PathVariable Long id) {
    return userService.findUserById(id);
  }

  @PreAuthorize("hasAnyRole('Owner','Head')")
  @ApiOperation("用户列表")
  @GetMapping
  public List<UserEntity> findAll(HttpServletRequest request) {
    //String username = JwtUtil.getUser(request);
    //System.out.println(username);
    return userService.findAll();
  }

  @ApiOperation("更改用户")
  @PutMapping("/")
  public String update(UserEntity user) {
    return Result(userService.updateUser(user));
  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
//  @ApiOperation("软删除用户")
//  @PatchMapping("/del/{id}")
//  public String deleteUser(@PathVariable Long id) {
//
//    return userService.deleteUserById(id) == 1 ? "软删除成功" : "软删除失败";
//  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
//  @ApiOperation("软删除用户列表")
//  @PatchMapping("/del")
//  public String deleteUsers(@RequestBody List<Long> userIds) {
//
//    return userService.deleteUserByIds(userIds) == 1 ? "软删除列表成功" : "软删除列表失败";
//  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
//  @ApiOperation("恢复软删除用户")
//  @PatchMapping("/undel/{id}")
//  public String unDeleteUser(@PathVariable Long id) {
//    return userService.deleteUserById(id) == 1 ? "恢复软删除成功" : "恢复软删除失败";
//  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
//  @ApiOperation("恢复软删除用户列表")
//  @PatchMapping("/undel")
//  public String unDeleteUsers(@RequestBody List<Long> userIds) {
//
//    return userService.deleteUserByIds(userIds) == 1 ? "恢复软删除列表成功" : "恢复软删除列表失败";
//  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
//  @ApiOperation("更改登录邮箱")
//  @PatchMapping("/email/{id}")
//  public String patchUserEmail(@PathVariable Long id, @RequestBody String email) {
//    UserEntity user = userService.findUserById(id);
//    user.setEmail(email);
//
//    return userService.updateUser(user) == 1 ? "更新成功!" : "更新失败!";
//  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
//  @ApiOperation("更改密码")
//  @PatchMapping("/pwd/{id}")
//  public String patchUserPassword(@PathVariable Long id, @RequestBody String pwd) {
//    UserEntity user = userService.findUserById(id);
//    user.setPassword(pwd);
//    return userService.updateUser(user) == 1 ? "更新成功!" : "更新失败!";
//  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
//  @ApiOperation("更改岗位")
//  @PatchMapping("/role/{id}")
//  public String patchUserRole(@PathVariable Long id, @RequestBody Long role_id) {
//    UserEntity user = userService.findUserById(id);
//    user.setRoleId(role_id);
//    return userService.updateUser(user) == 1 ? "更新成功!" : "更新失败!";
//  }

  /**
   * 方法名：作用：登陆校验密码
   * 输入 username password  用户名，密码
   * 输出：code: 状态码   1 为认证成功 0 为用户不存在 -1 为密码不一致 -2 表示程序错误
   * success:  true or false 执行成功或失败
   * result：只在认证成功时返回，包含用户的全部信息
   * messsage:
   */
  @ApiOperation("登录")
  @ResponseBody
  @PostMapping("/login")
  public ResultData Login(@RequestBody @Valid LoginParam loginParam) {
    System.out.println(loginParam.email);
    JSONObject json = new JSONObject();
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    try {
      UserEntity user = userService.findUserByEmail(loginParam.email);
      System.out.println(user);
      if (user != null) {
        String dbPassWord = user.getPassword();
        if (bCryptPasswordEncoder.matches(loginParam.password, dbPassWord)) {
          //创建token

          String token = JwtUtil.generateToken(loginParam.email);

          return ResultData.success(token);
//          json.put("success", true);
//          json.put("code", 1);
//          //json.put("result", user);
//          json.put("time", new Date().toString());
//          json.put("message", "登陆成功");
//          json.put(JwtUtil.AUTHORIZATION, token);
        } else {
          return ResultData.fail(-1, "登陆失败,密码错误");
//          json.put("success", false);
//          json.put("code", -1);
//          json.put("message", "登陆失败,密码错误");
        }
      } else {
        return ResultData.fail(0, "无此用户信息");
//        json.put("success", false);
//        json.put("code", 0);
//        json.put("message", "无此用户信息");
      }
    } catch (Exception e) {
      return ResultData.fail(-2, e.getMessage());
//      json.put("code", -2);
//      json.put("success", false);
//      json.put("message", e.getMessage());

    }
    //return JSON.toJSONString(json);
  }


}
