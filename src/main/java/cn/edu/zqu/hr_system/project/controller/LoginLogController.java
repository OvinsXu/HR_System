package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.LoginLog;
import cn.edu.zqu.hr_system.project.service.LoginLogService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "登录日志管理")
@RestController
@RequestMapping("/loginlog")
public class LoginLogController extends BaseController {
  @Autowired
  private LoginLogService loginlogService;


  @ApiOperation("创建登录日志")
  @PostMapping
  public String createLoginLog(@RequestBody LoginLog loginlog) {
    return Result(loginlogService.save(loginlog));
  }

  @ApiOperation("删除登录日志")
  @DeleteMapping("/{id}")
  public String deleteLoginLog(@PathVariable Long id) {
    return Result(loginlogService.removeById(id));
  }

  @ApiOperation("通过编号查找登录日志")
  @GetMapping("/{id}")
  public LoginLog findLoginLogById(@PathVariable Long id) {
    return loginlogService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<LoginLog> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<LoginLog> iPage = new Page<>(current, size);
    return loginlogService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<LoginLog> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<LoginLog> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<LoginLog> iPage = new Page<>(current, size);
    return loginlogService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改登录日志")
  @PutMapping
  public String updateLoginLog(@RequestBody LoginLog loginlog) {
    return Result(loginlogService.updateById(loginlog));
  }

}
