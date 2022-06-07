package cn.edu.zqu.hr_system.project.base;

public class BaseController {
  public String Result(int rows) {
    return rows > 0 ? "操作成功" : "操作失败";
  }
}
