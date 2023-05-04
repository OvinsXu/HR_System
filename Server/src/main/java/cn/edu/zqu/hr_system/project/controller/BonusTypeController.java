package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.BonusType;
import cn.edu.zqu.hr_system.project.service.BonusTypeService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(tags = "奖金类型管理")
@RestController
@RequestMapping("/bonustype")
public class BonusTypeController extends BaseController {
  @Autowired
  private BonusTypeService bonustypeService;


  @ApiOperation("创建奖金类型")
  @PostMapping
  public String createBonusType(@RequestBody BonusType bonustype) {
    return Result(bonustypeService.save(bonustype));
  }

  @ApiOperation("删除奖金类型")
  @DeleteMapping("/{id}")
  public String deleteBonusType(@PathVariable Long id) {
    return Result(bonustypeService.removeById(id));
  }

  @ApiOperation("通过编号查找奖金类型")
  @GetMapping("/{id}")
  public BonusType findBonusTypeById(@PathVariable Long id) {
    return bonustypeService.getById(id);
  }


  @ApiOperation("所有奖金类型")
  @GetMapping("/")
  public List<BonusType> selectAll() {
    return bonustypeService.list();
  }
  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<BonusType> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<BonusType> iPage = new Page<>(current, size);
    return bonustypeService.page(iPage);
  }

  @ApiOperation("奖金类型列表")
  @PostMapping("/list/{btids}")
  public List<BonusType> selectList(@RequestBody List<Long> btids) {
    return bonustypeService.listByIds(btids);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<BonusType> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<BonusType> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<BonusType> iPage = new Page<>(current, size);
    return bonustypeService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改奖金类型")
  @PutMapping
  public String updateBonusType(@RequestBody BonusType bonustype) {
    return Result(bonustypeService.updateById(bonustype));
  }

}
