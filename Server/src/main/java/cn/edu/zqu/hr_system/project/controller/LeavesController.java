package cn.edu.zqu.hr_system.project.controller;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
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

import cn.edu.zqu.hr_system.framework.security.UserInfo;
import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Attendance;
import cn.edu.zqu.hr_system.project.model.entities.Leaves;
import cn.edu.zqu.hr_system.project.model.entities.LeavesType;
import cn.edu.zqu.hr_system.project.service.AttendanceService;
import cn.edu.zqu.hr_system.project.service.LeavesService;
import cn.edu.zqu.hr_system.project.service.LeavesTypeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(tags = "信息管理")
@RestController
@RequestMapping("/leaves")
public class LeavesController extends BaseController {
  @Autowired
  private LeavesService leavesService;
  @Autowired
  private LeavesTypeService leavesTypeService;
  @Autowired
  private AttendanceService attendanceService;

  @ApiOperation("创建信息")
  @PostMapping
  public String createLeaves(@RequestBody Leaves leaves,@AuthenticationPrincipal UserInfo userInfo) {
    leaves.setUid(userInfo.getId());
    return Result(leavesService.save(leaves));
  }

  @ApiOperation("删除信息")
  @DeleteMapping("/{id}")
  public String deleteLeaves(@PathVariable Long id) {
    return Result(leavesService.removeById(id));
  }

  @ApiOperation("通过编号查找信息")
  @GetMapping("/{id}")
  public Leaves findLeavesById(@PathVariable Long id) {
    return leavesService.getById(id);
  }

  @ApiOperation("所有信息")
  @GetMapping("/")
  public List<Leaves> selectAll() {
    return leavesService.list();
  }

  @ApiOperation("所有类型")
  @GetMapping("/type")
  public List<LeavesType> selectAllType() {
    return leavesTypeService.list();
  }

  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Leaves> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Leaves> iPage = new Page<>(current, size);
    return leavesService.page(iPage);
  }

  @ApiOperation("根据时间状态分页查询")
  @GetMapping("/page/timestatus")
  public Page<Leaves> selectPageByTime(@RequestParam int current, @RequestParam int size,
      @RequestParam char status, @RequestParam int year, @RequestParam int month) {
    QueryWrapper<Leaves> queryWrapper = new QueryWrapper<>();
    if (status == 'Y') {
      queryWrapper.eq("status", 'Y').or().eq("status", 'N');
    } else if (status != 'A') {
      queryWrapper.eq("status", status);
    }
    queryWrapper.eq("YEAR(begin_date)", year).eq("MONTH(begin_date)", month);
    Page<Leaves> iPage = new Page<>(current, size);
    return leavesService.page(iPage, queryWrapper);
  }

  @ApiOperation("分页")
  @GetMapping("/page/status")
  public Page<Leaves> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Leaves> queryWrapper = new QueryWrapper<>();
    queryWrapper.gt("num", 1);
    Page<Leaves> iPage = new Page<>(current, size);
    return leavesService.page(iPage, queryWrapper);
  }

  @ApiOperation("更改信息")
  @PutMapping
  public String updateLeaves(@RequestBody Leaves leaves) {
    Leaves oldLeaves = leavesService.getById(leaves.getId());// 状态对比
    LocalDateTime current = leaves.getBeginDate();
    long days = Duration.between(leaves.getBeginDate(), leaves.getEndDate()).toDays()+1;// 假期天数
    for (int i = 0; i < days;) {
      // 查询是否已有记录
      QueryWrapper<Attendance> queryWrapper = new QueryWrapper<>();
      queryWrapper.eq("year", current.getYear());
      queryWrapper.eq("month", current.getMonthValue());
      queryWrapper.eq("uid", leaves.getUid());
      Attendance attendance = attendanceService.getOne(queryWrapper);
      //如果没有记录
      if (attendance == null) {
        attendance = new Attendance();
        attendance.setYear(current.getYear());
        attendance.setMonth(current.getMonthValue());
        attendance.setUid(leaves.getUid());
        attendance.setHoliday(0);
        attendance.setLeaves(0);
      }
      // 到月末天数
      long lastDays = Duration.between(current, current.with(TemporalAdjusters.lastDayOfMonth())).toDays()+1;
      int holiday = 0;
      int leave = 0; 
      // 本月请假天数
      int tdays = days <= lastDays ? (int) days : (int) lastDays;
      // 其他改为带薪假,添加带薪天数
      if (oldLeaves.getStatus() != 'Y' && leaves.getStatus() == 'Y') {
        holiday = attendance.getHoliday() + tdays;
        leave = attendance.getLeaves() + (oldLeaves.getStatus() == 'N' ? 0 : tdays);//原是无薪假,则不用添加请假天数
      } else if (oldLeaves.getStatus() == 'Y' && leaves.getStatus() != 'Y') {
        holiday = attendance.getHoliday() - tdays;
        leave = attendance.getLeaves() - (leaves.getStatus() == 'N' ? 0 : tdays);//改为无薪假,则请假天数不用减
      }
      //如果请假开始结束都在同一个月,会跳出循环
      i += (days <= lastDays ? days : lastDays);
      // 跳转到下个月的第一天
      current = current.plusMonths(1).withDayOfMonth(1);
      attendance.setHoliday(holiday);
      attendance.setLeaves(leave);
      attendanceService.saveOrUpdate(attendance,queryWrapper);
    }
    return Result(leavesService.updateById(leaves));
  }
}
