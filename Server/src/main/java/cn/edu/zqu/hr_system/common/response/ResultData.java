package cn.edu.zqu.hr_system.common.response;

import cn.edu.zqu.hr_system.project.model.enums.ResultCode;
import lombok.Data;

@Data
public class ResultData<T> {
  /**
   * 结果状态 ,具体状态码参见ResultData.java
   */
  private Integer status;
  private String message;
  private T data;
  private Long timestamp;


  public ResultData() {
    this.timestamp = System.currentTimeMillis();
  }


  public static <T> ResultData<T> success(T data) {
    ResultData<T> resultData = new ResultData<>();
    resultData.setStatus(ResultCode.RC100.getCode());
    resultData.setMessage(ResultCode.RC100.getMessage());
    resultData.setData(data);
    return resultData;
  }

  public static <T> ResultData<T> fail(int code, String message) {
    ResultData<T> resultData = new ResultData<>();
    resultData.setStatus(code);
    resultData.setMessage(message);
    return resultData;
  }

  public static <T> ResultData<T> sendCode(ResultCode code, T data) {
    ResultData<T> resultData = new ResultData<>();
    resultData.setStatus(code.getCode());
    resultData.setMessage(code.getMessage());
    resultData.setData(data);
    return resultData;
  }


}
