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

//  }
//
//  @Override
//  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
//
//    response.setCharacterEncoding("UTF-8");
//
//    ObjectMapper objectMapper = new ObjectMapper();
//
//    String url = request.getRequestURI();
//    String header = request.getHeader(JwtUtil.AUTHORIZATION);
//
//
//    //跳过不需要验证的路径
//    if (Arrays.asList(SecurityConfig.AUTH_WHITELIST_2).contains(url)) {
//      chain.doFilter(request, response);
//      return;
//    }
//
//    for (String path : SecurityConfig.AUTH_WHITELIST) {
//      if (url.indexOf(path) > 0) {
//        chain.doFilter(request, response);
//        return;
//      }
//    }
//
//    if (StringUtils.isBlank(header) || !header.startsWith(JwtUtil.TOKEN_PREFIX)) {
//      response.getWriter().write(objectMapper.writeValueAsString(ResultData.fail(ResultCode.INVALID_TOKEN.getCode(), "token为空")));
//      return;
//    }
//    try {
//      UsernamePasswordAuthenticationToken authentication = getAuthentication(request, response);
//
//      SecurityContextHolder.getContext().setAuthentication(authentication);
//      chain.doFilter(request, response);
//
//    } catch (ExpiredJwtException e) {
//      response.getWriter().write(objectMapper.writeValueAsString(ResultData.fail(ResultCode.INVALID_TOKEN.getCode(), "token已过期")));
//    } catch (UnsupportedJwtException e) {
//      response.getWriter().write(objectMapper.writeValueAsString(ResultData.fail(ResultCode.INVALID_TOKEN.getCode(), "token格式错误")));
//    } catch (MalformedJwtException e) {
//      response.getWriter().write(objectMapper.writeValueAsString(ResultData.fail(ResultCode.INVALID_TOKEN.getCode(), "token没有被正确构造")));
//    } catch (SignatureException e) {
//      response.getWriter().write(objectMapper.writeValueAsString(ResultData.fail(ResultCode.INVALID_TOKEN.getCode(), "token签名失败")));
//
//    } catch (IllegalArgumentException e) {
//      response.getWriter().write(objectMapper.writeValueAsString(ResultData.fail(ResultCode.INVALID_TOKEN.getCode(), "token非法参数异常")));
//
//    } catch (Exception e) {
//      response.getWriter().write(objectMapper.writeValueAsString(ResultData.fail(ResultCode.INVALID_TOKEN.getCode(), "token无效")));
//    }
//  }
//
//  private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request, HttpServletResponse response) {
//    String token = request.getHeader(JwtUtil.AUTHORIZATION);
//    if (token != null) {
//      String userName = "";
//
//      try {
//        // 解密Token
//        userName = jwtUtil.validateToken(token);
//        if (StringUtils.isNotBlank(userName)) {
//          return new UsernamePasswordAuthenticationToken(userName, null, new ArrayList<>());
//        }
//      } catch (ExpiredJwtException e) {
//        throw e;
//        //throw new TokenException("Token已过期");
//      } catch (UnsupportedJwtException e) {
//        throw e;
//        //throw new TokenException("Token格式错误");
//      } catch (MalformedJwtException e) {
//        throw e;
//        //throw new TokenException("Token没有被正确构造");
//      } catch (SignatureException e) {
//        throw e;
//        //throw new TokenException("签名失败");
//      } catch (IllegalArgumentException e) {
//        throw e;
//        //throw new TokenException("非法参数异常");
//      } catch (Exception e) {
//        throw e;
//        //throw new IllegalStateException("Invalid Token. "+e.getMessage());
//      }
//      return null;
//    }
//    return null;
//  }
//
//}
