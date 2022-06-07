package cn.edu.zqu.hr_system.common.response;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@RestControllerAdvice
@ControllerAdvice(basePackages = "cn.edu.zqu.hr_system")
public class ResponseAdvice implements ResponseBodyAdvice<Object> {
  @Autowired(required = false)
  private ObjectMapper objectMapper;

  @Override
  public boolean supports(MethodParameter methodParameter, Class aClass) {
    return true;
  }

  @SneakyThrows
  @Override
  public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
    if (o instanceof String) {//返回字符串,需要进行包装
      return objectMapper.writeValueAsString(ResultData.success(o));

    }
    if (o instanceof ResultData) {
      return o;
    }
    return ResultData.success(o);
  }
}