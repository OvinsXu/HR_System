package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Agreement;
import cn.edu.zqu.hr_system.project.service.AgreementService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(tags = "合同登记管理")
@RestController
@RequestMapping("/agreement")
public class AgreementController extends BaseController {
  @Autowired
  private AgreementService agreementService;


  @ApiOperation("创建合同登记")
  @PostMapping
  public String createAgreement(@RequestBody Agreement agreement) {
    return Result(agreementService.save(agreement));
  }

  @ApiOperation("删除合同登记")
  @DeleteMapping("/{id}")
  public String deleteAgreement(@PathVariable Long id) {
    return Result(agreementService.removeById(id));
  }

  @ApiOperation("通过编号查找合同登记")
  @GetMapping("/{id}")
  public Agreement findAgreementById(@PathVariable Long id) {
    return agreementService.getById(id);
  }

  @ApiOperation("所有用户")
  @GetMapping("/")
  public List<Agreement> selectAll() {
    return agreementService.list();
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Agreement> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Agreement> iPage = new Page<>(current, size);
    return agreementService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<Agreement> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Agreement> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<Agreement> iPage = new Page<>(current, size);
    return agreementService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改合同登记")
  @PutMapping
  public String updateAgreement(@RequestBody Agreement agreement) {
    return Result(agreementService.updateById(agreement));
  }

}
