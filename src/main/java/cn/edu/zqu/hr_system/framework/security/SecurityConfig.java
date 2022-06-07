package cn.edu.zqu.hr_system.framework.security;

import cn.edu.zqu.hr_system.common.filter.JWTAuthenticationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.expression.SecurityExpressionOperations;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import org.springframework.security.web.access.expression.WebSecurityExpressionRoot;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
//开启权限控制的注解支持,securedEnabled表示SpringSecurity内部的权限控制注解开关
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired
  private UserDetailsService userDetailService;

  @Autowired(required = false)
  ObjectMapper objectMapper;

  @Autowired(required = false)
  private DataSource dataSource;

  /**
   * 需要放行的URL
   */
  public static final String[] AUTH_WHITELIST = {
          "/swagger**/**",
          "/webjars/**",
          "/v3/**",
          "/doc.html",
          "/login"
          // other public endpoints of your API may be appended to this array
  };
  public static final String[] AUTH_WHITELIST_2 = {
          "/"
  };


  @Bean
  public JdbcTokenRepositoryImpl tokenRepository() {
    JdbcTokenRepositoryImpl tokenRepository = new JdbcTokenRepositoryImpl();
    tokenRepository.setDataSource(dataSource);
    //tokenRepository.setCreateTableOnStartup(true); // 启动创建表，创建成功后注释掉
    return tokenRepository;
  }


  //认证
  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailService);
    //内存数据库
//    auth.inMemoryAuthentication()
//            .withUser("x").roles("admin").password(new BCryptPasswordEncoder().encode("123"))
//            .and()
//            .withUser("w").roles("user").password(new BCryptPasswordEncoder().encode("123"));
  }

  //密码编码：PasswordEncoder
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  //授权
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()//开启登录配置,推荐使用注解
            //可以匿名访问的链接
            .antMatchers(AUTH_WHITELIST).permitAll();
//            .antMatchers("/", "/swagger**/**", "/webjars/**", "/v3/**", "/doc.html").permitAll();  // 所有人可以访问
    //.antMatchers("/user").hasRole("admin")//表示需要具备 admin 这个角色
    //.anyRequest().authenticated();//表示剩余的其他接口，登录之后就能访问
    //.antMatchers("*").permitAll();

//    http.formLogin()//usernameParameter("username").passwordParameter("password")
//            //.loginPage("/login.html")
//            .loginProcessingUrl("/login")
//            .successHandler((req, resp, authentication) -> {
//              Object principal = authentication.getPrincipal();
//              resp.setContentType("application/json;charset=utf-8");
//              PrintWriter out = resp.getWriter();
//              out.write(objectMapper.writeValueAsString(principal));
//              out.flush();
//              out.close();
//            })
//            .failureHandler((req, resp, e) -> {
//              resp.setContentType("application/json;charset=utf-8");
//              PrintWriter out = resp.getWriter();
//              out.write(objectMapper.writeValueAsString(ResultData.fail(403, "账号密码验证失败!")));
//              //out.write(e.getMessage());
//              out.flush();
//              out.close();
//            });
//    http.logout()
//            .logoutSuccessUrl("/login");//可以注销,注销后跳转登录页面
//    http.rememberMe();//记住我

    http.sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);//基于token，所以不需要session


    http.csrf().disable();//默认只允许post请求跨域,这里直接允许全部类型请求
    http.cors().configurationSource(corsConfigurationSource());
    //http.cors().disable();
    // 开启允许iframe 嵌套
    http.headers().frameOptions().disable();
    http.addFilter(new JWTAuthenticationFilter(authenticationManager()));

    http
            .formLogin().disable()
            .httpBasic().disable()
            .logout().disable();

  }


  //允许跨域
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedHeaders(Arrays.asList("*"));//放行全部原始头信息
    corsConfiguration.setAllowedMethods(Arrays.asList("*"));//允许所有请求方法跨域调用
    //corsConfiguration.setAllowedOrigins(Arrays.asList("*")); //允许所有域名进行跨域调用
    corsConfiguration.addAllowedOriginPattern("*");
    corsConfiguration.setAllowCredentials(true);//允许跨越发送cookie
    corsConfiguration.setMaxAge(3600L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //所有的请求都允许跨域
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;


  }

  @Override
  public void configure(WebSecurity webSecurity) {
    //对于在header里面增加token等类似情况，放行所有OPTIONS请求。
    webSecurity.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    /** 去除SpringSecurity中默认的权限ROLE_前缀 */
    webSecurity.expressionHandler(new DefaultWebSecurityExpressionHandler() {
      @Override
      protected SecurityExpressionOperations createSecurityExpressionRoot(Authentication authentication, FilterInvocation fi) {
        WebSecurityExpressionRoot root = (WebSecurityExpressionRoot) super.createSecurityExpressionRoot(authentication, fi);
        // 去除默认的ROLE_前缀
        root.setDefaultRolePrefix("");
        return root;
      }
    });
  }


}
