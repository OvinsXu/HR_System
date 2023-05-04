package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Bonus;
import cn.edu.zqu.hr_system.project.service.BonusService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "奖金管理")
@RestController
@RequestMapping("/bonus")
public class BonusController extends BaseController {
  @Autowired
  private BonusService bonusService;


  @ApiOperation("创建奖金")
  @PostMapping
  public String createBonus(@RequestBody Bonus bonus) {
    return Result(bonusService.save(bonus));
  }

  @ApiOperation("删除奖金")
  @DeleteMapping("/{id}")
  public String deleteBonus(@PathVariable Long id) {
    return Result(bonusService.removeById(id));
  }

  @ApiOperation("通过编号查找奖金")
  @GetMapping("/{id}")
  public Bonus findBonusById(@PathVariable Long id) {
    return bonusService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Bonus> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Bonus> iPage = new Page<>(current, size);
    return bonusService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<Bonus> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Bonus> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<Bonus> iPage = new Page<>(current, size);
    return bonusService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改奖金")
  @PutMapping
  public String updateBonus(@RequestBody Bonus bonus) {
    return Result(bonusService.updateById(bonus));
  }

}
