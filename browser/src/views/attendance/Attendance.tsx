import React, {FC, useEffect, useState} from "react";
import {Button, Cascader, Form, InputNumber, Pagination, PaginationProps, Select, Table} from "antd";
import {getAttendancePageByTime, getAttendanceTime} from "../../api/attendance";
import {AttendanceItem} from "./model";
import {IPage} from "../common";
import {getUserList} from "../../api/user";
import {getBonusTypeList} from "../../api/bounstype";

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const App: FC = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState([] as any);
  const [options, setOptions] = useState([] as Option[]);//年份-月份
  const [select, setSelect] = useState([] as any);//选择的年月
  const [data, setData] = useState([] as any);//时间数据

  //用于分页
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const [userList,setUserList] = useState([] as any);


  useEffect(() => {
    getAttendanceTime().then(res => {
      const options = res.map((i: AttendanceItem) => {
        return {year: i.year, month: i.month}
      })
      setTime(options)
    })
  }, []);

  useEffect(() => {
    //取年份列表
    const y: number[] = Array.from(new Set(time.map((i: any) => i.year)));
    //拼装连级选项
    const op: Option[] = y.map(i=>{
      //取年份的月份子选项
      const children:Option[] = time.map((it: any)=>{
        if (it.year==i){
          return {
            value: it.month,
            label: it.month+'月',
          }
        }
      })
      return {
        value:i,
        label:i+'年',
        children,
      }
    })
    setOptions(op)
  }, [time])

  useEffect(() => {
    if (select.month){
      let param: any = {
        current: pageNumber,
        size: pageSize,
        year:select.year,
        month:select.month,
      };
      getAttendancePageByTime(param).then(res => {
        setTotal(res.total)
        setData(res.records)
      })
    }
  }, [select,pageNumber, pageSize]);
  useEffect(()=>{
    if (data.length>0){

      const uids = data.map((item:any)=>item.uid)
      getUserList(uids).then(res=>{

        setUserList(res)
      });
    }
  },[data])

  const selectOnChange = (value: any) => {
    //console.log(value);
    setSelect({
      year:Number(value[0]),
      month:Number(value[1])
    })
  };
  const pageOnChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: '用户编号',
      dataIndex: 'uid',
      key: 'uid',
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
      title: '缺勤天数',
      dataIndex: 'absence',
      key: 'absence',
    },
    {
      title: '请假天数',
      dataIndex: 'leaves',
      key: 'leaves',
    },
  ];



  return (
    <>
      <h2 style={{paddingTop: 10}}>查看考勤情况表 :
        <Cascader options={options} style={{paddingLeft:10}} onChange={selectOnChange} placeholder="请选择月份"/>
      </h2>
      <Table dataSource={data} columns={columns} pagination={false}/>



      <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={pageOnChange}/>


    </>
  );
}

export default App;
