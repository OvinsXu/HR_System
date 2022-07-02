package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.OperateLog;
import cn.edu.zqu.hr_system.project.service.OperateLogService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "奖金管理")
@RestController
@RequestMapping("/operatelog")
public class OperateLogController extends BaseController {
  @Autowired
  private OperateLogService operatelogService;


  @ApiOperation("创建奖金")
  @PostMapping
  public String createOperateLog(@RequestBody OperateLog operatelog) {
    return Result(operatelogService.save(operatelog));
  }

  @ApiOperation("删除奖金")
  @DeleteMapping("/{id}")
  public String deleteOperateLog(@PathVariable Long id) {
    return Result(operatelogService.removeById(id));
  }

  @ApiOperation("通过编号查找奖金")
  @GetMapping("/{id}")
  public OperateLog findOperateLogById(@PathVariable Long id) {
    return operatelogService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<OperateLog> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<OperateLog> iPage = new Page<>(current, size);
    return operatelogService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<OperateLog> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<OperateLog> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<OperateLog> iPage = new Page<>(current, size);
    return operatelogService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改奖金")
  @PutMapping
  public String updateOperateLog(@RequestBody OperateLog operatelog) {
    return Result(operatelogService.updateById(operatelog));
  }

}
