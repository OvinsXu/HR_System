import React, {FC, useEffect, useMemo, useState} from "react";
import {Button, Form, InputNumber, Pagination, PaginationProps, Popconfirm, Select, Table, Typography} from "antd";
import {EditableCellProps, IPage} from "../common";
import {getUserList, getUserListLike} from "../../api/user";
import {UserItem} from "../../model/user";

// @ts-ignore
import debounce from 'lodash/debounce';
import {createBonus, eraseBonus, getBonusPage, getBonusType, updateBonus} from "../../api/wage";
import {BonusItem} from "../../model/wage";


const App: FC = () => {
  const [form] = Form.useForm();
  const [newForm] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [userList, setUserList] = useState([] as any);
  const [btList, setBTList] = useState([] as any);
  const [hasNew, setHasNew] = useState(false)

  useEffect(() => {//获取奖金类型
    getBonusType().then(res => {
      setBTList(res.data)
    });
  }, [])
  useEffect(() => {//获取数据
    let param: IPage = {
      current: pageNumber,
      size: pageSize,
    };
    getBonusPage(param)
      .then(res => {
        setTotal(res.total)
        setData(res.records)
        setHasNew(false)
      })
  }, [pageNumber, pageSize, hasNew])

  useEffect(() => {//获取其他表的数据
    if (data.length > 0) {
      const uids = data.map((item: any) => item.uid)
      getUserList(uids).then(res => {//获取用户信息
        setUserList(res)
        setSearchUserList(res)
      });
    }
  }, [data])

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  const [editingKey, setEditingKey] = useState(0);
  const isEditing = (record: BonusItem) => record.id === editingKey;

  const edit = (record: Partial<BonusItem>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as BonusItem;
      //拷贝新数据
      const newData: any = [...data];
      const index = newData.findIndex((item: BonusItem) => key === item.id);
      if (index > -1) {
        const item: BonusItem = newData[index];
        const newRow = {
          ...item,
          ...row,
        }
        if (newRow !== item) {//如果有变化
          await updateBonus(newRow).then(() => {
            setHasNew(true);
          });
          setEditingKey(0);
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey(0);
        }
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const deleteBonus = async (id: number) => {
    await eraseBonus(id).then(() => {
      setHasNew(true);
    });
  }

  //列设置
  const columns = [
    {
      title: '用户',
      dataIndex: 'uid',
      key: 'uid',
      align: 'center',
      editable: true,

      render: (item: any) => {
        const user = userList.find((i: any) => i.id == item)
        return user == null ? "" : user.truename
      }
    },
    {
      title: '奖金类型',
      dataIndex: 'btid',
      key: 'btid',
      editable: true,
      render: (item: any) => {
        const bt = btList.find((i: any) => i.id == item)
        return bt == null ? "" : bt.name
      }

    },
    {
      title: '金额(元)',
      dataIndex: 'sum',
      key: 'sum',
      editable: true,
    },
    {
      title: '发放年份',
      dataIndex: 'year',
      key: 'year',
      editable: true,

    },
    {
      title: '发放月份',
      dataIndex: 'month',
      key: 'month',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: Partial<BonusItem>) => {
        const editable = isEditing(record as BonusItem);
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
          <span>
            <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record)} style={{ marginRight: 8 }}>
              编辑
            </Typography.Link>
            <Typography.Link disabled={editingKey !== 0} onClick={() => deleteBonus(record.id!)}>
              删除
            </Typography.Link>
          </span>
        );
      },
    },

  ];

  const [searchUserList, setSearchUserList] = useState([] as Array<UserItem>);//搜索用户列表
  const [openSelect, setOpenSelect] = useState(false);//控制列表是否默认展开
  const [fetching, setFetching] = useState(false);
  //防抖用户搜索,时间内只能发送一个请求
  const debounceFetcher = useMemo(() => {
    const loadOptions = (username: string) => {
      setFetching(true);

      getUserListLike(username).then((res) => {
        setSearchUserList(res);
        setFetching(false);
        setOpenSelect(true);//搜索完成,刷新列表,会关闭展开项,这里主动展开
      });
    };
    return debounce(loadOptions, 1000);//loadOptions上次调用后,时间超过才能再次调用
  }, []);

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode;

    switch (dataIndex) {
      case 'uid':
        inputNode = <Select style={{ width: 120 }} showSearch placeholder="姓名搜索"
          onSearch={debounceFetcher}
          defaultOpen={openSelect}
          onSelect={() => {
            setOpenSelect(false);
          }}
          options={
            searchUserList.map((item) => {
              return { key: item.id, value: item.id, label: item.truename }
            })}>
        </Select>
        break;
      case 'btid':
        inputNode = <Select style={{ width: 120 }}>
          {
            btList.map((item: any) => {
              return <option key={item.id} value={item.id}>{item.name}</option>
            })
          }
        </Select>
        break;
      default:
        inputNode = <InputNumber name={""} />;

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
      onCell: (record: BonusItem) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onFinish = (values: any) => {
    values.status = "Y";
    createBonus(values).then(res => {
      setHasNew(true)
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h2>奖金信息页</h2>
      <Form form={newForm} name="basic" layout={"inline"} onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item rules={[{ required: true, }]} name="uid">
          <InputNumber placeholder={"用户编号"} style={{ width: 80 }} />
        </Form.Item>
        <Form.Item rules={[{ required: true, }]} name="btid">
          <InputNumber placeholder={"奖金类型"} style={{ width: 120 }} />
        </Form.Item>
        <Form.Item rules={[{ required: true, }]} name="sum">
          <InputNumber placeholder={"金额(元)"} style={{ width: 120 }} />
        </Form.Item>
        <Form.Item rules={[{ required: true, }]} name="year">
          <InputNumber placeholder={"发放年份"} style={{ width: 120 }} />
        </Form.Item>
        <Form.Item rules={[{ required: true, }]} name="month">
          <InputNumber placeholder={"发放月份"} style={{ width: 150 }} />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType="submit">新建</Button>
        </Form.Item>
      </Form>
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