package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Wage;
import cn.edu.zqu.hr_system.project.service.WageService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(tags = "工资管理")
@RestController
@RequestMapping("/wage")
public class WageController extends BaseController {
  @Autowired
  private WageService wageService;


  @ApiOperation("创建工资")
  @PostMapping
  public String createWage(@RequestBody Wage wage) {
    return Result(wageService.save(wage));
  }

  @ApiOperation("删除工资")
  @DeleteMapping("/{id}")
  public String deleteWage(@PathVariable Long id) {
    return Result(wageService.removeById(id));
  }

  @ApiOperation("通过编号查找工资")
  @GetMapping("/{id}")
  public Wage findWageById(@PathVariable Long id) {
    return wageService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Wage> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Wage> iPage = new Page<>(current, size);
    return wageService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/time")
  public Page<Wage> selectPageByTime(@RequestParam int current, @RequestParam int size, @RequestParam int year, @RequestParam int month) {
    QueryWrapper<Wage> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("year", year).eq("month", month);
    Page<Wage> iPage = new Page<>(current, size);
    return wageService.page(iPage, queryWrapper);
  }

  @ApiOperation("返回含有的年月份列表")
  @GetMapping("/time")
  public List<Wage> selectPageByTime() {
    QueryWrapper<Wage> queryWrapper = new QueryWrapper<>();
    queryWrapper.select("distinct year,month");
    return wageService.list(queryWrapper);
    //Page<Wage> iPage = new Page<>(current, size);
    //return wageService.page(iPage, queryWrapper);
  }

  @ApiOperation("更改工资")
  @PutMapping
  public String updateWage(@RequestBody Wage wage) {
    return Result(wageService.updateById(wage));
  }

}
