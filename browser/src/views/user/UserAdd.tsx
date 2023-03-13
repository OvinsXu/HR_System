import React, {Dispatch, FC, SetStateAction} from "react";
import {Button, Col, Form, Input, InputNumber, message, Row, Select} from "antd";
import {createUser} from "../../api/user";

interface PropsType {
  onClose: () => void;
  setHasNew:Dispatch<SetStateAction<boolean>>;
}
const App: FC<PropsType> = (props) => {
  const { onClose,setHasNew } = props;
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    values.cash = "C";
    values.status = "S";

    createUser(values).then((res) => {
      console.log(res)
      message.info("创建成功,默认为实习状态!可在用户管理界面更改!")
    })
    onClose();
    setHasNew(true);
  };

  return (
    <>
      <Form
        style={{textAlign: "left"}}
        labelCol={{xs: {span: 6},}}
        wrapperCol={{xs: {span: 12},}}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item name="username" label="账号" tooltip="用于用户登录"
                   rules={[{required: true, message: '请输入账号!', whitespace: true}]}>
          <Input/>
        </Form.Item>

        <Form.Item name="password" label="密码"
                   rules={[{required: true, message: '请输入密码!',},]} hasFeedback>
          <Input.Password/>
        </Form.Item>

        <Form.Item name="confirm" label="重复密码" dependencies={['password']} hasFeedback
                   rules={[{required: true, message: '请重复输入密码!',},
                     ({getFieldValue}) => ({
                       validator(_, value) {
                         if (!value || getFieldValue('password') === value) {
                           return Promise.resolve();
                         }
                         return Promise.reject(new Error('密码不一致!'));
                       },
                     }),]}>
          <Input.Password/>
        </Form.Item>

        <Row>
          <Col span={8} offset={4}>
            <Form.Item name="truename" label="姓名"
                       rules={[{required: true, message: '请输入姓名!', whitespace: true}]}>
              <Input/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="sex" label="性别"
                       rules={[{required: true, message: '请选择性别!'}]}>
              <Select
                options={[{key: "M", label: "男", value: "M"}, {key: "W", label: "女", value: "W"}]}>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={4}>
            <Form.Item name="age" label="年龄"
                       rules={[{
                         type: 'number', min: 18, max: 65,
                         message: "请输入18~65之间的合法数字!"
                       }, {
                         required: true,
                         message: '请输入年龄!',
                       }
                       ]}
            >
              <InputNumber/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="nativePlace"
              label="籍贯"
              rules={[
                {
                  required: true,
                  message: '请输入籍贯信息!',
                },
              ]}
            >
              <Input/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="address" label="住址" rules={[
          {
            required: true,
            message: '请输入你的居住地址!',
          },
        ]}>
          <Input/>
        </Form.Item>


        <Form.Item name="email" label="电子邮箱"
                   rules={[{type: 'email', message: '邮箱格式无效!',}, {
                     required: true,
                     message: '请输入你的邮箱地址!',
                   },]}>
          <Input/>
        </Form.Item>

        <Form.Item name="phone" label="手机号码"
                   rules={[{required: true, message: '请输入你的手机号码!',},]}>
          <Input/>
        </Form.Item>
        <Form.Item name="card" label="银行卡号"
                   rules={[{required: true, message: '请输入你的银行卡号!',},]}>
          <Input/>
        </Form.Item>
        <Form.Item name="idCard" label="身份证号码"
                   rules={[{required: true, message: '请输入你的身份证号码!',},]}>
          <Input/>
        </Form.Item>
        <Form.Item wrapperCol={{
          xs: {
            span: 24,
            offset: 10,
          },
        }}>
          <Button type="primary" htmlType="submit">
            录入信息
          </Button>
        </Form.Item>

      </Form>
    </>
  );
}
export default App;
