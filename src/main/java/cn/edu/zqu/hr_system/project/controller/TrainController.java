package cn.edu.zqu.hr_system.project.controller;

import cn.edu.zqu.hr_system.project.base.BaseController;
import cn.edu.zqu.hr_system.project.model.entities.TrainEntity;
import cn.edu.zqu.hr_system.project.service.FileService;
import cn.edu.zqu.hr_system.project.service.TrainService;
import cn.edu.zqu.hr_system.project.service.UserService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Api(tags = "培训计划管理")
@RestController
@RequestMapping("/train")
public class TrainController extends BaseController {
  @Autowired
  private TrainService trainService;

  @Autowired
  private UserService userService;

  @Autowired
  private FileService fileService;

  //@PreAuthorize("hasAnyRole('Owner','Head')")
  @PostMapping("/pend")
  public String createPend(@RequestParam MultipartFile file, Authentication authentication) {
    Long uid = userService.findUserByEmail(authentication.getName()).getId();
    return Result(trainService.createTrain(uid, file));
  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
  @DeleteMapping("/pend/{id}")
  public String deletePend(@RequestBody Long id) {
    return Result(trainService.deleteTrain(id));
  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
  @GetMapping("/pend/{id}")
  public TrainEntity getPendById(@RequestParam Long id) {
    return trainService.findTrain(id);
  }

  //@PreAuthorize("hasAnyRole('Owner','Head')")
  @GetMapping("/pend/")
  public List<TrainEntity> getPend() {
    return trainService.findTrain();
  }

  @GetMapping("/download/{id}")
  public void download(@RequestParam long id) {
    fileService.downloadFile(id);
  }


}
