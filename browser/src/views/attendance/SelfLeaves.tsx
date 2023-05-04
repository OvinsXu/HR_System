import {
    Cascader,
    Col,
    Form,
    Pagination,
    PaginationProps,
    Popconfirm,
    Radio,
    Row,
    Select,
    Table,
    Typography,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import moment from 'moment';

import { EditableCellProps } from "../common";
import { getLeavesAllType, getLeavesPageByStatus, updateLeaves } from "../../api/attendance";
import { LeavesItem } from "../../model/attendance";
import { getUserList } from "../../api/user";
import MonthSelect from "../../components/MonthSelect";


interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

const App: FC = () => {
    const [form] = Form.useForm();
    const [total, setTotal] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState([] as Array<LeavesItem>);
    const [leavesType, setLeavesTypeList] = useState([] as any);
    const [userList, setUserList] = useState([] as any);
    const [status, setStatus] = useState<string>('A');
    const [hasNew, setHasNew] = useState(false);
    const [select, setSelect] = useState({ year: moment().format("YYYY"), month: moment().format("M") });//选择的年月

    useEffect(() => {
        getLeavesAllType().then((res: any[]) => {
            setLeavesTypeList(res)
        });

    }, [])
    useEffect(() => {
        if (data.length > 0) {
            const uids = data.map((item: any) => item.uid)
            getUserList(uids).then((res: any[]) => {
                setUserList(res)
            });
        }
    }, [data])

    useEffect(() => {
        if (select.month) {
            let param: any = {
                current: pageNumber,
                size: pageSize,
                status: status,
                year: select.year,
                month: select.month,
            };
            getLeavesPageByStatus(param).then((res: any) => {
                setTotal(res.total)
                setData(res.records)
                setHasNew(false)
            })
        }
    }, [status, select, pageNumber, pageSize, hasNew]);

    const onChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
        setPageNumber(pageNumber);
        setPageSize(pageSize);
    };

    const [editingKey, setEditingKey] = useState(0);

    const isEditing = (record: LeavesItem) => record.id === editingKey;

    const edit = (record: Partial<LeavesItem>) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id!);
    };

    const cancel = () => {
        setEditingKey(0);
    };

    const save = async (key: number) => {
        try {
            //验证格式
            const row = (await form.validateFields()) as LeavesItem;
            //拷贝数据,用于操作
            const newData: any = [...data];
            //找到操作的列
            const index = newData.findIndex((item: LeavesItem) => key === item.id);
            if (index > -1) {
                const item: LeavesItem = newData[index];
                const newRow = {  //合并两个数组
                    ...item,
                    ...row,         //相同属性,以新的为准
                }

                if (newRow !== item) {//如果有变化
                    await updateLeaves(newRow).then(() => {
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

    //列设置
    const columns = [
        {
            title: '用户',
            dataIndex: 'uid',
            key: 'uid',
            render: (item: any) => {
                const user = userList.find((i: any) => i.id === item)
                return user == null ? "" : user.truename
            }
        },
        {
            title: '类型',
            dataIndex: 'hid',
            key: 'hid',
            render: (item: any) => {
                const lt = leavesType.find((i: any) => i.id === item)
                return lt == null ? "" : lt.name
            }
        },
        {
            title: '开始时间',
            dataIndex: 'beginDate',
            key: 'beginDate',
            render: (item: any) => {
                return item ? <><p>{moment(item).format("YYYY.MM.DD")}</p><p>{moment(item).format("HH:mm:ss")}</p></> : ""
            }
        },
        {
            title: '结束时间',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (item: any) => {
                return item ? <><p>{moment(item).format("YYYY.MM.DD")}</p><p>{moment(item).format("HH:mm:ss")}</p></> : ""
            }
        },
        {
            title: '详细情况',
            dataIndex: 'details',
            key: 'details',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            editable: true,
            render: (text: any) => {
                switch (text) {
                    case "P":
                        return "审核中"
                    case "R":
                        return <p style={{ color: 'red' }}>拒绝</p>
                    case "Y":
                        return <p style={{ color: 'green' }}>通过(带薪)</p>
                    case "N":
                        return <p style={{ color: 'blue' }}>通过(无薪)</p>
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_: any, record: Partial<LeavesItem>) => {
                const editable = isEditing(record as LeavesItem);
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
                case 'status':
                    inputNode = <Select options={[
                        { key: "Y", label: "通过(带薪)", value: "Y" },
                        { key: "N", label: "通过(无薪)", value: "N" },
                        { key: "R", label: "拒绝", value: "R" },
                        { key: "P", label: "审核中", value: "P" },
                    ]}></Select>
                    break;
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
            onCell: (record: LeavesItem) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const onClick = (opt: String) => {
        switch (opt) {
            case "all":
                setStatus("A")
                break;
            case "ok":
                setStatus('Y')
                break;
            case "re":
                setStatus('R')
                break;
            case "pend":
                setStatus('P')
                break;
        }
    }
    const selectOnChange = (value: any) => {
        setSelect({
            year: value[0],
            month: value[1]
        })
    };

    return (
        <>
            <Row justify={'space-around'} style={{ margin: 10 }}>
                <Col>
                    <MonthSelect selectOnChange={selectOnChange} />
                </Col>
                <Col>
                    <h2>请假管理页</h2>
                </Col>
                <Col>
                    <Radio.Group defaultValue={"all"} onChange={(e) => onClick(e.target.value)}>
                        <Radio.Button value="all">全部</Radio.Button>
                        <Radio.Button value="pend">待审核</Radio.Button>
                        <Radio.Button value="ok">通过</Radio.Button>
                        <Radio.Button value="no">拒绝</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>


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

