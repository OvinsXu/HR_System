package cn.edu.zqu.hr_system.framework.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Arrays;
import java.util.List;

/**
 * Swagger配置类
 */
@Configuration
@EnableOpenApi
public class SwaggerConfig {
  @Bean
  public Docket docket() {
    return new Docket(DocumentationType.OAS_30)
            .apiInfo(apiInfo()).enable(true)
            .select()
            //apis： 添加swagger接口提取范围
            .apis(RequestHandlerSelectors.basePackage("cn.edu.zqu.hr_system"))
            //.apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
            .paths(PathSelectors.any())
            .build()
            .securityContexts(Arrays.asList(securityContext()))
            // ApiKey的name需与SecurityReference的reference保持一致
            .securitySchemes(Arrays.asList(apiKey()));

//            .globalRequestParameters(
//                    singletonList(new springfox.documentation.builders.RequestParameterBuilder()
//                            // 不能叫Authorization
//                            .name("token")
//                            .description("token")
//                            .in(ParameterType.HEADER)
//                            .required(true)
//                            .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)))
//                            .build()));

  }

  private ApiKey apiKey() {
    return new ApiKey("Authorization", "Authorization", "header");
  }

  private SecurityContext securityContext() {
    return SecurityContext.builder().securityReferences(defaultAuth()).build();
  }

  private List<SecurityReference> defaultAuth() {
    AuthorizationScope authorizationScope
            = new AuthorizationScope("global", "accessEverything");
    AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
    authorizationScopes[0] = authorizationScope;
    return Arrays.asList(new SecurityReference("Authorization", authorizationScopes));
  }


  private ApiInfo apiInfo() {
    return new ApiInfoBuilder()
            .title("人事管理系统接口文档")
            .description("项目描述....")
            //.contact(new Contact("作者", "作者URL", "作者Email"))
            .version("1.0")
            .build();
  }
}
