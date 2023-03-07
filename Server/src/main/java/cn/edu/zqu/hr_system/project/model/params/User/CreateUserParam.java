package cn.edu.zqu.hr_system.project.model.params.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CreateUserParam {
  @NotBlank(message = "姓名不能为空")
  @Size(max = 32, message = "姓名的字符长度不能超过 {max}")
  public String username;

  @Min(value = 18, message = "必须大于等于18")
  public int age;

  @Email(message = "邮箱格式错误")
  @Size(max = 64, message = "邮箱的字符长度不能超过 {max}")
  public String email;

  @NotBlank(message = "密码不能为空")
  @Size(max = 64, message = "用户密码字符长度不能超过 {max}")
  public String password;

  @NotBlank(message = "重复输入用户密码不能为空")
  @Size(max = 64, message = "重复输入用户密码字符长度不能超过 {max}")
  public String repassword;
}
