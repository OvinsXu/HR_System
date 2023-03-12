package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.common.response.ResultData;
import cn.edu.zqu.hr_system.framework.security.UserInfo;
import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.User;
import cn.edu.zqu.hr_system.project.model.enums.ResultCode;
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

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("创建用户")
  @PostMapping("/")
  public String createUser(@RequestBody User user) {
    System.out.println(user);
    user.setPassword(CryptoUtil.enCrypt(user.getPassword()));
    return Result(userService.save(user));
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("删除用户")
  @DeleteMapping("/{uid}")
  public String eraseUser(@PathVariable Long uid) {
    return Result(userService.removeById(uid));
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("删除用户列表")
  @PostMapping("/list")
  public String eraseUsers(@RequestBody List<Long> uids) {
    return Result(userService.removeBatchByIds(uids));
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("用户查找")
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
  @ApiOperation("用户列表")
  @PostMapping("/list/{uids}")
  public List<User> selectList(@RequestBody List<Long> uids) {
    return userService.listByIds(uids);
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("所有用户")
  @GetMapping("/")
  public List<User> selectAll() {
    return userService.list();
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<User> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<User> iPage = new Page<>(current, size);
    return userService.page(iPage);
  }

  @PreAuthorize("hasAnyRole('admin','hr')")
  @ApiOperation("更改用户")
  @PutMapping("/")
  public String update(@RequestBody User user) {
    System.out.println(user);
    return Result(userService.updateById(user));
  }

  @ApiOperation("登录")
  @ResponseBody
  @PostMapping("/login")
  public ResultData<Object> Login(@RequestBody @Valid LoginParam loginParam) {

    User user = userService.getOneByUsername(loginParam.username);

    if (user != null) {
      if (CryptoUtil.matches(loginParam.password, user.getPassword())) {
        //使用用户名密码进行登录验证
        UsernamePasswordAuthenticationToken upToken =
                new UsernamePasswordAuthenticationToken(loginParam.username, loginParam.password);
        Authentication authentication = authenticationManager.authenticate(upToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //生成JWT
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginParam.username);

        String token = jwtTokenUtil.generateToken(userDetails);
        httpServletResponse.addHeader("Access-Control-Expose-Headers", JwtTokenUtil.HEADER_STRING);//浏览器默认不能访问一些自定义的项
        httpServletResponse.addHeader(JwtTokenUtil.HEADER_STRING, token);

        return ResultData.success(user);
      }
    }
    return ResultData.sendCode(ResultCode.USERNAME_OR_PASSWORD_ERROR, "登陆失败,密码错误");
  }
  //todo:添加登录日志
  //void login_log(String username, String ip, String browser, String os) {//每次登录都进行登记
  //String ip = httpServletRequest.getRemoteAddr();
  //String browser = httpServletRequest.getHeader("USER-AGENT");
  //login_log(loginParam.username,ip,browser,);
  //根据ip查归属地
  //http://whois.pconline.com.cn/ipJson.jsp?ip=192.168.1.1&json=true
  //}

  @ApiOperation("刷新token")
  @PostMapping(value = "/refreshtoken")
  public ResultData<Object> refresh(@RequestHeader(JwtTokenUtil.HEADER_STRING) String token) {
    return ResultData.success(jwtTokenUtil.refreshToken(token));
  }

}
