import { Button, Drawer, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useEffect, useState } from "react";
import { createLeaves, getLeavesAllType } from "../api/attendance";

const App: FC = () => {
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const [leavesType, setLeavesTypeList] = useState([] as any);

  useEffect(() => {
    getLeavesAllType().then((res: any[]) => {
      setLeavesTypeList(res)
    });

  }, [])
  const onClick = () => {
    setOpen(true)
  }
  const onFinish = (values: any) => {
    console.log(values);
    
    createLeaves(values).then((res) => {
      console.log(res)
      message.info("提交成功!")
    })
    setOpen(false)
    setHasNew(true);
  };
  return (

    <div>
      <Drawer
        title="请假"
        width={720}
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          style={{ textAlign: "left" }}
          labelCol={{ xs: { span: 6 }, }}
          wrapperCol={{ xs: { span: 12 }, }}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item name="hid" label="请假类型">
            <Select style={{ width: 120 }} placeholder="选择类型"
              options={leavesType.map((item: any) => ({ key: item.id, value: item.id, label: item.name }))}>
            </Select>
          </Form.Item>

          <Form.Item name="beginDate" label="开始时间" rules={[{ required: true, message: '请选择开始时间!' }]}>
            <Input type={"datetime-local"} style={{ width: 150 }} />
          </Form.Item>
          <Form.Item name="endDate" label="结束时间" rules={[{ required: true, message: '请选择结束时间!' }]}>
            <Input type={"datetime-local"} style={{ width: 150 }} />
          </Form.Item>

          <Form.Item name="details" label="详细情况">
            <TextArea rows={6} placeholder="不超出128字" maxLength={128} />
          </Form.Item>


          <Form.Item wrapperCol={{
            xs: {
              span: 24,
              offset: 10,
            },
          }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>

        </Form>
      </Drawer>
      <Button style={{ color: 'green', margin: '10px' }} onClick={onClick}>请假</Button>
    </div>
  );
}

export default App;

