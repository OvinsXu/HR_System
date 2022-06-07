package cn.edu.zqu.hr_system.project.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CryptoUtil {
  //加密
  public static String EnCrypt(String str) {
    return new BCryptPasswordEncoder().encode(str);
  }

  //解密
  public static String DeCrypt(String str) {
    return "";
  }
}
