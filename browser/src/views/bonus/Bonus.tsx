import React, {FC, useEffect, useState} from "react";
import {
  Button,
  Col,
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
import {EditableCellProps, IPage} from "../common";


import moment from "moment";
import {createBonus, getBonusPage, updateBonus} from "../../api/bonus";
import {BonusItem} from "./model";
import {getUserList} from "../../api/user";
import {getBonusTypeList} from "../../api/bounstype";



const App: FC = () => {
  const [form] = Form.useForm();
  const [newForm] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

  const [userList,setUserList] = useState([] as any);
  const [btList,setBTList] = useState([] as any);
  const [newAMFlag,setNewAMFlag] = useState(0)

  useEffect(() => {
    let param: IPage = {
      current: pageNumber,
      size: pageSize,
    };
    getBonusPage(param)
      .then(res => {
        console.log(res)
        setTotal(res.total)
        setData(res.records)
      })
  }, [pageNumber, pageSize,newAMFlag])
  useEffect(()=>{
    if (data.length>0){

      const uids = data.map((item:any)=>item.uid)
      getUserList(uids).then(res=>{

        setUserList(res)
      });
      getBonusTypeList(uids).then(res=>{

        setBTList(res)
      });
    }
  },[data])

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState(0);
  const isEditing = (record: BonusItem) => record.id === editingKey;

  const edit = (record: Partial<BonusItem>) => {
    form.setFieldsValue({...record});
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as BonusItem;
      console.log(row);
      //拷贝新数据
      const newData: any = [...data];
      const index = newData.findIndex((item: BonusItem) => key === item.id);
      if (index > -1) {
        const item: BonusItem = newData[index];
        //console.log(item);
        const newRow = {
          ...item,
          ...row,
        }
        //newRow.roleId = roles.find()
        updateBonus(newRow);
        //console.log(newRow);
        newData.splice(index, 1, newRow);
        setData(newData);
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

  const formatterTime = (val: moment.MomentInput) => {
    return val ? moment(val).format('YYYY-MM-DD') : '';
  }


  //列设置
  const columns = [
    {
      title: '用户',
      dataIndex: 'uid',
      key: 'uid',
      align: 'center',
      editable: true,

      render: (item:any) => {
        const user = userList.find((i:any) => i.id==item)
        return user==null?"":user.truename
      }
    },

    {
      title: '奖金类型',
      dataIndex: 'btid',
      key: 'btid',
      editable: true,
      render: (item:any) => {
        const bt = btList.find((i:any) => i.id==item)
        return bt==null?"":bt.name
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
            <Typography.Link onClick={() => save(record.id!)} style={{marginRight: 8}}>
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
        inputNode = <Input/>
        break;
      default:
        inputNode = <InputNumber name={""}/>;

    }

    return (
      <td {...restProps}>

        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{margin: 0}}
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
    values.status="Y";
    createBonus(values).then(res=>{
      setNewAMFlag(newAMFlag+1)
      console.log(res)
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
        <Form.Item rules={ [{required:true,}]} name="uid">
          <InputNumber placeholder={"用户编号"} style={{width: 80}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="btid">
          <InputNumber placeholder={"奖金类型"} style={{width: 120}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="sum">
          <InputNumber placeholder={"金额(元)"} style={{width: 120}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="year">
          <InputNumber placeholder={"发放年份"} style={{width: 120}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="month">
          <InputNumber placeholder={"发放月份"} style={{width: 150}}/>
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
        }} columns={mergedColumns} rowClassName="editable-row" dataSource={data} pagination={false} bordered/>
      </Form>
      <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={onChange}/>
    </>
  );
}

export default App;
