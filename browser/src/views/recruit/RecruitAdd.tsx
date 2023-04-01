import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, message, Row, Select } from "antd";

import TextArea from "antd/es/input/TextArea";
import { createRecruit } from "../../api/recruit";
import { getAllPost } from "../../api/org";
import { PostItem } from "../../model/org";

interface PropsType {
  onClose: () => void;
  setHasNew: Dispatch<SetStateAction<boolean>>;
}
const App: FC<PropsType> = (props) => {
  const { onClose, setHasNew } = props;
  const [form] = Form.useForm();
  const [postList, setPostList] = useState([] as any);


  useEffect(() => {
    getAllPost().then((res: any) => {     
      setPostList(res.data)
    })
  }, [])

  const onFinish = (values: any) => {
    createRecruit(values).then((res) => {
      message.info("创建成功")
    })
    onClose();
    setHasNew(true);
  };

  return (
    <>
      <Form
        style={{ textAlign: "left" }}
        labelCol={{ xs: { span: 6 }, }}
        wrapperCol={{ xs: { span: 12 }, }}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >


        <Form.Item name="pid" label="岗位" tooltip="必须选择招聘岗位"
          rules={[{ required: true, message: '请选择岗位!',}]}>
          <Select>
          {
            postList.map((item:PostItem) =>
              <option key={item.id} value={item.id}>{item.name}</option>
            )
          }
        </Select>
        </Form.Item>

        <Row>
          <Col span={8} offset={3}>
            <Form.Item name="wage" label="工资"
              rules={[{ required: true, message: '请输入工资!', },]} hasFeedback>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="num" label="人数" rules={[
              {
                type: 'number', min: 0,
                message: '招聘人数至少是0!',
              }
            ]}>
              <InputNumber style={{ width: '100px' }} />
            </Form.Item>
          </Col>
        </Row>


        <Form.Item name="details" label="待遇详情" rules={[
          {
            required: true,
            message: '请输入待遇详情!',
          },
        ]} hasFeedback>
          <TextArea rows={4} placeholder="不超出256字" maxLength={256} />
        </Form.Item>

        <Form.Item name="request" label="工作要求" rules={[
          {
            required: true,
            message: '请输入工作要求!',
          },
        ]} hasFeedback>
          <TextArea rows={4} placeholder="不超出256字" maxLength={256} />
        </Form.Item>

        <Form.Item name="content" label="工作内容" rules={[
          {
            message: '请输入工作内容!',
          },
        ]}>
          <TextArea rows={4} placeholder="不超出256字" maxLength={256} />
        </Form.Item>

        <Form.Item name="contact" label="联系方式" rules={[
          {
            message: '请输入联系方式!',
          },
        ]}>
          <TextArea rows={4} placeholder="不超出128字" maxLength={128} />
        </Form.Item>



        <Form.Item wrapperCol={{
          xs: {
            span: 24,
            offset: 10,
          },
        }}>
          <Button type="primary" htmlType="submit">
            录入招聘信息
          </Button>
        </Form.Item>

      </Form>
    </>
  );
}
export default App;

