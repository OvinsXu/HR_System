# 后端项目

## 技术

1. Spring boot 2.7
2. Spring Security 5.7  https://blog.csdn.net/yu619251940/article/details/126872454
3. Mybatis-plus

Spring boot已经有3.0版本，Spring Security也有了6.0版本。有空会考虑升级。

## 文件夹说明

1. resources:放资源文件
    1. static:放前端静态文件
2. java:放后端代码
    1. common:通用功能,即可以给其他项目复用的代码
    2. framework:框架相关,更换框架时,尽可能不影响项目代码
    3. project:项目代码,写具体业务
        1. controller
        2. model
        3. service
            1. impl
               4.utils

## 接口说明

swagger : http://localhost:8080/swagger-ui/index.html

## 遇到過的問題

null值不更新:https://juejin.cn/post/6971765090307538980
