package cn.edu.zqu.hr_system.common.filter;

import cn.edu.zqu.hr_system.project.utils.JwtTokenUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 验证token的过滤器.
 */
@Slf4j
@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

  @Resource
  private UserDetailsService userDetailsService;
  @Resource
  private JwtTokenUtil jwtTokenUtil;
  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain chain) throws ServletException, IOException {


    // 从这里开始获取 request 中的 jwt token
    String authHeader = request.getHeader(JwtTokenUtil.HEADER_STRING);
    //System.out.println("从请求接收的头部字段:" + authHeader);
    // 验证token是否存在

    if (StringUtils.isNotEmpty(authHeader)) {
      final String authToken = authHeader.substring(JwtTokenUtil.TOKEN_PREFIX.length());
      //System.out.println("截取的token:" + authToken);
      // 根据token 获取用户名
      String username = jwtTokenUtil.getUsernameFromToken(authToken);
      //System.out.println("从token获取用户名:" + username);
      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        // 通过用户名 获取用户的信息
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

        // 验证JWT是否过期
        if (jwtTokenUtil.validateToken(authToken, userDetails)) {
          //加载用户、角色、权限信息，Spring Security根据这些信息判断接口的访问权限
          UsernamePasswordAuthenticationToken authentication
                  = new UsernamePasswordAuthenticationToken(userDetails, null,
                  userDetails.getAuthorities());
          authentication.setDetails(new WebAuthenticationDetailsSource()
                  .buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authentication);


        }

      }
    }
    chain.doFilter(request, response);
  }
}

