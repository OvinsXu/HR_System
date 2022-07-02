package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.TrainUser;
import cn.edu.zqu.hr_system.project.service.TrainUserService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "培训用户管理")
@RestController
@RequestMapping("/trainuser")
public class TrainUserController extends BaseController {
  @Autowired
  private TrainUserService trainuserService;


  @ApiOperation("创建培训用户")
  @PostMapping
  public String createTrainUser(@RequestBody TrainUser trainuser) {
    return Result(trainuserService.save(trainuser));
  }

  @ApiOperation("删除培训用户")
  @DeleteMapping("/{id}")
  public String deleteTrainUser(@PathVariable Long id) {
    return Result(trainuserService.removeById(id));
  }

  @ApiOperation("通过编号查找培训用户")
  @GetMapping("/{id}")
  public TrainUser findTrainUserById(@PathVariable Long id) {
    return trainuserService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<TrainUser> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<TrainUser> iPage = new Page<>(current, size);
    return trainuserService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<TrainUser> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<TrainUser> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<TrainUser> iPage = new Page<>(current, size);
    return trainuserService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改培训用户")
  @PutMapping
  public String updateTrainUser(@RequestBody TrainUser trainuser) {
    return Result(trainuserService.updateById(trainuser));
  }

}
