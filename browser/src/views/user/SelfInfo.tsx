import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Pagination,
  PaginationProps,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography
} from "antd";
import React, { FC, useEffect, useState } from "react";
import { createTransfer, eraseUser, getUserPage, getUserSelf, updateUser, updateUserSelf } from "../../api/user";
import { UserItem } from "../../model/user";
import "../system/System.module.css"
import { EditableCellProps, IPage } from "../common";
import { getPostList } from "../../api/org";
import { PlusOutlined } from '@ant-design/icons';
import UserAdd from "./UserAdd";
import { createSkill } from "../../api/devel";

import notification from 'antd/lib/notification';
import { NotificationPlacement } from 'antd/lib/notification/interface';
const App: FC = () => {
  const [form] = Form.useForm();

  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<Array<any>>([]);
  const [postList, setPostList] = useState([] as any);
  const [editingKey, setEditingKey] = useState(0);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    let param: IPage = {
      current: pageNumber,
      size: pageSize,
    };
    getUserSelf()
      .then(res => {
        console.log(res);
        let tres = [];
        tres.push(res);
        setTotal(1)
        setData(tres)
        setHasNew(false)
      })
  }, [pageNumber, pageSize, hasNew])

  useEffect(() => {
    if (data.length > 0) {
      const pids = data.map((item: any) => item.pid)

      getPostList(pids).then((res: any) => {
        setPostList(res)
      })
    }
  }, [data])

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };


  const isEditing = (record: UserItem) => record.id === editingKey;

  const edit = (record: Partial<UserItem>) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      //验证格式
      const row = (await form.validateFields()) as UserItem;
      //拷贝数据,用于操作
      const newData: any = [...data];
      //找到操作的列
      const index = newData.findIndex((item: UserItem) => key === item.id);
      if (index > -1) {
        const item: UserItem = newData[index];
        const newRow = {  //合并两个数组
          ...item,
          ...row,         //相同属性,以新的为准
        }

        if (newRow !== item) {//如果有变化
          if (newRow.status === "D") {//如果是删除
            await eraseUser(newRow.id).then(() => {
              setHasNew(true);
            });
          } else {
            await updateUserSelf(newRow).then(() => {
              setHasNew(true);
            });
          }
        }
        setEditingKey(0);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(0);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  //列设置
  const columns = [
    {
      title: '姓名',
      dataIndex: 'truename',
      key: 'truename',
      align: 'center',
      editable: true,

      render: (text: any) => <a title="点击打印文件模板">{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      editable: true,

      render: (item: string) => item === "M" ? "男" : "女",
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      editable: true,
    },
    {
      title: '岗位',
      dataIndex: 'pid',
      key: 'pid',
      render: (item: any) => {
        if (item) {
          const post = postList.find((i: any) => i.id === item)
          return post == null ? "" : post.name
        } else {
          return '无';
        }
      }
    },
    {
      title: '籍贯',
      dataIndex: 'nativePlace',
      key: 'nativePlace',
      editable: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      editable: true,

      render: (item: string) => <a href={"mailto:" + item} title="点击发送邮件">{item}</a>

    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      editable: true,
    },
    {
      title: '家庭住址',
      dataIndex: 'address',
      key: 'address',
      editable: true,
    },
    {
      title: '工资结算方式',
      dataIndex: 'cash',
      key: 'cash',
      editable: true,

      render: (text: any) => text === "C" ? "银行卡" : "现金",
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: Partial<UserItem>) => {
        const editable = isEditing(record as UserItem);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id!)} style={{ marginRight: 8 }}>
              保存
            </Typography.Link>
            <Popconfirm title="确定取消?" cancelText={'取消'} okText={'确认'} onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },

  ];

  const EditableCell: React.FC<EditableCellProps>
    = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
      let inputNode;

      switch (dataIndex) {
        case 'sex':
          inputNode =
            <Select options={[{ key: 'M', label: "男", value: "M" }, { key: 'W', label: "女", value: "W" }]}></Select>
          break;
        case 'age':
          inputNode = <Input type={"number"} />
          break;
        case 'email':
          inputNode = <Input type={"email"} />
          break;
        case 'cash':
          inputNode =
            <Select options={[{ key: 'C', label: "银行卡", value: "C" }, { key: 'M', label: "现金", value: "M" }]}></Select>
          break;
        default:
          inputNode = <Input />;
      }

      return (
        <td {...restProps}>

          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `请输入 ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  const mergedColumns: any = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: UserItem) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const [newForm] = Form.useForm();
  const [skillForm] = Form.useForm();
  const onFinish = (values: any) => {
    values.status = "N";
    values.uid = userinfo.id;
    console.log(values)
    createTransfer(values).then(res => {
      if(res.status === 100){
        openNotification('top')
      }
      setHasNew(true)
      console.log(res)
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  const onSkillFinish = (values: any) => {
    values.status = "N";
    values.uid = userinfo.id;
    console.log(values)
    createSkill(values).then(res => {
      if(res.status === 100){
        openNotification('top')
      }
      setHasNew(true)
      console.log(res)
    })
  };

  const onSkillFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }
  //通知框,使用Hook
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.success({
      message: `申请成功!`,
      description:
        '请等待人事审核!',
      placement,
      duration: 3
    });
  }
  const userinfo = JSON.parse(sessionStorage.getItem("userinfo") + "");
  return (
    <>{contextHolder}
      <Row style={{ margin: 10 }}>
        <Col span={9}></Col>
        <Col>
          <h2>个人管理</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form form={newForm} name="basic" layout={"inline"} onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Form.Item rules={[{ required: true, }]} name="pid">
              <InputNumber placeholder={"申请岗位编号"} style={{ width: 120 }} />
            </Form.Item>
            <Form.Item>
              <Button type={"primary"} htmlType="submit">申请调岗</Button>
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form form={skillForm} name="basic" layout={"inline"} onFinish={onSkillFinish}
            onFinishFailed={onSkillFinishFailed}>
            <Form.Item rules={[{ required: true, }]} name="name">
              <Input placeholder={"证书名称"} style={{ width: 120 }} />
            </Form.Item>
            开始时间:<Form.Item rules={[{ required: true, }]} name="beginTime">
              <Input type={"date"} style={{ width: 150 }} />
            </Form.Item>
            结束时间:<Form.Item rules={[{ required: true, }]} name="endTime">
              <Input type={"date"} style={{ width: 150 }} />
            </Form.Item>
            <Form.Item>
              <Button type={"primary"} htmlType="submit">技能证书审核申请</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Form form={form} component={false}>
        <Table components={{
          body: {
            cell: EditableCell,
          },
        }} columns={mergedColumns} rowClassName="editable-row" dataSource={data} pagination={false} bordered />
      </Form>

    </>
  );
}
export default App;
