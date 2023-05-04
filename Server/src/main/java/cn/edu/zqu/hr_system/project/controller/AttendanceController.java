package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Attendance;
import cn.edu.zqu.hr_system.project.service.AttendanceService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(tags = "考勤登记管理")
@RestController
@RequestMapping("/attendance")
public class AttendanceController extends BaseController {
  @Autowired
  private AttendanceService attendanceService;


  @ApiOperation("创建考勤登记")
  @PostMapping
  public String createAttendance(@RequestBody Attendance attendance) {
    return Result(attendanceService.save(attendance));
  }

  @ApiOperation("删除考勤登记")
  @DeleteMapping("/{id}")
  public String deleteAttendance(@PathVariable Long id) {
    return Result(attendanceService.removeById(id));
  }

  @ApiOperation("通过编号查找考勤登记")
  @GetMapping("/{id}")
  public Attendance findAttendanceById(@PathVariable Long id) {
    return attendanceService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Attendance> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Attendance> iPage = new Page<>(current, size);
    return attendanceService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/time")
  public Page<Attendance> selectPageByTime(@RequestParam int current, @RequestParam int size, @RequestParam int year, @RequestParam int month) {
    QueryWrapper<Attendance> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("year", year).eq("month", month);
    Page<Attendance> iPage = new Page<>(current, size);
    return attendanceService.page(iPage, queryWrapper);
  }

  @ApiOperation("返回含有的年月份列表")
  @GetMapping("/time")
  public List<Attendance> selectPageByTime() {
    QueryWrapper<Attendance> queryWrapper = new QueryWrapper<>();
    queryWrapper.select("distinct year,month");
    return attendanceService.list(queryWrapper);
  }

  @ApiOperation("更改考勤登记")
  @PutMapping
  public String updateAttendance(@RequestBody Attendance attendance) {
    return Result(attendanceService.updateById(attendance));
  }

}
