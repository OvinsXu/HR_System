package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Role;
import cn.edu.zqu.hr_system.project.service.RoleService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "角色管理")
@RestController
@RequestMapping("/role")
public class RoleController extends BaseController {
  @Autowired
  private RoleService roleService;


  @ApiOperation("创建角色")
  @PostMapping
  public String createRole(@RequestBody Role role) {
    return Result(roleService.save(role));
  }

  @ApiOperation("删除角色")
  @DeleteMapping("/{id}")
  public String deleteRole(@PathVariable Long id) {
    return Result(roleService.removeById(id));
  }

  @ApiOperation("通过编号查找角色")
  @GetMapping("/{id}")
  public Role findRoleById(@PathVariable Long id) {
    return roleService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Role> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Role> iPage = new Page<>(current, size);
    return roleService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<Role> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Role> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<Role> iPage = new Page<>(current, size);
    return roleService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改角色")
  @PutMapping
  public String updateRole(@RequestBody Role role) {
    return Result(roleService.updateById(role));
  }

}
