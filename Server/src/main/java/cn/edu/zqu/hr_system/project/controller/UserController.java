package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.common.response.ResultData;
import cn.edu.zqu.hr_system.framework.security.UserInfo;
import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.User;
import cn.edu.zqu.hr_system.project.model.enums.ResultCode;
import cn.edu.zqu.hr_system.project.model.params.User.ChangePasswd;
import cn.edu.zqu.hr_system.project.model.params.User.LoginParam;
import cn.edu.zqu.hr_system.project.service.Impl.UserServiceImpl;
import cn.edu.zqu.hr_system.project.utils.CryptoUtil;
import cn.edu.zqu.hr_system.project.utils.JwtTokenUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@Api(tags = "用户管理")
@RestController
@RequestMapping("/user")
public class UserController extends BaseController {

  @Autowired
  private UserServiceImpl userService;
  @Autowired
  private HttpServletResponse httpServletResponse;
  //@Autowired
  //private HttpServletRequest httpServletRequest;
  @Resource
  private JwtTokenUtil jwtTokenUtil;
  @Resource
  private AuthenticationManager authenticationManager;
  @Resource
  private UserDetailsService userDetailsService;

  //需要admin/hr的角色才能访问该接口
  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("创建用户")
  @PostMapping("/")
  public String createUser(@RequestBody User user) {
    System.out.println(user);
    user.setPassword(CryptoUtil.enCrypt(user.getPassword()));
    return Result(userService.save(user));
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("通过ID删除用户")
  @DeleteMapping("/{uid}")
  public String eraseUser(@PathVariable Long uid) {
    return Result(userService.removeById(uid));
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("通过ID列表删除用户列表")
  @DeleteMapping("/list")
  public String eraseUsers(@RequestBody List<Long> uids) {
    return Result(userService.removeBatchByIds(uids));
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("通过ID查找用户")
  @GetMapping("/{uid}")
  public User selectOne(@PathVariable Long uid) {
    return userService.getById(uid);
  }

  @ApiOperation("查找当前登录账号")
  @GetMapping("/loginUser")
  public User selectLoginOne(@RequestHeader(JwtTokenUtil.HEADER_STRING) String token) {
    String username = jwtTokenUtil.getUsernameFromToken(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
    return userService.getOneByUsername(username);
  }

  @ApiOperation("查找当前登录账号的角色")
  @GetMapping("/loginUserRole")
  public Object selectLoginUserRole(@AuthenticationPrincipal UserInfo userInfo) {
    return userInfo.getRole();
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("通过ID列表获取用户列表")
  @PostMapping("/list/")
  public List<User> selectList(@RequestBody List<Long> uids) {
    return userService.listByIds(uids);
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("获取所有用户")
  @GetMapping("/")
  public List<User> selectAll() {
    return userService.list();
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("通过姓名模糊查询")
  @GetMapping("/like")
  public List<User> selectUserLike(@RequestParam String truename) {
    return userService.getOneLikeTruename(truename);
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<User> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<User> iPage = new Page<>(current, size);
    return userService.page(iPage);
  }
  
  @ApiOperation("查询登陆用户自己的信息")
  @GetMapping("/self")
  public User selectPage(@AuthenticationPrincipal UserInfo userInfo) {
    return userService.getById(userInfo.getId());
  }
  @ApiOperation("更改自己的用户信息")
  @PutMapping("/self")
  public String updateSelf(@RequestBody User user,@AuthenticationPrincipal UserInfo userInfo) {
    user.setId(userInfo.getId());
    return Result(userService.updateById(user));
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("更改用户")
  @PutMapping("/")
  public String update(@RequestBody User user) {
    System.out.println(user);
    return Result(userService.updateById(user));
  }

  @ApiOperation("更改密码")
  @PutMapping("/password")
  public ResultData<Object> updatePWd(@RequestBody ChangePasswd changePwd,@AuthenticationPrincipal UserInfo userInfo) {
    long uid = userInfo.getId();
    User user = userService.getById(uid);

    if(CryptoUtil.matches(changePwd.oldPwd, user.getPassword())){
      user.setPassword(CryptoUtil.enCrypt(changePwd.newPwd));
      return ResultData.success(userService.updateById(user));
    }
    else{
      return ResultData.sendCode(ResultCode.USERNAME_OR_PASSWORD_ERROR, "更改密码失败,旧密码错误");
    }
    
  }

  @ApiOperation("登录")
  @ResponseBody
  @PostMapping("/login")
  public ResultData<Object> Login(@RequestBody @Valid LoginParam loginParam) {
    User user = userService.getOneByUsername(loginParam.username);
    if (user != null) {
      //使用用户名密码进行登录验证
      if (CryptoUtil.matches(loginParam.password, user.getPassword())) {
        //使用Spring Security的用户名密码验证策略,构造认证信息
        UsernamePasswordAuthenticationToken upToken =
                new UsernamePasswordAuthenticationToken(loginParam.username, loginParam.password);
        //对认证信息进行认证
        Authentication authentication = authenticationManager.authenticate(upToken);
        //保存认证信息到SecurityContextHolder
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //到数据库中读取用户的权限信息
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginParam.username);
        //生成Token
        String token = jwtTokenUtil.generateToken(userDetails);
        //响应头返回Token
        httpServletResponse.addHeader("Access-Control-Expose-Headers", JwtTokenUtil.HEADER_STRING);
        httpServletResponse.addHeader(JwtTokenUtil.HEADER_STRING, token);
        //响应体返回用户信息
        return ResultData.success(user);
      }
    }
    return ResultData.sendCode(ResultCode.USERNAME_OR_PASSWORD_ERROR, "登陆失败,密码错误");
  }

  @ApiOperation("刷新token")
  @PostMapping(value = "/refreshtoken")
  public ResultData<Object> refresh(@RequestHeader(JwtTokenUtil.HEADER_STRING) String token) {
    return ResultData.success(jwtTokenUtil.refreshToken(token));
  }

}
