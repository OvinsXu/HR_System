package cn.edu.zqu.hr_system.project.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CryptoUtil {
  //加密
  public static String enCrypt(String str) {
    return new BCryptPasswordEncoder().encode(str);
  }

  //解密
  public static String deCrypt(String str) {
    return "";
  }

  public static boolean matches(String str1, String str2) {
    return new BCryptPasswordEncoder().matches(str1, str2);
  }
}
