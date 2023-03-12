import React from 'react';
import {Button, Checkbox, Col, Form, Input, Row} from 'antd';
import {useNavigate} from "react-router-dom";
import {getUserRole, Login} from "../api/user";
import {ILogin} from "../model/user";
import notification, {NotificationPlacement} from 'antd/lib/notification';


const App = () => {
  const navigate = useNavigate();

  const onFinish = async (param: ILogin) => {
    const user = await Login(param.username, param.password);

    if (user.status == 100) {
      sessionStorage.setItem("userinfo", JSON.stringify(user.data));
      if (param.remember) {
        localStorage.setItem("token", sessionStorage.getItem("token")!);
      }
      //登陆后获取角色
      const role = await getUserRole();
      if (role.status == 100) {
        const userrole = role.data.map((arr: any)=>arr.authority.replace("ROLE_",""));
        sessionStorage.setItem("userrole", JSON.stringify(userrole));
      }
      navigate("/");
    }else{
      openNotification('top')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  //通知框,使用Hook
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.error({
      message: `登录失败!`,
      description:
        '账号或密码错误,请重新输入!',
      placement,
      duration:1
    });
  }

  return (
    <>
      {contextHolder}
      <Row style={{paddingTop: '100px'}}>
        <Col span={8}></Col>
        <Col span={8}>
          <h1>人事管理系统</h1>
        </Col>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 8,}} initialValues={{remember: false,}}
                onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <Form.Item label="账号" name="username" rules={[{required: true, message: '请输入登录账号!',},]}>
              <Input/>
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{required: true, message: '请输入密码!',},]}>
              <Input.Password/>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 8,}}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 8,}}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default App;
