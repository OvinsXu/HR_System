package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.Post;
import cn.edu.zqu.hr_system.project.service.PostService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Api(tags = "岗位管理")
@RestController
@RequestMapping("/post")
public class PostController extends BaseController {
  @Autowired
  private PostService postService;


  @ApiOperation("创建岗位")
  @PostMapping
  public String createPost(@RequestBody Post post) {
    return Result(postService.save(post));
  }

  @ApiOperation("删除岗位")
  @DeleteMapping("/{pid}")
  public String deletePost(@PathVariable Long pid) {
    return Result(postService.removeById(pid));
  }

  @ApiOperation("通过编号查找岗位")
  @GetMapping("/{pid}")
  public Post findPostById(@PathVariable long pid) {
    return postService.getById(pid);
  }

  @ApiOperation("岗位列表")
  @PostMapping("/list/{pids}")
  public List<Post> selectList(@RequestBody List<Long> pids) {
    return postService.listByIds(pids);
  }

  @ApiOperation("通过名称查找岗位")
  @GetMapping("/name/{name}")
  public Post findPostByName(@PathVariable String name) {
    return postService.getByName(name);
  }


  @ApiOperation("所有岗位")
  @GetMapping("/")
  public List<Post> selectAll() {
    return postService.list();
  }
  @ApiOperation("无条件分页查询")
  @GetMapping("/page")
  public Page<Post> selectPage(@RequestParam int current, @RequestParam int size) {

    Page<Post> iPage = new Page<>(current, size);
    return postService.page(iPage);
  }

  @ApiOperation("根据状态分页查询")
  @GetMapping("/page/status")
  public Page<Post> selectPageByStatus(@RequestParam int current, @RequestParam int size, @RequestParam char status) {
    QueryWrapper<Post> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("status", status);
    Page<Post> iPage = new Page<>(current, size);
    return postService.page(iPage, queryWrapper);
  }


  @ApiOperation("更改岗位")
  @PutMapping
  public String updatePost(@RequestBody Post post) {
    return Result(postService.updateById(post));
  }

}
