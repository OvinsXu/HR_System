package cn.edu.zqu.hr_system.common.handler;

import cn.edu.zqu.hr_system.framework.security.UserInfo;
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.sql.Date;


@Component
public class MybatisPlusHandler implements MetaObjectHandler {


  /**
   * 使用mp做添加操作时候，这个方法执行
   */
  @Override
  public void insertFill(MetaObject metaObject) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (!(authentication instanceof AnonymousAuthenticationToken)) {
      UserInfo user = (UserInfo) authentication.getPrincipal();
      long id = user.getId();

      //设置属性值
      this.setFieldValByName("createBy", id, metaObject);
      this.setFieldValByName("createTime", new Date(System.currentTimeMillis()), metaObject);
      this.setFieldValByName("updateBy", id, metaObject);
      this.setFieldValByName("updateTime", new Date(System.currentTimeMillis()), metaObject);

    }

  }

  /**
   * 使用mp做修改操作时候，这个方法执行
   */
  @Override
  public void updateFill(MetaObject metaObject) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (!(authentication instanceof AnonymousAuthenticationToken)) {
      UserInfo user = (UserInfo) authentication.getPrincipal();
      long id = user.getId();
      this.setFieldValByName("updateBy", id, metaObject);
      this.setFieldValByName("updateTime", new Date(System.currentTimeMillis()), metaObject);
    }
  }
}
