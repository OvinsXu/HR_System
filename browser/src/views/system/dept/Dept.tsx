import React, {FC, useEffect, useState} from "react";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Pagination,
  PaginationProps,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography
} from "antd";
import {getDept, getDeptPage} from "./deptApi";

import {IPage} from "../../common";
import DeptDetail from "./components/deptDetail";

import DeptAdd from "./components/deptAdd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {setDepts} from "./deptSlice";


const App: FC = () => {

  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);

  const {dept} = useSelector((state:RootState)=>state);
  const dispatch = useDispatch();


  useEffect(() => {
    getDept().then(res => {
      dispatch(setDepts(res.data))
    })
  }, [])

  useEffect(() => {
    let param: IPage = {
      current: pageNumber,
      size: pageSize,
    };

    getDeptPage(param)
      .then(res => {
        setTotal(res.total)
        setData(res.records)
      })
  }, [pageNumber, pageSize])

  const pagOnChange: PaginationProps['onChange'] = (pageNumber, pageSize) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };


  return (
    <>
      <h2 style={{marginTop: 10}}>部门管理</h2>

      <Row justify="space-evenly" style={{marginTop: 10}}>
        <Col span={5}>
          {data.length > 0 &&
              <DeptDetail color={"#bae637"} item={data[0]}/>
          }

        </Col>
        <Col span={5}>
          {data.length > 1 &&
              <DeptDetail color={"#ffd666"} item={data[1]}/>
          }
        </Col>
        <Col span={5}>
          {data.length > 2 &&
              <DeptDetail color={"#ffc069"} item={data[2]}/>
          }
        </Col>
      </Row>

      <Row justify="space-evenly" style={{paddingTop: 40}}>
        <Col span={5}>
          {data.length > 3 &&
              <DeptDetail color={"#5cdbd3"} item={data[3]}/>
          }
        </Col>
        <Col span={5}>
          {data.length > 4 &&
              <DeptDetail color={"#85a5ff"} item={data[4]}/>
          }
        </Col>
        <Col span={5}>
          {data.length > 5 &&
              <DeptDetail color={"#ffadd2"} item={data[5]}/>
          }
        </Col>
      </Row>

      <DeptAdd/>

      {data.length > 5 &&
          <Pagination pageSize={5} defaultCurrent={1} total={total} onChange={pagOnChange}/>
      }

    </>
  );
}

export default App;
