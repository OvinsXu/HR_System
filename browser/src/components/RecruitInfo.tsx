import {FC,useState,useEffect} from "react";
import {Col, Divider, Row} from "antd";
import {RecruitItem} from "../model/recruit";
import {getPostbyID} from "../api/org";

const App: FC<{ data: RecruitItem }> = (props) => {
    const data = props.data;
    const [postName,setPostName] = useState("");
    useEffect(()=>{
      getPostbyID(data.pid).then((res:any)=>{
        console.log(res)
        setPostName(res.name)
      })
    },[]);
    return (
        <div style={{display:'block',width: '480px',margin:'10px',padding:'0px 10px', border: 'solid 3px gray'}}>
            <Divider><a>{postName}</a> --- 工资({data.wage}) --- 招聘人数({data.num}名)</Divider>
            <Divider>待遇详情</Divider>
            <div style={{textAlign:'left'}} dangerouslySetInnerHTML={{__html: data.details}}></div>
            <Divider>工作要求</Divider>
            <div style={{textAlign:'left'}} dangerouslySetInnerHTML={{__html: data.request}}></div>
            <Divider>工作内容</Divider>
            <div style={{textAlign:'left'}} dangerouslySetInnerHTML={{__html: data.content}}></div>
            <Divider>联系方式</Divider>
            <div style={{textAlign:'left',margin:'5px'}} dangerouslySetInnerHTML={{__html: data.contact}}></div>
        </div>
    );
}

export default App;

