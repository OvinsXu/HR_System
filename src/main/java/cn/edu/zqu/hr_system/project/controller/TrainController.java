package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Train;
import cn.edu.zqu.hr_system.project.service.TrainService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "培训计划管理")
@RestController
@RequestMapping("/train")
public class TrainController extends BaseController {
  @Autowired
  private TrainService trainService;


  @ApiOperation("创建培训计划")
  @PostMapping
  public String createTrain(@RequestBody Train train) {
    return Result(trainService.save(train));
  }

  @ApiOperation("删除培训计划")
  @DeleteMapping("/{id}")
  public String deleteTrain(@PathVariable Long id) {
    return Result(trainService.removeById(id));
  }

  @ApiOperation("通过编号查找培训计划")
  @GetMapping("/{id}")
  public Train findTrainById(@PathVariable Long id) {
    return trainService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Train> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Train> iPage = new Page<>(current, size);
    return trainService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<Train> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Train> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<Train> iPage = new Page<>(current, size);
    return trainService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改培训计划")
  @PutMapping
  public String updateTrain(@RequestBody Train train) {
    return Result(trainService.updateById(train));
  }

}
