import {FC, useState} from "react";
import {Button, Col, Input, Row, Select} from "antd";
import {DeptItem} from "../deptModel";
import {createDept} from "../deptApi";

const App: FC = () => {

  const [item, setItem] = useState({} as DeptItem);
  // const [depts, setDepts] = useState([]);
  //
  // const {dept} = useSelector((state: RootState) => state);
  const options = [
    {key: '1', label: "A"}, {key: '2', label: "B"},
  ]
  // useEffect(() => {
  //
  // }, []);


  const btnOnClick = () => {
    createDept(item).then((res) => {
      console.log(res)
    })
  }
  return (
    <>
      <Row align="middle" style={{
        backgroundColor: '#5cdbd3',
        height: 40,
        marginInline: 100,
        opacity: 0.8,
        borderRadius: 10,
        marginTop: 20
      }}>

        <Col span={2}>名称: </Col>
        <Col span={3}><Input onChange={(v) => {
          setItem({...item, name: v.target.value})
        }}/></Col>


        <Col span={2}>父级部门: </Col>
        <Col span={3}><Input onChange={(v) => {
          setItem({...item, did: parseInt(v.target.value)})
        }}/></Col>


        <Col span={2}>部门主任: </Col>
        {/*<Col span={3}><Input onChange={(v) => {*/}
        {/*  setItem({...item, uid: parseInt(v.target.value)})*/}
        {/*}}/></Col>*/}
        <Select defaultValue="boss" style={{width: 120}} allowClear options={options}>

        </Select>


        <Col span={2}>状态: </Col>
        <Col span={3}><Input onChange={(v) => {
          setItem({...item, status: v.target.value})
        }}/></Col>

        <Col span={4}>
          <Button type={"primary"} danger onClick={btnOnClick}>新建</Button>
        </Col>


      </Row>
    </>
  );
}

export default App;
