import React, {FC, useEffect, useState} from "react";
import {Button, Col, Drawer, Row} from "antd";
import RecruitInfo from "../../components/RecruitInfo";
import {getAllRecruit} from "../../api/recruit";
import {RecruitItem} from "../../model/recruit";
import {PlusOutlined, SlidersOutlined} from "@ant-design/icons";
import RecruitAdd from "./RecruitAdd";
import RecruitMgr from "./RecruitMgr";

const App:FC=()=>{
    const [data,setData] = useState<Array<RecruitItem>>([]);
    const [hasNew, setHasNew] = useState(false);

    useEffect(() => {
        getAllRecruit().then((res: any) => {
            setData(res.data)
        });
        setHasNew(false);
    }, [hasNew]);

    const [open, setOpen] = useState('');

    const showDrawer = (who:string) => {
        setOpen(who);
    };
    const onClose = () => {
        setOpen('');
    };

  return (
    <>
        <Row justify="space-around" style={{ margin: 10 }}>
            <Col>
                <Button type={"primary"} onClick={()=>showDrawer('new')} icon={<PlusOutlined />}>新建</Button>
            </Col>
            <Col>
                <h2>招聘信息</h2>
            </Col>
            <Col>
                <Button type={"primary"} onClick={()=>showDrawer('mgr')} icon={<SlidersOutlined />}>管理</Button>
            </Col>
        </Row>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around'}}>
          {
            data.map((item:RecruitItem)=>{
                return <RecruitInfo data={item}/>
            })
          }
        </div>
        <Drawer
            title="新建招聘"
            width={720}
            onClose={() => setOpen('')}
            open={open=='new'}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <RecruitAdd onClose={onClose} setHasNew={setHasNew} />
        </Drawer>
        <Drawer
            title="招聘信息管理"
            height={720}
            placement={'bottom'}
            onClose={() => setOpen('')}
            open={open=='mgr'}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <RecruitMgr/>
        </Drawer>
    </>
  );
}

export default App;
