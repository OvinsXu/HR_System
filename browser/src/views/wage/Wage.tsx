import React, { FC, useEffect, useState } from "react";
import { Button, Cascader, Col, Form, Input, Pagination, PaginationProps, Row, Table } from "antd";
import { exportWage, generateWage, getWagePageByTime } from "../../api/wage";
import moment from "moment";

import MonthSelect from "../../components/MonthSelect";


const App: FC = () => {
  const [select, setSelect] = useState({ year: moment().format("YYYY"), month: moment().format("M") });//选择的年月
  const [data, setData] = useState([] as any);//时间数据
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [days, setDays] = useState(23);//月应上班天数
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    let param: any = {
      current: pageNumber,
      size: pageSize,
      year: select.year,
      month: select.month,
    };
    console.log(select);
    getWagePageByTime(param).then((res: any) => {
      setTotal(res.total)
      setData(res.records)
      setHasNew(false)
    });
  }, [hasNew, select, pageNumber, pageSize]);


  const pageOnChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  const columns = [
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
      title: '薪水天数',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: '工资(已交社保)',
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


  const selectOnChange = (value: any) => {
    setSelect({
      year: value[0],
      month: value[1]
    })
  };


  const OnClick = () => {
    let param: any = {
      year: Number(select.year),
      month: Number(select.month),
      days,
    };
    generateWage(param).then((res: any) => {
      setHasNew(true)
    });
  }
  //下载文件
  const download = (data: any) => {
    if (!data) {
      return
    }
    var blob = new Blob([data], { type: 'application/xlsx;charset=utf-8' })
    var url = window.URL.createObjectURL(blob);
    var aLink = document.createElement("a");
    aLink.style.display = "none";
    aLink.href = url;
    aLink.setAttribute("download", select.year+"-"+select.month+".xlsx");
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink); //下载完成移除元素
    window.URL.revokeObjectURL(url); //释放掉blob对象
  }

  const OnExport = () => {
    let param: any = {
      year: Number(select.year),
      month: Number(select.month),
    };
    exportWage(param).then((res: any) => {
      download(res)
      setHasNew(true)
    });
    //window.open("/wage/export?year="+select.year+"&month="+select.month)
  }

  return (
    <>
      <h2 style={{ paddingTop: 10 }}>工资表预览审核</h2>

      <Row justify={'space-between'}>
        <Col>
          <MonthSelect selectOnChange={selectOnChange} />
          应上班天数 : <Input type={'number'} onChange={(e) => setDays(Number(e.target.value))} defaultValue={days} style={{ width: '100px', margin: '10px' }} />
          <Button type={"primary"} onClick={OnClick}>生成工资表</Button>
        </Col>
        <Col>
          <Button type={"primary"} onClick={OnExport} danger>导出数据</Button>
        </Col>
      </Row>

      <Table dataSource={data} columns={columns} pagination={false} />
      <Pagination showQuickJumper defaultCurrent={1} total={total} onChange={pageOnChange} />

    </>
  );
}

export default App;
