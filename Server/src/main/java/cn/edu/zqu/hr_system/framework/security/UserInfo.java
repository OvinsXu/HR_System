package cn.edu.zqu.hr_system.framework.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;


public class UserInfo extends User {

    //将需要用的属性记录起来
    private Long id;
    private Collection<? extends GrantedAuthority> role;

    public Object getRole() {
        return this.role;
    }

    public Long getId() {
        return this.id;
    }

    public UserInfo(String username, String password, long uid,
                    Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.id = uid;
        this.role = authorities;
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
