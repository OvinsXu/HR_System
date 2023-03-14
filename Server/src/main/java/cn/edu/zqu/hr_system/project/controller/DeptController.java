package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Department;
import cn.edu.zqu.hr_system.project.service.Impl.DepartmentServiceImpl;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "部门管理")
@RestController
@RequestMapping("/dept")
public class DeptController extends BaseController {
  @Autowired
  private DepartmentServiceImpl departmentService;


  //  @PreAuthorize("hasAnyRole('Owner')")
  @ApiOperation("创建部门")
  @PostMapping("/")
  public String createDepartment(@RequestBody Department dept) {

    return Result(departmentService.save(dept));
  }

  @ApiOperation("删除部门")
  @DeleteMapping("/{uid}")
  public String eraseDepartment(@PathVariable Long uid) {
    return Result(departmentService.removeById(uid));
  }


  @ApiOperation("删除部门列表")
  @PostMapping("/list")
  public String eraseDepartments(@RequestBody List<Long> uids) {
    return Result(departmentService.removeBatchByIds(uids));
  }


  //@PreAuthorize("hasAnyRole('Owner')")
  @ApiOperation("部门查找")
  @GetMapping("/{uid}")
  public Department selectOne(@PathVariable Long uid) {
    return departmentService.getById(uid);
  }


  //@PreAuthorize("hasAnyRole('Owner')")
  @ApiOperation("部门列表")
  @GetMapping("/{uids}")
  public List<Department> selectList(@RequestParam List<Long> uids) {
    return departmentService.listByIds(uids);
  }

  //@PreAuthorize("hasAnyRole('Owner')")
  @ApiOperation("所有部门")
  @GetMapping("/")
  public List<Department> selectAll() {
    return departmentService.list();
  }

  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Department> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Department> iPage = new Page<>(current, size);
    return departmentService.page(iPage);
  }

  @ApiOperation("更改部门")
  @PutMapping("/")
  public String update(@RequestBody Department dept) {
    System.out.println(dept);
    return Result(departmentService.updateById(dept));
  }


}
