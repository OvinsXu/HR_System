import {
  Button,
  Col,
  Drawer,
  Form,
  Input, InputNumber,
  Pagination,
  PaginationProps,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography
} from "antd";
import React, {FC, useEffect, useState} from "react";
import {eraseRecruit, getRecruitPage, updateRecruit} from "../../api/recruit";
import {RecruitItem} from "../../model/recruit";
import "../system/System.module.css"
import {EditableCellProps, IPage} from "../common";
import {getAllPost, getPostList} from "../../api/org";
import TextArea from "antd/es/input/TextArea";


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
    getRecruitPage(param)
      .then((res:any) => {
        setTotal(res.total)
        setData(res.records)
        setHasNew(false)
      })
  }, [pageNumber, pageSize, hasNew])

  useEffect(() => {
      getAllPost().then((res:any) => {
        setPostList(res.data)
      })
  }, [])

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };


  const isEditing = (record: RecruitItem) => record.id === editingKey;

  const edit = (record: Partial<RecruitItem>) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const save = async (key: number) => {
    try {
      //验证格式
      const row = (await form.validateFields()) as RecruitItem;
      //拷贝数据,用于操作
      const newData: any = [...data];
      //找到操作的列
      const index = newData.findIndex((item: RecruitItem) => key === item.id);
      if (index > -1) {
        const item: RecruitItem = newData[index];
        const newRow = {  //合并两个数组
          ...item,
          ...row,         //相同属性,以新的为准
        }

        if(newRow!==item){//如果有变化
            await updateRecruit(newRow).then(()=>{
              setHasNew(true);
            });
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
  const deleteRecruit = async (id:number)=>{
    await eraseRecruit(id).then(()=>{
      setHasNew(true);
    });
  }


  //列设置
  const columns = [
    {
      title: '岗位',
      dataIndex: 'pid',
      key: 'pid',
      editable: true,

      render: (item: any) => {
        if (item) {
          const post = postList.find((i: any) => i.id === item)
          return post == null ? "" : <a>{post.name}</a>
        } else {
          return '无';
        }
      }
    },
    {
      title: '工资',
      dataIndex: 'wage',
      key: 'wage',
      editable: true,

    },
    {
      title: '招聘人数',
      dataIndex: 'num',
      key: 'num',
      editable: true,
    },
    {
      title: '待遇详情',
      dataIndex: 'details',
      key: 'details',
      editable: true,
      render:(item:any)=>{
        return <div style={{textAlign:'left'}} dangerouslySetInnerHTML={{__html: item}}></div>
      }
    },
    {
      title: '工作要求',
      dataIndex: 'request',
      key: 'request',
      editable: true,
      render:(item:any)=>{
        return <div style={{textAlign:'left'}} dangerouslySetInnerHTML={{__html: item}}></div>
      }

    },
    {
      title: '工作内容',
      dataIndex: 'content',
      key: 'content',
      editable: true,
      render:(item:any)=>{
        return <div style={{textAlign:'left'}} dangerouslySetInnerHTML={{__html: item}}></div>
      }
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
      editable: true,
      render:(item:any)=>{
        return <div style={{textAlign:'left'}} dangerouslySetInnerHTML={{__html: item}}></div>
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: Partial<RecruitItem>) => {
        const editable = isEditing(record as RecruitItem);
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
            <Typography.Link disabled={editingKey !== 0} onClick={() => deleteRecruit(record.id!)}>
            删除
          </Typography.Link>
            <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
          </span>
        );
      },
    },

  ];

  const EditableCell: React.FC<EditableCellProps>
    = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
      let inputNode;

      switch (dataIndex) {
        case 'pid':
          inputNode = <Select style={{width: '120px'}}>
            {
              postList.map((item:any) =>
                  <option key={item.id} value={item.id}>{item.name}</option>
              )
            }
          </Select>
          break;
        case 'wage':
          inputNode = <Input style={{width: '80px'}}/>
          break;
        case 'num':
          inputNode = <InputNumber style={{width: '60px'}}/>
          break;
        case 'contact':
          inputNode = <TextArea rows={12} placeholder="不超出128字" maxLength={128} />;
          break;
        default:
          inputNode = <TextArea rows={12} placeholder="不超出256字" maxLength={256} />;
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
      onCell: (record: RecruitItem) => ({
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
