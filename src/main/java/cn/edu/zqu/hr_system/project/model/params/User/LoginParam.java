package cn.edu.zqu.hr_system.project.model.params.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginParam {
  @NotBlank(message = "账号不能为空")
  @Size(max = 64, message = "账号的字符长度不能超过 {max}")
  public String username;

  @NotBlank(message = "密码不能为空")
  @Size(max = 64, message = "密码字符长度不能超过 {max}")
  public String password;
}
