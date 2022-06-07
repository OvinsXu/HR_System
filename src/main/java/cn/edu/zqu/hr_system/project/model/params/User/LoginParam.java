package cn.edu.zqu.hr_system.project.model.params.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class LoginParam {
  @Email(message = "邮箱格式错误")
  @Size(max = 64, message = "邮箱的字符长度不能超过 {max}")
  public String email;

  @NotBlank(message = "密码不能为空")
  @Size(max = 64, message = "用户密码字符长度不能超过 {max}")
  public String password;
}
