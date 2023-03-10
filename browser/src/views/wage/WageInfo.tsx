import React, {FC, useEffect, useState} from "react";
import {Button, Cascader, Form, InputNumber, Pagination, PaginationProps, Select, Table} from "antd";
import {getWagePageByTime, getWageTime} from "../../api/wage";
import {WageItem} from "./model";
import {IPage} from "../common";

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


  useEffect(() => {
    getWageTime().then(res => {
      const options = res.map((i: WageItem) => {
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
      getWagePageByTime(param).then(res => {
        setTotal(res.total)
        setData(res.records)
      })
    }
  }, [select,pageNumber, pageSize]);

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
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '姓名',
      dataIndex: 'truename',
      key: 'truename',
    },
    {
      title: '身份证卡号',
      dataIndex: 'idCard',
      key: 'idCard',
    },
    {
      title: '基本工资',
      dataIndex: 'base',
      key: 'base',
    },
    {
      title: '奖金',
      dataIndex: 'bonus',
      key: 'bonus',
    },
    {
      title: '税前总金额',
      dataIndex: 'preTax',
      key: 'preTax',
    },
    {
      title: '税后总金额',
      dataIndex: 'postTax',
      key: 'postTax',
    },
    {
      title: '奖金详情',
      dataIndex: 'bonusDetail',
      key: 'bonusDetail',
    },
  ];



  return (
    <>
      <h2 style={{paddingTop: 10}}>查看历史工资表 :
        <Cascader options={options} style={{paddingLeft:10}} onChange={selectOnChange} placeholder="请选择月份"/>
      </h2>
      <Table dataSource={data} columns={columns} pagination={false}/>



      <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={pageOnChange}/>


    </>
  );
}

export default App;
