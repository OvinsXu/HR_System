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
import React, {FC, useEffect, useState} from "react";
import moment from 'moment';

import {EditableCellProps} from "../common";
import {getPostList} from "../../api/org";
import {getClockPageByTimeStatus, updateClock} from "../../api/attendance";
import {ClockItem} from "../../model/attendance";
import {getUserList} from "../../api/user";


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
    const [data, setData] = useState([] as Array<ClockItem>);
    const [postList, setPostList] = useState([] as any);
    const [userList, setClockList] = useState([] as any);
    const [status, setStatus] = useState<string>('A');
    const [hasNew, setHasNew] = useState(false);
    const [select, setSelect] = useState({year: moment().format("YYYY"), month: moment().format("M")});//选择的年月

    let months: Option[] = [];
    for (let i = 0; i < 12; i++) {
        const opt: Option = {
            value: i + 1,
            label: i + 1 + "月",
        }
        months.push(opt)
    }
    let casOpts: Option[] = [];//近五年的时间来作为选项
    for (let i = 0; i < 5; i++) {
        const opt: Option = {
            value: moment().subtract(i, 'y').format("YYYY"),
            label: moment().subtract(i, 'y').format("YYYY年"),
            children: months
        }
        casOpts.push(opt);
    }

    useEffect(() => {
        if (data.length > 0) {
            const uids = data.map((item: any) => item.uid)
            getUserList(uids).then((res: any[]) => {
                setClockList(res)
                const pids = res.map((item: any) => item.pid)
                getPostList(pids).then((res: any) => {
                    setPostList(res)
                })
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
            getClockPageByTimeStatus(param).then(res => {
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

    const isEditing = (record: ClockItem) => record.id === editingKey;

    const edit = (record: Partial<ClockItem>) => {
        form.setFieldsValue({...record});
        setEditingKey(record.id!);
    };

    const cancel = () => {
        setEditingKey(0);
    };

    const save = async (key: number) => {
        try {
            //验证格式
            const row = (await form.validateFields()) as ClockItem;
            //拷贝数据,用于操作
            const newData: any = [...data];
            //找到操作的列
            const index = newData.findIndex((item: ClockItem) => key === item.id);
            if (index > -1) {
                const item: ClockItem = newData[index];
                const newRow = {  //合并两个数组
                    ...item,
                    ...row,         //相同属性,以新的为准
                }

                if (newRow !== item) {//如果有变化
                    await updateClock(newRow).then(() => {
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
            title: '岗位',
            dataIndex: 'uid',
            key: 'pid',
            render: (item: any) => {
                const pid = userList.find((i: any) => i.id === item)?.pid;
                const post = postList.find((i: any) => i.id === pid)
                return post == null ? "" : post.name
            }
        },
        {
            title: '上班打卡',
            dataIndex: 'clockin',
            key: 'clockin',
            render: (item: any) => {
                return item ? moment(item).format("YYYY.MM.DD - HH:mm:ss") : ""
            }
        },
        {
            title: '下班打卡',
            dataIndex: 'clockout',
            key: 'clockout',
            render: (item: any) => {
                return item ? moment(item).format("YYYY.MM.DD - HH:mm:ss") : ""
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            editable: true,
            render: (text: any) => {
                switch (text) {
                    case "Y":
                        return "正常"
                    case "N":
                        return <div style={{color: 'red'}}>异常</div>
                    case "P":
                        return <p style={{color: 'green'}}>补卡</p>
                    case "L":
                        return <p style={{color: 'blue'}}>缺勤</p>
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_: any, record: Partial<ClockItem>) => {
                const editable = isEditing(record as ClockItem);
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
    const EditableCell: React.FC<EditableCellProps>
        = ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
        let inputNode;
        switch (dataIndex) {
            case 'status':
                inputNode = <Select options={[
                    {key: "N", label: "异常", value: "N"},
                    {key: "P", label: "补卡", value: "P"},
                    {key: "L", label: "缺勤", value: "L"},
                ]}></Select>
                break;
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
            onCell: (record: ClockItem) => ({
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
            case "exp":
                setStatus('E')
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
            <Row justify={'space-around'} style={{margin: 10}}>
                <Col>
                    <Cascader options={casOpts} onChange={selectOnChange} placeholder="请选择时间"/>
                </Col>
                <Col>
                    <h2>打卡信息页</h2>
                </Col>
                <Col>
                    <Radio.Group defaultValue={"all"} onChange={(e) => onClick(e.target.value)}>
                        <Radio.Button value="all">全部</Radio.Button>
                        <Radio.Button value="ok">正常</Radio.Button>
                        <Radio.Button value="exp">异常</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>


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

