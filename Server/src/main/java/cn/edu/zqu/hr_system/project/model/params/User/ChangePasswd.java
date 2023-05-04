package cn.edu.zqu.hr_system.project.model.params.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ChangePasswd {
    @NotBlank(message = "旧密码不能为空")
    @Size(max = 64, message = "密码的字符长度不能超过 {max}")
    public String oldPwd;
  
    @NotBlank(message = "新密码不能为空")
    @Size(max = 64, message = "密码字符长度不能超过 {max}")
    public String newPwd;
}
