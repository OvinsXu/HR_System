import {Button, Col, Form, Input, Pagination, PaginationProps, Popconfirm, Row, Select, Table, Typography} from "antd";
import React, {FC, useEffect, useState} from "react";
import "../system/System.module.css"
import {EditableCellProps, IPage} from "../common";
import {createDept, eraseDept, getDept, getDeptPage, getDeptPageByStatus, updateDept} from "../../api/org";
import {DeptItem} from "../../model/org";


const App: FC = () => {
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [dept, setDept] = useState([] as Array<DeptItem>);
  const [DeptItem, setDeptItem] = useState({} as DeptItem);
  const [status, setStatus] = useState('Y');
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    let param: IPage = {
      current: pageNumber,
      size: pageSize,
    };
    getDeptPage(param)
      .then(res => {
        setTotal(res.total)
        setData(res.records)
        setHasNew(false)
      })
  }, [pageNumber, pageSize, DeptItem,hasNew]);

  useEffect(() => {
    let param = {
      current: pageNumber,
      size: pageSize,
      status:status,
    };

    getDeptPageByStatus(param)
      .then(res => {
        setTotal(res.total)
        setData(res.records)
        setHasNew(false)
      })
  }, [pageNumber, pageSize, status,hasNew]);

  useEffect(() => {
    getDept().then((res) => {
      setDept(res)
    })
  }, [])

  const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(0);
  const isEditing = (record: DeptItem) => record.id === editingKey;

  const edit = (record: Partial<DeptItem>) => {
    form.setFieldsValue({...record});
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey(0);
  };
  const save = async (key: number) => {
    try {
      const row = (await form.validateFields()) as DeptItem;
      const newData: any = [...data];
      const index = newData.findIndex((item: DeptItem) => key === item.id);
      if (index > -1) {
        const item: DeptItem = newData[index];
        const newRow = {
          ...item,
          ...row,
        }

        if(newRow!==item){//如果有变化
          if(newRow.status==="D"){//如果是删除
            await eraseDept(newRow.id).then(()=>{
              setHasNew(true);
            });
          }else{
            await updateDept(newRow).then(()=>{
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
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      editable: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      editable: true,
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '所属部门',
      dataIndex: 'did',
      key: 'did',
      editable: true,

      render: (item: number) => {
        const tempd = dept.find((i) => i.id === item)
        return tempd != null ? tempd.name : "";
      }
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
      render: (_: any, record: Partial<DeptItem>) => {
        const editable = isEditing(record as DeptItem);
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
      case 'did':
        inputNode = <Select style={{width: 120}}>
          <option value={undefined}>{'无'}</option>
          {
            dept.map((item) =>
              <option key={item.id} value={item.id}>{item.name}</option>
            )
          }
        </Select>
        break;
      case 'status':
        inputNode = <Select style={{width: 120}}>
          <option key={1} value={'Y'}>{"启用"}</option>
          <option key={2} value={'N'}>{"停用"}</option>
          <option key={3} value={'D'}>{"删除"}</option>
        </Select>
        break;
      default:
        inputNode = <Input/>;
    }

    return (
      <td {...restProps}>

        {editing ? (
          <Form.Item name={dataIndex} style={{margin: 0}}>
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
      onCell: (record: DeptItem) => ({
        record,
        inputType: col.dataIndex === 'code' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  let tempDept = {status: 'Y'} as DeptItem;

  const btnAddOnClick = () => {
    createDept(tempDept).then((res) => {
      setDeptItem(tempDept)
    })
  }
  const btnStatusOnClick = (status: string) => {
    if (status.length===0) {
      setDeptItem(tempDept)
    } else {
      setStatus(status)
    }
  }

  return (
    <>
      <Form form={form} component={false}>
        <Row>
          <Col><Input onChange={(e) => {
            tempDept = {...tempDept, name: e.target.value};

          }} placeholder={"部门名称"} style={{width: 150}}/></Col>
          <Col>
            <Select onChange={(e) => {
              tempDept = {...tempDept, did: e};

            }} placeholder={"所属部门"} style={{width: 100}} options={
              dept.map((item) => {
                return {key: item.id, label: item.name, value: item.id}
              })}/>
          </Col>
          <Col><Button type={"primary"} onClick={btnAddOnClick}>新建</Button></Col>
          <Col offset={5}>
            <Button style={{width:120}} onClick={() => btnStatusOnClick("Y")}>仅查看已启用</Button>
            <Button style={{width:120}} onClick={() => btnStatusOnClick("N")}>仅查看已停用</Button>
          </Col>
        </Row>
        <Table components={{
          body: {
            cell: EditableCell,
          },
        }} size={'middle'} columns={mergedColumns} rowClassName="editable-row" dataSource={data} pagination={false} bordered/>
      </Form>
      <Pagination hideOnSinglePage showQuickJumper defaultCurrent={1} total={total} onChange={onChange}/>
    </>
  );
}
export default App;
