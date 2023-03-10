import React from 'react';
import {Form, Input, Button, Checkbox, Row, Col} from 'antd';
import {useNavigate} from "react-router-dom";

import {Login} from "../api/user";
import {ILogin} from "../views/user/model";

import notification, { NotificationPlacement } from 'antd/lib/notification';



const App = () => {
  const navigate = useNavigate();

  const onFinish = async (param: ILogin) => {
    const res = await Login(param.username, param.password);
    if (res.status == 100) {
      console.log(res.data)
      sessionStorage.setItem("userinfo", JSON.stringify(res.data));
      if (param.remember) {
        localStorage.setItem("token", sessionStorage.getItem("token")!);
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

          <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 8,}} initialValues={{remember: false,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
