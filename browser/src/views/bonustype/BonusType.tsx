import React, {FC, useEffect, useState} from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Pagination,
  PaginationProps,
  Popconfirm,
  Select,
  Table,
  Typography
} from "antd";
import {EditableCellProps, IPage} from "../common";


import moment from "moment";
import {createBonusType, getBonusTypePage, updateBonusType} from "../../api/bounstype";
import {BonusTypeItem} from "../../model/bounstype";


const App: FC = () => {
  const [form] = Form.useForm();
  const [newForm] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);

  const [newAMFlag,setNewAMFlag] = useState(0)

  useEffect(() => {
    let param: IPage = {
      current: pageNumber,
      size: pageSize,
    };


    getBonusTypePage(param)
      .then(res => {
        //console.log(res)
        setTotal(res.total)
        setData(res.records)
      })
  }, [pageNumber, pageSize,newAMFlag])

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState(0);
  const isEditing = (record: BonusTypeItem) => record.id === editingKey;

  const edit = (record: Partial<BonusTypeItem>) => {
    form.setFieldsValue({...record});
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as BonusTypeItem;
      console.log(row);
      //拷贝新数据
      const newData: any = [...data];
      const index = newData.findIndex((item: BonusTypeItem) => key === item.id);
      if (index > -1) {
        const item: BonusTypeItem = newData[index];
        //console.log(item);
        const newRow = {
          ...item,
          ...row,
        }
        //newRow.roleId = roles.find()
        updateBonusType(newRow);
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
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      editable: true,

      render: (text: any) => <a>{text}</a>,
    },

    {
      title: '发放间隔(月)',
      dataIndex: 'gap',
      key: 'gap',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      editable: true,

      render: (text: string) => text === 'Y' ? "启用" : text === 'N' ? "停用" : "删除",

    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: Partial<BonusTypeItem>) => {
        const editable = isEditing(record as BonusTypeItem);
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
          {key: "Y", label: "启用", value: "Y"},
          {key: "N", label: "停用", value: "N"},
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
      onCell: (record: BonusTypeItem) => ({
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
    createBonusType(values).then(res=>{
      setNewAMFlag(newAMFlag+1)
      console.log(res)
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h2>奖金类型管理页</h2>
      <Form form={newForm} name="basic" layout={"inline"} onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
        <Form.Item rules={ [{required:true,}]} name="name">
          <Input placeholder={"奖金名称"} style={{width: 300}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="gap">
          <InputNumber placeholder={"发放间隔(月)"} style={{width: 120}}/>
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
