package cn.edu.zqu.hr_system.project.controller;

import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.support.ExcelTypeEnum;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Agreement;
import cn.edu.zqu.hr_system.project.model.entities.Attendance;
import cn.edu.zqu.hr_system.project.model.entities.Bonus;
import cn.edu.zqu.hr_system.project.model.entities.Clocks;
import cn.edu.zqu.hr_system.project.model.entities.User;
import cn.edu.zqu.hr_system.project.model.entities.Wage;
import cn.edu.zqu.hr_system.project.service.AgreementService;
import cn.edu.zqu.hr_system.project.service.AttendanceService;
import cn.edu.zqu.hr_system.project.service.BonusService;
import cn.edu.zqu.hr_system.project.service.BonusTypeService;
import cn.edu.zqu.hr_system.project.service.ClocksService;
import cn.edu.zqu.hr_system.project.service.UserService;
import cn.edu.zqu.hr_system.project.service.WageService;
import cn.edu.zqu.hr_system.project.utils.TaxCalUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/**
 * 工资表根据规则生成,不需要普通的增删改接口
 */

@Api(tags = "工资管理")
@RestController
@RequestMapping("/wage")
public class WageController extends BaseController {
  @Autowired
  private WageService wageService;
  @Autowired
  private ClocksService clocksService;
  @Autowired
  private AttendanceService attendanceService;
  @Autowired
  private AgreementService agreementService;
  @Autowired
  private BonusService bonusService;
  @Autowired
  private BonusTypeService bonusTypeService;
  @Autowired
  private UserService userService;

  @ApiOperation("生成工资表")
  @GetMapping // 前端传 --> 年月,该月应上班天数
  public String generateWage(@RequestParam int year, @RequestParam int month, @RequestParam int days) {
    // 从合同表获取有效列表
    List<Agreement> agreementsList = agreementService.list((new QueryWrapper<Agreement>()).eq("status", 'Y'));
    // 生成每一个员工的工资
    for (Agreement agreement : agreementsList) {
      Long uid = agreement.getId();
      // 查打卡表 --> 打卡天数 = 正常打卡 + 补卡天数
      QueryWrapper<Clocks> clocksWrapper = new QueryWrapper<>();
      clocksWrapper.eq("uid", uid);
      clocksWrapper.eq("Year(clockin)", year).eq("Month(clockin)", month);// 有上班打卡
      clocksWrapper.eq("Year(clockout)", year).eq("Month(clockout)", month);// 有下班打卡
      long clockDays = clocksService.count(clocksWrapper); // 正常打卡天数
      long punchDays = clocksService.count((new QueryWrapper<Clocks>()).eq("status", 'P'));// 补卡天数
      long workDays = clockDays + punchDays;
      // 查考勤表 --> 带薪天数
      QueryWrapper<Attendance> attendanceWrapper = new QueryWrapper<>();
      attendanceWrapper.eq("uid", uid).eq("year", year).eq("month", month);
      Attendance attendance = attendanceService.getOne(attendanceWrapper);
      int holidays = attendance == null ? 0 : attendance.getHoliday();
      // 工资天数 = 打卡天数 + 带薪天数
      long wageDays = workDays + holidays;
      // 基本工资 = 合同工资*( 工资天数 / 应上班天数 ) - 合同社保
      double agreementWage = agreement.getWage() * ((double) wageDays / (double) days);
      // 当月薪水不够交社保时,公司补上
      double baseWage = agreementWage - Math.min(agreementWage, agreement.getInsurance());
      // 查奖金表 --> 奖金
      QueryWrapper<Bonus> bonusWrapper = new QueryWrapper<>();
      bonusWrapper.eq("uid", uid).eq("year", year).eq("month", month);
      double bonus = 0;
      String bonusDetails = "";
      for (Bonus bonusItem : bonusService.list(bonusWrapper)) {
        bonus += bonusItem.getSum();

        bonusDetails += bonusTypeService.getById(bonusItem.getBtid()).getName() + "+" + bonusItem.getSum() + ";";
      }
      // 税前工资 = 基本工资 + 奖金
      double wage = baseWage + bonus;
      // 算税后工资
      double taxWage = wage - TaxCalUtil.calculateTax(wage);
      // 记录到工资表
      User user = userService.getById(uid);
      QueryWrapper<Wage> wageWrapper = new QueryWrapper<>();
      wageWrapper.eq("id_card", user.getIdCard());
      wageWrapper.eq("year", year).eq("month", month);

      Wage wageItem = wageService.getOne(wageWrapper);
      if (wageItem == null) {
        wageItem = new Wage();
      }
      wageItem.setTruename(user.getTruename());
      wageItem.setIdCard(user.getIdCard());
      wageItem.setBase(baseWage);
      wageItem.setBonus(bonus);
      wageItem.setPreTax(wage);
      wageItem.setPostTax(taxWage);
      wageItem.setBonusDetail(bonusDetails);
      wageItem.setDays((int) wageDays);
      wageItem.setYear(year);
      wageItem.setMonth(month);
      wageService.saveOrUpdate(wageItem);
    }

    return "已经重新生成工资表!";
  }

  @ApiOperation("通过编号查找工资")
  @GetMapping("/{id}")
  public Wage findWageById(@PathVariable Long id) {
    return wageService.getById(id);
  }

  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Wage> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Wage> iPage = new Page<>(current, size);
    return wageService.page(iPage);
  }

  @ApiOperation("分页查询")
  @GetMapping("/page/time")
  public Page<Wage> selectPageByTime(@RequestParam int current, @RequestParam int size, @RequestParam int year,
      @RequestParam int month) {
    QueryWrapper<Wage> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("year", year).eq("month", month);
    Page<Wage> iPage = new Page<>(current, size);
    return wageService.page(iPage, queryWrapper);
  }

  @ApiOperation("返回含有的年月份列表")
  @GetMapping("/time")
  public List<Wage> selectPageByTime() {
    QueryWrapper<Wage> queryWrapper = new QueryWrapper<>();
    queryWrapper.select("distinct year,month");
    return wageService.list(queryWrapper);
  }

  @ApiOperation("导出该月份excel表")
  @GetMapping("export")
  public void export(@RequestParam int year,
      @RequestParam int month, HttpServletResponse response) {
    try {
      response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      response.setCharacterEncoding("utf-8");
      String fileName = URLEncoder.encode(year + "-" + month + ".xlsx", "UTF-8");
      response.setHeader("Content-disposition", "attachment;filename*=utf-8''"
          + fileName + ".xlsx");
      QueryWrapper<Wage> wageWrapper = new QueryWrapper<>();
      wageWrapper.eq("year", year).eq("month", month);
      List<Wage> wageList = wageService.list(wageWrapper);
      EasyExcel.write(response.getOutputStream(), Wage.class)
          .excelType(ExcelTypeEnum.XLSX).sheet("sheet").doWrite(wageList);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
