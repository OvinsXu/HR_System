package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Recruit;
import cn.edu.zqu.hr_system.project.service.RecruitService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(tags = "招聘信息管理")
@RestController
@RequestMapping("/recruit")
public class RecruitController extends BaseController {
  @Autowired
  private RecruitService recruitService;


  @ApiOperation("创建招聘信息")
  @PostMapping
  public String createRecruit(@RequestBody Recruit recruit) {
    return Result(recruitService.save(recruit));
  }

  @ApiOperation("删除招聘信息")
  @DeleteMapping("/{id}")
  public String deleteRecruit(@PathVariable Long id) {
    return Result(recruitService.removeById(id));
  }

  @ApiOperation("通过编号查找招聘信息")
  @GetMapping("/{id}")
  public Recruit findRecruitById(@PathVariable Long id) {
    return recruitService.getById(id);
  }

  @ApiOperation("所有招聘信息")
  @GetMapping("/")
  public List<Recruit> selectAll() {
    return recruitService.list();
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Recruit> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Recruit> iPage = new Page<>(current, size);
    return recruitService.page(iPage);
  }

  @ApiOperation("招聘中分页")
  @GetMapping("/page/status")
  public Page<Recruit> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Recruit> queryWrapper = new QueryWrapper<>();
    queryWrapper.gt("num", 1);
    Page<Recruit> iPage = new Page<>(current, size);
    return recruitService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改招聘信息")
  @PutMapping
  public String updateRecruit(@RequestBody Recruit recruit) {
    return Result(recruitService.updateById(recruit));
  }

}
