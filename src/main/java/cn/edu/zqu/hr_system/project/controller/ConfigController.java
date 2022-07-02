package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Config;
import cn.edu.zqu.hr_system.project.service.ConfigService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "系统配置管理")
@RestController
@RequestMapping("/config")
public class ConfigController extends BaseController {
  @Autowired
  private ConfigService configService;


  @ApiOperation("创建系统配置")
  @PostMapping
  public String createConfig(@RequestBody Config config) {
    return Result(configService.save(config));
  }

  @ApiOperation("删除系统配置")
  @DeleteMapping("/{id}")
  public String deleteConfig(@PathVariable Long id) {
    return Result(configService.removeById(id));
  }

  @ApiOperation("通过编号查找系统配置")
  @GetMapping("/{id}")
  public Config findConfigById(@PathVariable Long id) {
    return configService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Config> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Config> iPage = new Page<>(current, size);
    return configService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<Config> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Config> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<Config> iPage = new Page<>(current, size);
    return configService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改系统配置")
  @PutMapping
  public String updateConfig(@RequestBody Config config) {
    return Result(configService.updateById(config));
  }

}
