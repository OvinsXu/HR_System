import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Pagination,
  PaginationProps,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography
} from "antd";
import React, {FC, useEffect, useState} from "react";
import {eraseUser, getUserPage, updateUser} from "../../api/user";
import {UserItem} from "../../model/user";
import "../system/System.module.css"
import {EditableCellProps, IPage} from "../common";
import {getPostList} from "../../api/org";
import {PlusOutlined} from '@ant-design/icons';
import UserAdd from "./UserAdd";

const App: FC = () => {
  const [form] = Form.useForm();

  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [postList, setPostList] = useState([] as any);
  const [editingKey, setEditingKey] = useState(0);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    let param: IPage = {
      current: pageNumber,
      size: pageSize,
    };
    getUserPage(param)
      .then(res => {
        setTotal(res.total)
        setData(res.records)
        setHasNew(false)
      })
  }, [pageNumber, pageSize, hasNew])

  useEffect(() => {
    if (data.length > 0) {
      const pids = data.map((item: any) => item.pid)

      getPostList(pids).then((res:any) => {
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

        if(newRow!==item){//如果有变化
          if(newRow.status==="D"){//如果是删除
            await eraseUser(newRow.id).then(()=>{
              setHasNew(true);
            });
          }else{
            await updateUser(newRow).then(()=>{
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

      render:(item:string)=><a href={"mailto:"+item} title="点击发送邮件">{item}</a>

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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      render: (text: any) => {
        switch (text) {
          case "S":
            return "实习"
          case "J":
            return "兼职"
          case "Z":
            return "在职"
          case "T":
            return "停工"
          case "L":
            return "离职"
        }
      }
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
        case 'status':
          inputNode = <Select options={[
            { key: "S", label: "实习", value: "S" },
            { key: "J", label: "兼职", value: "J" },
            { key: "Z", label: "在职", value: "Z" },
            { key: "T", label: "停工", value: "T" },
            { key: "L", label: "离职", value: "L" },
            { key: "D", label: "删除", value: "D" },
          ]}></Select>
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
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Row style={{ margin: 10 }}>
        <Col>
          <Button type={"primary"} onClick={showDrawer} icon={<PlusOutlined />}>新建</Button>
        </Col>
        <Col span={9}></Col>
        <Col>
          <h2>员工信息页</h2>
        </Col>
      </Row>
      <Drawer
        title="录入新用户"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <UserAdd onClose={onClose} setHasNew={setHasNew} />
      </Drawer>

      <Form form={form} component={false}>
        <Table components={{
          body: {
            cell: EditableCell,
          },
        }} columns={mergedColumns} rowClassName="editable-row" dataSource={data} pagination={false} bordered />
      </Form>
      <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={onChange} />
    </>
  );
}
export default App;
