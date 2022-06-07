package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.RoleEntity;
import cn.edu.zqu.hr_system.project.service.RoleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "岗位管理")
@RestController
@RequestMapping("/role")
public class RoleController extends BaseController {
  @Autowired
  private RoleService roleService;


  @ApiOperation("创建用户")
  @PostMapping
  public String createRole(@RequestBody RoleEntity role) {
    return Result(roleService.createRole(role));
  }

  @ApiOperation("删除岗位")
  @DeleteMapping("/{id}")
  public String deleteRole(@PathVariable Long rid) {
    return Result(roleService.deleteRole(rid));
  }

  @ApiOperation("通过编号查找岗位")
  @GetMapping("/{id}")
  public RoleEntity findRoleById(@PathVariable Long rid) {
    return roleService.findRoleById(rid);
  }

  @ApiOperation("通过名称查找岗位")
  @GetMapping("/{name}")
  public RoleEntity findRoleByName(@PathVariable String name) {
    return roleService.findRoleByName(name);
  }

  @ApiOperation("查找招聘岗位")
  @GetMapping("/{recruit}")
  public List<RoleEntity> findRoleByRecruit(@PathVariable String recruit) {
    return roleService.findRoleByRecruit(recruit);
  }


  @ApiOperation("更改岗位")
  @PutMapping
  public String updateRole(@RequestBody RoleEntity role) {
    return Result(roleService.update(role));
  }

}
