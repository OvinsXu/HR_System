# 前端项目

## 技术

- Typescript ： 语言
- React ： 库
- Antd ： UI组件
- react-router-dom : 路由
- Redux Toolkit：状态管理
  - [文档](https://redux-toolkit.js.org/tutorials/quick-start)

## 文件夹

- public
- src ： 源码
  - app ：应用级代码
  - 

数据

- login  --> session(userinfo)  session(token)
  - 记住 --> local(token)
-  重载时
  - 如果local(token) --> session(token)

## 学习

TS的React组件传值,子组件`App: FC<PropsType> = (props)`需要写明类型`PropsType`,不然无法进行类型推导.

```tsx
//例子
interface PropsType {
  onClose: () => void;
}
const App: FC<PropsType> = (props) => {
	const { onClose } = props;
	onClose();
    //return()...
}
```





## 问题

useState异步问题：https://blog.csdn.net/qq_61233877/article/details/124017052