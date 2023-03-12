package cn.edu.zqu.hr_system.framework.security;

import cn.edu.zqu.hr_system.common.filter.JwtAuthenticationTokenFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.annotation.Resource;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
//开启权限控制的注解支持,securedEnabled表示SpringSecurity内部的权限控制注解开关
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired
  private UserDetailsService userDetailService;
  @Autowired(required = false)
  ObjectMapper objectMapper;

  @Resource
  private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

  @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  //认证
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailService);
  }

  //密码编码：PasswordEncoder
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  public static final String[] AUTH_WHITELIST = {
          "/swagger**/**", "/webjars/**", "/v3/**", "/doc.html", "/", "/user/login*","/static/*/*","/logo.png","/manifest.json",
  };

  //授权
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()//开启登录配置,推荐使用注解
            .antMatchers(AUTH_WHITELIST).permitAll()//可以匿名访问的链接
            .anyRequest().authenticated();//表示剩余的其他接口，登录之后就能访问
    http.sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);//基于token，所以不需要session

    http.csrf().disable();//默认只允许post请求跨域,这里直接允许全部类型请求
    http.cors().configurationSource(corsConfigurationSource());

    // 开启允许iframe 嵌套
    http.headers().frameOptions().disable();
    http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

    http
            .formLogin().disable()
            .httpBasic().disable()
            .logout().disable();
  }


  //允许跨域
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedHeaders(List.of("*"));//放行全部原始头信息
    corsConfiguration.setAllowedMethods(List.of("*"));//允许所有请求方法跨域调用
    //corsConfiguration.setAllowedOrigins(Arrays.asList("*")); //允许所有域名进行跨域调用
    corsConfiguration.addAllowedOriginPattern("*");
    corsConfiguration.setAllowCredentials(true);//允许跨越发送cookie
    corsConfiguration.setMaxAge(3600L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //所有的请求都允许跨域
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
  }
}
