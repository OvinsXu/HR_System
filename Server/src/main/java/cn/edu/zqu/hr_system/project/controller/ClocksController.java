package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.common.response.ResultData;
import cn.edu.zqu.hr_system.framework.security.UserInfo;
import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Clocks;
import cn.edu.zqu.hr_system.project.model.enums.ResultCode;
import cn.edu.zqu.hr_system.project.service.ClocksService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Api(tags = "打卡信息管理")
@RestController
@RequestMapping("/clock")
public class ClocksController extends BaseController {
  @Autowired
  private ClocksService clocksService;

  @ApiOperation("打卡")
  @PostMapping("/ding")
  public ResultData<Object> clock(@AuthenticationPrincipal UserInfo userInfo) {

    Long uid = userInfo.getId();
    LocalDateTime localDateTime = LocalDateTime.now();

    QueryWrapper queryWrapper = new QueryWrapper<Clocks>();
    queryWrapper.eq("uid", uid);
    queryWrapper.eq("Date(clockin)", localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
    Clocks clocks = clocksService.getOne(queryWrapper);

    if (clocks == null) {// 上班打卡
      clocks = new Clocks();
      clocks.setUid(uid);
      clocks.setClockin(localDateTime);
      return ResultData.success(clocksService.save(clocks));
    } else if (Duration.between(clocks.getClockin(), localDateTime).toHours() > 8
        && Duration.between(clocks.getClockin(), localDateTime).toHours() < 9) {// 可以正常打卡下班
      clocks.setClockout(localDateTime);
      return ResultData.success(clocksService.save(clocks));
    } else {// 打卡失败
      return ResultData.sendCode(ResultCode.RC203,"不在正常时间范围,打卡失败! 如有特殊情况,请联系人事!");
    }
  }

  @ApiOperation("创建打卡信息")
  @PostMapping
  public String createClock(@RequestBody Clocks clocks) {
    return Result(clocksService.save(clocks));
  }

  @ApiOperation("通过编号查找打卡信息")
  @GetMapping("/{id}")
  public Clocks findClockById(@PathVariable Long id) {
    return clocksService.getById(id);
  }

  @ApiOperation("所有打卡信息")
  @GetMapping("/")
  public List<Clocks> selectAll() {
    return clocksService.list();
  }

  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Clocks> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Clocks> iPage = new Page<>(current, size);

    return clocksService.page(iPage);
  }

  @ApiOperation("条件分页")
  @GetMapping("/page/status")
  public Page<Clocks> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Clocks> queryWrapper = new QueryWrapper<>();

    if (status == 'Y') {
      queryWrapper.eq("status", 'Y');
    } else if (status == 'E') {
      queryWrapper.ne("status", 'Y');
    }
    Page<Clocks> iPage = new Page<>(current, size);
    return clocksService.page(iPage, queryWrapper);
  }

  @ApiOperation("根据时间状态分页查询")
  @GetMapping("/page/timestatus")
  public Page<Clocks> selectPageByTime(@RequestParam int current, @RequestParam int size,
      @RequestParam char status, @RequestParam int year, @RequestParam int month) {
    QueryWrapper<Clocks> queryWrapper = new QueryWrapper<>();
    if (status == 'Y') {
      queryWrapper.eq("status", 'Y');
    } else if (status == 'E') {
      queryWrapper.ne("status", 'Y');
    }
    queryWrapper.eq("YEAR(clockin)", year).eq("MONTH(clockin)", month);
    Page<Clocks> iPage = new Page<>(current, size);
    return clocksService.page(iPage, queryWrapper);
  }

  @ApiOperation("更改打卡信息")
  @PutMapping
  public String updateClock(@RequestBody Clocks clocks) {
    return Result(clocksService.updateById(clocks));
  }

}
