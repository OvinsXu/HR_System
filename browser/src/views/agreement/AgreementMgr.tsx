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
import {createAgreement, getAgreementPage, updateAgreement} from "./api";
import {AgreementItem} from "./model";
import {getUserList} from "../user/api";



const App: FC = () => {
  const [form] = Form.useForm();
  const [newForm] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

  const [newAMFlag,setNewAMFlag] = useState(0)
  const [userList,setUserList] = useState([] as any);

  useEffect(() => {
    let param: IPage = {
      current: pageNumber,
      size: pageSize,
    };


    getAgreementPage(param)
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
    }
  },[data])

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState(0);
  const isEditing = (record: AgreementItem) => record.id === editingKey;

  const edit = (record: Partial<AgreementItem>) => {
    form.setFieldsValue({...record});
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as AgreementItem;
      console.log(row);
      //拷贝新数据
      const newData: any = [...data];
      const index = newData.findIndex((item: AgreementItem) => key === item.id);
      if (index > -1) {
        const item: AgreementItem = newData[index];
        //console.log(item);
        const newRow = {
          ...item,
          ...row,
        }
        //newRow.roleId = roles.find()
        updateAgreement(newRow);
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
      title: '用户编号',
      dataIndex: 'uid',
      key: 'uid',
      align: 'center',
      editable: true,

      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'uid',
      key: 'uid',

      render: (item:any) => {
        const user = userList.find((i:any) => i.id==item)
        return user==null?"":user.truename
      }
    },

    {
      title: '基本工资(元)',
      dataIndex: 'wage',
      key: 'wage',
      editable: true,

    },
    // {
    //   title: '养老保险',
    //   dataIndex: 'endowment',
    //   key: 'endowment',
    //   editable: true,
    // },
    // {
    //   title: '医疗保险',
    //   dataIndex: 'medical',
    //   key: 'medical',
    //   editable: true,
    // },
    // {
    //   title: '失业保险',
    //   dataIndex: 'unemployment',
    //   key: 'unemployment',
    //   editable: true,
    // },
    // {
    //   title: '工伤保险',
    //   dataIndex: 'employment',
    //   key: 'employment',
    //   editable: true,
    // },
    // {
    //   title: '生育保险',
    //   dataIndex: 'maternity',
    //   key: 'maternity',
    //   editable: true,
    // },
    {
      title: '五险金额(元)',
      dataIndex: 'insurance',
      key: 'insurance',
      editable: true,
    },
    {
      title: '住房公积金(元)',
      dataIndex: 'housingFund',
      key: 'housingFund',
      editable: true,

    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      key: 'beginTime',
      editable: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      render: (text: any) => {
        switch (text) {
          case "Y":
            return "有效"
          case "N":
            return "过期"
          case "R":
            return "已续约"
          case "D":
            return "删除"
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: Partial<AgreementItem>) => {
        const editable = isEditing(record as AgreementItem);
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
      case 'beginTime':
      case 'endTime':
        inputNode = <Input type={"date"} name={""}/>
        break;
      case 'status':
        inputNode = <Select options={[
          {key: "Y", label: "有效", value: "Y"},
          {key: "N", label: "过期", value: "N"},
          {key: "R", label: "已续签", value: "R"},
          {key: "D", label: "删除", value: "D"},
        ]}></Select>
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
      onCell: (record: AgreementItem) => ({
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
    createAgreement(values).then(res=>{
      setNewAMFlag(newAMFlag+1)
      console.log(res)
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h2>合同信息页</h2>
      <Form form={newForm} name="basic" layout={"inline"} onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
        <Form.Item rules={ [{required:true,}]} name="uid">
          <InputNumber placeholder={"用户编号"} style={{width: 80}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="wage">
          <InputNumber placeholder={"基本工资(元)"} style={{width: 120}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="insurance">
          <InputNumber placeholder={"五险金额(元)"} style={{width: 120}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="housingFund">
          <InputNumber placeholder={"住房公积金(元)"} style={{width: 120}}/>
        </Form.Item>
        开始时间:<Form.Item rules={ [{required:true,}]} name="beginTime">
          <Input type={"date"}  style={{width: 150}}/>
        </Form.Item>
        结束时间:<Form.Item rules={ [{required:true,}]} name="endTime">
          <Input type={"date"}  style={{width: 150}}/>
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
