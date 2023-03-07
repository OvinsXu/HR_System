package cn.edu.zqu.hr_system.framework.security;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Setter
@Getter
@ToString
public class UserInfo extends User {


  private long id;
//  private String nickname;
//  private Integer gender;
//  private Integer type;


  public UserInfo(String username, String password, long uid,
                  Collection<? extends GrantedAuthority> authorities) {
    super(username, password, authorities);
    this.id = uid;
  }


  public UserInfo(String username, String password,
                  Collection<? extends GrantedAuthority> authorities) {
    super(username, password, authorities);
  }

  public UserInfo(String username, String password,
                  boolean enabled, boolean accountNonExpired,
                  boolean credentialsNonExpired, boolean accountNonLocked,
                  Collection<? extends GrantedAuthority> authorities) {
    super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
  }

}
