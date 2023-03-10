import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Pagination,
  PaginationProps,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography
} from "antd";
import React, {FC, useEffect, useState} from "react";


import moment from "moment";
import {IPage} from "../common";
import {getPostbyID, getPostList} from "../../api/post";

import {EditableCellProps} from "../common";

import {getUserList} from "../../api/user";
import {getSkillPage, updateSkill} from "../../api/skill";
import { SkillItem } from "./model";





const App: FC = () => {

  //响应式
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [postList,setPostList] = useState([] as any);
  const [userList,setUserList] = useState([] as any);

  const [pList,setPList] = useState([] as any);//原工作岗位
  const [uList,setUList] = useState([] as any);//受理人


  useEffect(() => {
    let param: IPage = {
      current: pageNumber,
      size: pageSize,
    };
    getSkillPage(param)
      .then(res => {
        console.log("res")
        console.log(res)
        setTotal(res.total)
        setData(res.records)
      })
  }, [pageNumber, pageSize])

  useEffect(()=>{
    if (data.length>0){

      const uids = data.map((item:any)=>item.uid)
      getUserList(uids).then(res=>{

        setUserList(res)
      });
    }
  },[data])
  useEffect(()=>{
    if (data.length>0){
      const pids = data.map((item:any)=>item.pid)

      const opids = userList.map((item:any)=>item.pid)
      //console.log("opids")
      //console.log([...pids, ...opids])

      getPostList([...pids, ...opids]).then(res=>{

        setPostList(res)
      });

    }
  },[userList])


  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(0);
  const isEditing = (record: SkillItem) => record.id === editingKey;

  const edit = (record: Partial<SkillItem>) => {
    form.setFieldsValue({...record});
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as SkillItem;
      console.log(row);
      //拷贝新数据
      const newData: any = [...data];
      const index = newData.findIndex((item: SkillItem) => key === item.id);
      if (index > -1) {
        const item: SkillItem = newData[index];
        //console.log(item);
        const newRow = {
          ...item,
          ...row,
        }
        //newRow.roleId = roles.find()
        updateSkill(newRow);
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
      //editable: true,

      render: (item:any) => {
        const user = userList.find((i:any) => i.id==item)
        return user==null?"":user.truename
      }
    },
    {
      title: '证书名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      key: 'beginTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '受理状态',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      render:(item:string)=>item =='Y'?"审核通过":(item =="N"?"待审核":"驳回")
    },

    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: Partial<SkillItem>) => {
        const editable = isEditing(record as SkillItem);
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
        inputNode = <Select options={[{key:'Y',label:"通过",value:"Y"},{key:'N',label:"待审核",value:"N"},{key:'R',label:"驳回",value:"R"}]}></Select>
        break;

      default:
        inputNode = <Input/>;

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
      onCell: (record: SkillItem) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <h2>员工信息页</h2>
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

