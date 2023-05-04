package cn.edu.zqu.hr_system.project.controller;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import cn.edu.zqu.hr_system.common.response.ResultData;
import cn.edu.zqu.hr_system.framework.security.UserInfo;
import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Clocks;
import cn.edu.zqu.hr_system.project.model.enums.ResultCode;
import cn.edu.zqu.hr_system.project.service.ClocksService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

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
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime start = now.withHour(8).withMinute(0).withSecond(0).withNano(0);
    LocalDateTime end = now.withHour(9).withMinute(0).withSecond(0).withNano(0);
    QueryWrapper<Clocks> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("uid", uid);
    queryWrapper.eq("Date(clockin)", now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
    Clocks clocks = clocksService.getOne(queryWrapper);
    if (clocks == null) {// 上班打卡
      if (now.isAfter(start) && now.isBefore(end)) {
        clocks = new Clocks();
        clocks.setUid(uid);
        clocks.setClockin(now);
        return ResultData.success(clocksService.save(clocks));
      } else {
        return ResultData.sendCode(ResultCode.RC203, "不在正常时间范围,打卡失败! 如有特殊情况,请联系人事!");
      }
    } else if (Duration.between(clocks.getClockin(), now).toHours() > 8
        && Duration.between(clocks.getClockin(), now).toHours() < 9) {// 可以正常打卡下班
      clocks.setClockout(now);
      return ResultData.success(clocksService.save(clocks));
    } else {// 打卡失败
      return ResultData.sendCode(ResultCode.RC203, "你已经完成上班打卡!");
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
