package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Transfer;
import cn.edu.zqu.hr_system.project.service.TransferService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "调动申请管理")
@RestController
@RequestMapping("/transfer")
public class TransferController extends BaseController {
  @Autowired
  private TransferService transferService;


  @ApiOperation("创建调动申请")
  @PostMapping
  public String createTransfer(@RequestBody Transfer transfer) {
    return Result(transferService.save(transfer));
  }

  @ApiOperation("删除调动申请")
  @DeleteMapping("/{id}")
  public String deleteTransfer(@PathVariable Long id) {
    return Result(transferService.removeById(id));
  }

  @ApiOperation("通过编号查找调动申请")
  @GetMapping("/{id}")
  public Transfer findTransferById(@PathVariable Long id) {
    return transferService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Transfer> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Transfer> iPage = new Page<>(current, size);
    return transferService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<Transfer> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Transfer> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<Transfer> iPage = new Page<>(current, size);
    return transferService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改调动申请")
  @PutMapping
  public String updateTransfer(@RequestBody Transfer transfer) {
    return Result(transferService.updateById(transfer));
  }

}
