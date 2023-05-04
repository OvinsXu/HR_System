import React, { FC, useState } from "react";
import { Button, Drawer, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import WidgetTime from "./WidgetTime";
import { updatePwd } from "../api/user";
import notification from 'antd/lib/notification';
import { NotificationPlacement } from 'antd/lib/notification/interface';
/**
 * 显示登录用户的信息,如果还没登录,也会跳转到登录界面
 */
const App: FC = () => {
    const navigate = useNavigate();

    const Logout = () => {
        sessionStorage.removeItem("userinfo");
        sessionStorage.removeItem("userrole");
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        navigate("/login");
    }
    const userinfo = JSON.parse(sessionStorage.getItem("userinfo") + "");
    const userrole = JSON.parse(sessionStorage.getItem("userrole") + "") == "" ? "emp" : JSON.parse(sessionStorage.getItem("userrole") + "");

    const [open, setOpen] = useState(false);

    const onFinish = (values: any) => {
        updatePwd(values).then((res) => {
            setOpen(false)
            if (res.status === 100) {
                openNotification('top','更改成功','请重新登录!');
                sessionStorage.removeItem("token");
                localStorage.removeItem("token");
                setTimeout(()=>navigate('/login'),3000);  
                
            }else{
                openNotification('top','更改失败',res.data); 
            }

        })
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    //通知框,使用Hook
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, message: string, description: string) => {
        api.error({
            message,
            description,
            placement,
            duration: 3
        });
    }

    return (
        <div>
            {contextHolder}
            {sessionStorage.getItem("token") != null &&
                <>
                    <WidgetTime />
                    <h3>欢迎你,[{userrole}]{userinfo != null && userinfo.truename}</h3>
                    <Button style={{ marginBottom: '10px' }} type={"primary"} danger onClick={Logout}>注销</Button>
                    <Button style={{ marginBottom: '10px' }} type={"primary"} onClick={() => setOpen(true)}>更改密码</Button>
                </>
            }
            <Drawer
                title="更改密码"
                width={400}
                onClose={() => setOpen(false)}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="旧密码"
                        name="oldPwd"
                        rules={[{ required: true, message: '请输入旧密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="newPwd"
                        rules={[{ required: true, message: '请输入新密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>



                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            确认更改
                        </Button>
                    </Form.Item>
                </Form>

            </Drawer>
        </div>

    );
}
export default App;
