package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Skill;
import cn.edu.zqu.hr_system.project.service.SkillService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "技能证书考核管理")
@RestController
@RequestMapping("/skill")
public class SkillController extends BaseController {
  @Autowired
  private SkillService skillService;


  @ApiOperation("创建技能证书考核")
  @PostMapping
  public String createSkill(@RequestBody Skill skill) {
    return Result(skillService.save(skill));
  }

  @ApiOperation("删除技能证书考核")
  @DeleteMapping("/{id}")
  public String deleteSkill(@PathVariable Long id) {
    return Result(skillService.removeById(id));
  }

  @ApiOperation("通过编号查找技能证书考核")
  @GetMapping("/{id}")
  public Skill findSkillById(@PathVariable Long id) {
    return skillService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Skill> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Skill> iPage = new Page<>(current, size);
    return skillService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<Skill> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Skill> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<Skill> iPage = new Page<>(current, size);
    return skillService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改技能证书考核")
  @PutMapping
  public String updateSkill(@RequestBody Skill skill) {
    return Result(skillService.updateById(skill));
  }

}
