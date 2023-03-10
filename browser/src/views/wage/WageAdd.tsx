import React, {FC, useEffect, useState} from "react";
import {Button, Cascader, Form, InputNumber, Pagination, PaginationProps, Select, Table} from "antd";
import {getWagePageByTime, getWageTime} from "../../api/wage";
import {WageItem} from "./model";
import {IPage} from "../common";
import {getAgreement, getAgreementList} from "../../api/agreement";

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

  const [canEdit,setCanEdit] = useState(false)

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
        if (res.total>0){//该月份已经有工资表了
          setCanEdit(false)
          setTotal(res.total)
          setData(res.records)
        }else{//该月份工资表还没生成
          setCanEdit(true)
          getAgreementList().then(res=>{
            console.log(res)
          })
        }
      });


    }
  }, [select,pageNumber, pageSize]);


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
      dataIndex: 'id_card',
      key: 'id_card',
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
      dataIndex: 'pre_tax',
      key: 'pre_tax',
    },
    {
      title: '税后总金额',
      dataIndex: 'post_tax',
      key: 'post_tax',
    },
    {
      title: '奖金详情',
      dataIndex: 'bonusDetail',
      key: 'bonusDetail',
    },
  ];
  const onFinish = (item:any) => {
    setSelect(item)
    //console.log(item)
  }
  const onFinishFailed = () => {

  }



  return (
    <>







      <h2 style={{paddingTop:10}}>工资表预览审核</h2>

      <Form form={form} name="basic" layout={"inline"} onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
        <Form.Item rules={ [{required:true,}]} name="year">
          <InputNumber placeholder={"年份"} style={{width: 80}}/>
        </Form.Item>
        <Form.Item rules={ [{required:true,}]} name="month">
          <InputNumber placeholder={"月份"} style={{width: 80}}/>
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType="submit">预览</Button>
        </Form.Item>
        <Button type={"primary"} danger disabled={!canEdit}>确定无误</Button>
      </Form>

      <Table dataSource={data} columns={columns} pagination={false}/>
      <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={pageOnChange}/>

    </>
  );
}

export default App;
