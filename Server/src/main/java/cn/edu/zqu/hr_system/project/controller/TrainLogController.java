package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.TrainLog;
import cn.edu.zqu.hr_system.project.service.TrainLogService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "培训记录管理")
@RestController
@RequestMapping("/trainlog")
public class TrainLogController extends BaseController {
  @Autowired
  private TrainLogService trainlogService;


  @ApiOperation("创建培训记录")
  @PostMapping
  public String createTrainLog(@RequestBody TrainLog trainlog) {
    return Result(trainlogService.save(trainlog));
  }

  @ApiOperation("删除培训记录")
  @DeleteMapping("/{id}")
  public String deleteTrainLog(@PathVariable Long id) {
    return Result(trainlogService.removeById(id));
  }

  @ApiOperation("通过编号查找培训记录")
  @GetMapping("/{id}")
  public TrainLog findTrainLogById(@PathVariable Long id) {
    return trainlogService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<TrainLog> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<TrainLog> iPage = new Page<>(current, size);
    return trainlogService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<TrainLog> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<TrainLog> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<TrainLog> iPage = new Page<>(current, size);
    return trainlogService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改培训记录")
  @PutMapping
  public String updateTrainLog(@RequestBody TrainLog trainlog) {
    return Result(trainlogService.updateById(trainlog));
  }

}
