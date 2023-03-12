import {FC, useEffect, useState} from "react";
import {DeptItem} from "../deptModel";
import {Button, Col, Input, Row} from "antd";
import {getUser} from "../../../api/user";

interface propType {
  item: DeptItem;
  color: string;

}

const App: FC<propType> = (props) => {
  const {item, color} = props;
  const [name,setName] = useState("");

  useEffect(()=>{
    getUser(item.uid).then((res)=>{
      console.log(res)
      setName(res.data.username)
    })
  },[])

  return (
    <>
      <div style={{backgroundColor: color, height: 240, width: 300, opacity: 0.7, borderRadius: 30}}>
        <Row align="middle" style={{paddingTop: 5}}>
          <Col span={8}>名称: </Col>
          <Col span={12}><Input value={item.name}/></Col>
        </Row>
        <Row align="middle" style={{paddingTop: 5}}>
          <Col span={8}>父级部门: </Col>
          <Col span={12}><Input value={item.did}/></Col>
        </Row>
        <Row align="middle" style={{paddingTop: 5}}>
          <Col span={8}>部门主任: </Col>
          <Col span={12}><Input placeholder="Basic usage" value={name}/></Col>
        </Row>
        {/*<Row align="middle" style={{paddingTop: 5}}>*/}
        {/*  <Col span={8}>状态: </Col>*/}
        {/*  <Col span={12}><Input placeholder="Basic usage" value={item.status}/></Col>*/}
        {/*</Row>*/}
        <Row align="middle" style={{paddingTop: 5}}>
          <Col span={8}>创建时间: </Col>
          <Col span={12}><Input placeholder="Basic usage" value={item.createTime.valueOf()}/></Col>
        </Row>
        <Row align="middle" style={{paddingTop: 5}}>
          <Col span={8}>更改时间: </Col>
          <Col span={12}><Input placeholder="Basic usage" value={item.updateTime.valueOf()}/></Col>
        </Row>

        <Row style={{padding: 10,}}>
          <Col span={8}>
            {item.status === 'Y' ?
              <Button type={"primary"} danger>停用</Button> :
              <Button type={"primary"}>启用</Button>
            }
          </Col>
          <Col span={8}>
            <Button type={"primary"}>更改</Button>
          </Col>
          <Col span={8}>
            <Button type={"primary"} danger>删除</Button>
          </Col>
        </Row>


      </div>

    </>
  );
}

export default App;
