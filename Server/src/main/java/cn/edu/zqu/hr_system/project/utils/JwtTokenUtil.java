package cn.edu.zqu.hr_system.project.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
@Component
public class JwtTokenUtil implements Serializable {

  public final static String SECRET = "xuweitaoliaoyuanlongwujiaru";

  public final static Long EXPIRATION_TIME = 1000 * 60 * 60 * 24L;

  public final static String HEADER_STRING = "Authorization";

  public final static String TOKEN_PREFIX = "Bearer ";

  /**
   * 从claims生成令牌
   *
   * @param claims 数据声明
   * @return 令牌
   */
  private String generateToken(Map<String, Object> claims) {
    Date expirationDate = new Date(System.currentTimeMillis() + EXPIRATION_TIME);
    return Jwts.builder().setClaims(claims).setExpiration(expirationDate).signWith(SignatureAlgorithm.HS512, SECRET)
        .compact();
  }

  /**
   * 生成token令牌
   *
   * @param userDetails 用户
   * @return 令token牌
   */
  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>(2);
    claims.put("sub", userDetails.getUsername());
    claims.put("created", new Date());
    return TOKEN_PREFIX + generateToken(claims);
  }

  /**
   * 刷新令牌
   *
   * @param token 原令牌
   * @return 新令牌
   */
  public String refreshToken(String token) {
    String refreshedToken;
    try {
      Claims claims = getClaimsFromToken(token);
      claims.put("created", new Date());
      refreshedToken = generateToken(claims);
    } catch (Exception e) {
      refreshedToken = null;
    }
    return refreshedToken;
  }

  /**
   * 判断令牌是否过期
   *
   * @param token 令牌
   * @return 是否过期
   */
  public Boolean isTokenExpired(String token) {
    try {
      Claims claims = getClaimsFromToken(token);
      Date expiration = claims.getExpiration();
      return expiration.before(new Date());
    } catch (Exception e) {
      return false;
    }
  }

  /**
   * 验证令牌
   *
   * @param token       令牌
   * @param userDetails 用户
   * @return 是否有效
   */
  public Boolean validateToken(String token, UserDetails userDetails) {
    String username = getUsernameFromToken(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }

  /**
   * 从令牌中获取数据声明,如果看不懂就看谁调用它
   *
   * @param token 令牌
   * @return 数据声明
   */
  private Claims getClaimsFromToken(String token) {
    Claims claims;
    try {
      claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    } catch (Exception e) {
      claims = null;
    }
    return claims;
  }

  /**
   * 从令牌中获取用户名
   *
   * @param token 令牌
   * @return 用户名
   */
  public String getUsernameFromToken(String token) {

    String username;
    try {
      Claims claims = getClaimsFromToken(token);
      username = claims.getSubject();
    } catch (Exception e) {
      username = null;
    }
    return username;
  }
}
