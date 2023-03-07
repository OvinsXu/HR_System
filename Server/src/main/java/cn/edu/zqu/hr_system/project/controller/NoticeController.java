package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Notice;
import cn.edu.zqu.hr_system.project.service.NoticeService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Api(tags = "公告管理")
@RestController
@RequestMapping("/notice")
public class NoticeController extends BaseController {
  @Autowired
  private NoticeService noticeService;


  @ApiOperation("创建公告")
  @PostMapping
  public String createNotice(@RequestBody Notice notice) {
    return Result(noticeService.save(notice));
  }

  @ApiOperation("删除公告")
  @DeleteMapping("/{id}")
  public String deleteNotice(@PathVariable Long id) {
    return Result(noticeService.removeById(id));
  }

  @ApiOperation("通过编号查找公告")
  @GetMapping("/{id}")
  public Notice findNoticeById(@PathVariable Long id) {
    return noticeService.getById(id);
  }


  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Notice> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Notice> iPage = new Page<>(current, size);
    return noticeService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<Notice> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Notice> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<Notice> iPage = new Page<>(current, size);
    return noticeService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改公告")
  @PutMapping
  public String updateNotice(@RequestBody Notice notice) {
    return Result(noticeService.updateById(notice));
  }

}
