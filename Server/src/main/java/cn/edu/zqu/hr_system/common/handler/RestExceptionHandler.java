package cn.edu.zqu.hr_system.common.handler;

import cn.edu.zqu.hr_system.common.response.ResultData;
import cn.edu.zqu.hr_system.project.model.enums.ResultCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class RestExceptionHandler {
  /**
   * 默认全局异常处理。
   *
   * @param e the e
   * @return ResultData
   */
  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResultData<String> exception(Exception e) {
    log.error("全局异常信息 ex={}", e.getMessage(), e);
    return ResultData.fail(ResultCode.RC500.getCode(), e.getMessage());
  }

}
