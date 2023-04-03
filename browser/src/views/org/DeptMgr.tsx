import {Button, Col, Form, Input, Pagination, PaginationProps, Popconfirm, Row, Select, Table, Typography} from "antd";
import React, {FC, useEffect, useMemo, useState} from "react";
import "../system/System.module.css"
import {EditableCellProps, IPage} from "../common";
import {createDept, eraseDept, getDeptPage, updateDept} from "../../api/org";
import {DeptItem} from "../../model/org";
import {getUserList, getUserListLike} from "../../api/user";
import {UserItem} from "../../model/user";
// @ts-ignore
import debounce from 'lodash/debounce';


const App: FC = () => {
    const [total, setTotal] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [data, setData] = useState([] as Array<DeptItem>); //表格当前分页数据

    const [newDept, setNewDept] = useState({status: 'Y'} as DeptItem); //新建部门

    const [mgrUser, setMgrUser] = useState([] as Array<UserItem>);//当前页需要的部门主管信息

    const [searchUserList, setSearchUserList] = useState([] as Array<UserItem>);//搜索用户列表

    const [hasNew, setHasNew] = useState(false); //刷新数据


    useEffect(() => {
        let param: IPage = {
            current: pageNumber,
            size: pageSize,
        };
        getDeptPage(param).then(res => {
            //获得所有的部门主管的id
            const mgrList = res.records.map((item: DeptItem) => item.uid);
            if (mgrList.length > 0) {
                //通过部门主管门的id找信息
                getUserList(mgrList).then((res: any) => {
                    setMgrUser(res)//用于显示
                    setSearchUserList(res)//用户搜索框默认选项
                })
            }
            setData(res.records)
            setTotal(res.total)
        });
        setHasNew(false)
    }, [pageNumber, pageSize, hasNew]);

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

                if (newRow !== item) {//如果有变化
                    if (newRow.status === "D") {//如果是删除
                        await eraseDept(newRow.id).then(() => {
                            setHasNew(true);
                        });
                    } else {
                        await updateDept(newRow).then(() => {
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
            title: '部门主管',
            dataIndex: 'uid',
            key: 'uid',
            align: 'center',
            editable: true,
            render: (item: number) => {
                const tempd = mgrUser.find((i) => i.id === item)
                return tempd != null ? tempd.truename : "";
            }
        },
        {
            title: '所属部门',
            dataIndex: 'did',
            key: 'did',
            align: 'center',
            editable: true,
            render: (item: number) => {
                const tempd = data.find((i) => i.id === item)
                return tempd != null ? tempd.name : "";
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            editable: true,
            render: (text: string) => text === 'Y' ? "启用" : text === 'N' ? "停用" : "删除",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            align: 'center',
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
                inputNode =
                    <Select style={{width: 120}} showSearch placeholder="姓名搜索"
                            onSearch={debounceFetcher}
                            defaultOpen={openSelect}
                            onSelect={() => {
                                setOpenSelect(false);
                            }}
                            options={
                                searchUserList.map((item) => {
                                    return {key: item.id, value: item.id, label: item.truename}
                                })}>
                    </Select>
                break;
            case 'did':
                inputNode = <Select style={{width: 120}}>
                    <option value={undefined}>{'无'}</option>
                    {
                        data.map((item) => {
                            if (item.id !== record.id && item.did !== record.id) {//父级部门不能是自己,也不能是子部门
                                return <option key={item.id} value={item.id}>{item.name}</option>
                            }
                        })
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
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


    const btnAddOnClick = () => {
        createDept(newDept).then((res) => {
            setNewDept({status:'Y'} as DeptItem)
            setHasNew(true)
        })
    }


    return (
        <>
            <Form form={form} component={false}>
                <Row>
                    <Col><Input onChange={(e) => {
                        setNewDept({...newDept, name: e.target.value});

                    }} placeholder={"部门名称"} style={{width: 150}}/></Col>
                    <Col>
                        <Select onChange={(e) => {
                            setNewDept({...newDept, did: e});

                        }} placeholder={"所属部门"} style={{width: 100}}>
                            <option value={undefined}>{'无'}</option>
                            {
                                data.map((item) => {
                                    return <option key={item.id} label={item.name} value={item.id}>{item.name}</option>
                                })
                            }
                        </Select>
                    </Col>
                    <Col>
                        <Select style={{width: 120}} showSearch placeholder="部门主管"
                                onSearch={debounceFetcher}
                                defaultOpen={openSelect}
                                onSelect={(e) => {
                                    setNewDept({...newDept, uid: e});
                                    setOpenSelect(false);
                                }}
                                options={
                                    searchUserList.map((item) => {
                                            return {key: item.id, value: item.id, label: item.truename}
                                        }
                                    )}>
                        </Select>
                    </Col>
                    <Col><Button type={"primary"} onClick={btnAddOnClick}>新建</Button></Col>

                </Row>
                <Table components={{
                    body: {
                        cell: EditableCell,
                    },
                }} size={'middle'} columns={mergedColumns} rowClassName="editable-row" dataSource={data}
                       pagination={false}
                       bordered/>
            </Form>
            <Pagination hideOnSinglePage showQuickJumper defaultCurrent={1} total={total} onChange={onChange}/>
        </>
    );
}
export default App;
