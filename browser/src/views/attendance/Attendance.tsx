import React, {FC, useEffect, useState} from "react";
import {Cascader, Form, Pagination, PaginationProps, Table} from "antd";
import {getAttendancePageByTime, getAttendanceTime} from "../../api/attendance";
import {getUserList} from "../../api/user";
import moment from "moment";
import MonthSelect from "../../components/MonthSelect";

const App: FC = () => {
  const [select, setSelect] = useState({year: moment().format("YYYY"), month: moment().format("M")});//选择的年月
  const [data, setData] = useState([] as any);//时间数据
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userList, setUserList] = useState([] as any);

  useEffect(() => {
    let param: any = {
      current: pageNumber,
      size: pageSize,
      year: select.year,
      month: select.month,
    };
    getAttendancePageByTime(param).then(res => {
      setTotal(res.total)
      setData(res.records)
    })

  }, [select, pageNumber, pageSize]);
  useEffect(() => {
    if (data.length > 0) {
      const uids = data.map((item: any) => item.uid)
      getUserList(uids).then(res => {
        setUserList(res)
      });
    }
  }, [data])

  const selectOnChange = (value: any) => {
    setSelect({
      year: value[0],
      month: value[1]
    })
  };
  const pageOnChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: '工号',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: '姓名',
      dataIndex: 'uid',
      key: 'uid',
      render: (item: any) => {
        const user = userList.find((i: any) => i.id == item)
        return user == null ? "" : user.truename
      }
    },
    {
      title: '请假天数',
      dataIndex: 'leaves',
      key: 'leaves',
    },
    {
      title: '带薪天数',
      dataIndex: 'holiday',
      key: 'holiday',
    },
  ];

  return (
    <>
      <h2 style={{ paddingTop: 10 }}>查看考勤情况表 :<MonthSelect selectOnChange={selectOnChange}/></h2>
      <Table dataSource={data} columns={columns} pagination={false} />
      <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={pageOnChange} />
    </>
  );
}

export default App;
