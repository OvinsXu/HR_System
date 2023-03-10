// import {FC, useEffect, useState} from "react";
// // 引入编辑器组件
// // import BraftEditor from 'braft-editor'
// // // 引入编辑器样式
// // import 'braft-editor/dist/index.css'
//
// const App:FC=()=>{
//   //const [editorState,setEditorState] = useState(BraftEditor.createEditorState(null));
//
//   // useEffect(()=>{
//   //   const htmlContent = await fetchEditorContent()
//   //   // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
//   //   setEditorState({
//   //     editorState: BraftEditor.createEditorState(htmlContent)
//   //   })
//   // },[])
//
//
//   // const handleEditorChange = (editorState: any) => {
//   //   setEditorState({ editorState })
//   // }
//   // const submitContent = async () => {
//   //   // 在编辑器获得焦点时按下ctrl+s会执行此方法
//   //   // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
//   //   const htmlContent = editorState.toHTML()
//   //   console.log(htmlContent)
//   //   //const result = await saveEditorContent(htmlContent)
//   // }
//
//   return (
//     <>
//       <h2>培训页面</h2>
//       <div className="my-component">
//         {/*<BraftEditor*/}
//         {/*  value={editorState}*/}
//         {/*  onChange={handleEditorChange}*/}
//         {/*  onSave={submitContent}*/}
//         {/*/>*/}
//       </div>
//     </>
//   );
// }
//
// export default App;
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
import {createTrain, getTrainPage, updateTrain} from "../../api/train";
import {TrainItem} from "./model";
import {getUserList} from "../../api/user";




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
    getTrainPage(param)
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
  const isEditing = (record: TrainItem) => record.id === editingKey;

  const edit = (record: Partial<TrainItem>) => {
    form.setFieldsValue({...record});
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as TrainItem;
      console.log(row);
      //拷贝新数据
      const newData: any = [...data];
      const index = newData.findIndex((item: TrainItem) => key === item.id);
      if (index > -1) {
        const item: TrainItem = newData[index];
        //console.log(item);
        const newRow = {
          ...item,
          ...row,
        }
        //newRow.roleId = roles.find()
        updateTrain(newRow);
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
      title: '培训名称',
      dataIndex: 'title',
      key: 'title',
      editable: true,
    },
    {
      title: '培训简介',
      dataIndex: 'brief',
      key: 'brief',
      editable: true,
    },
    {
      title: '培训人数',
      dataIndex: 'sum',
      key: 'sum',
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

      render: (text: string) => {
        switch (text){
          case 'T':return '审核中';
          case 'P':return '审核通过';
          case 'J':return '进行中';
          case 'W':return '已完成';
          case 'D':return '删除';
        }
      }

    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: Partial<TrainItem>) => {
        const editable = isEditing(record as TrainItem);
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
      case 'status':
        inputNode = <Select style={{width: 120}}>
          <option key={1} value={'T'}>{"审核中"}</option>
          <option key={2} value={'P'}>{"审核通过"}</option>
          <option key={3} value={'J'}>{"进行中"}</option>
          <option key={4} value={'W'}>{"已完成"}</option>
          <option key={5} value={'D'}>{"删除"}</option>
        </Select>
        break;
      default:
        inputNode = <Input name={""}/>;

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
      onCell: (record: TrainItem) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });



  const onFinish = (values: any) => {
    console.log(values)
    values.status="T";
    createTrain(values).then(res=>{
      setNewAMFlag(newAMFlag+1)
      console.log(res)
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h2>培训信息页</h2>
      <Form form={newForm} name="basic" layout={"inline"} onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
        <Form.Item rules={ [{required:true,}]} name="title">
          <Input placeholder={"培训名称"} style={{width: 80}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="brief">
          <Input placeholder={"培训简介"} style={{width: 120}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="sum">
          <InputNumber placeholder={"培训人数"} style={{width: 120}}/>
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

