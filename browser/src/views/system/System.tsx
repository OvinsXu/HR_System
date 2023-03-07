import {FC} from "react";
import {Col, Row} from "antd";

import styles from "./System.module.css"
import {To, useNavigate} from "react-router-dom";

const App: FC = () => {
  const navigator = useNavigate();

  const btnOnClick = (to: To) => {
    navigator(to)
  }
    return (
    <>
      <Row justify="space-evenly" style={{paddingTop: 40}}>
        <Col span={5}>
          <div className={styles.divBtn}  onClick={()=>btnOnClick("config")} style={{backgroundColor: "#bae637"}}>
            <h2>系统设置</h2>
          </div>
        </Col>
        <Col span={5}>
          <div className={styles.divBtn}  onClick={()=>btnOnClick("department")} style={{backgroundColor: "#36cfc9"}}>
            <h2>登录日志</h2>
          </div>
        </Col>
        <Col span={5}>
          <div className={styles.divBtn}  onClick={()=>btnOnClick("department")} style={{backgroundColor: "#69c0ff"}}>
            <h2>操作日志</h2>
          </div>
        </Col>
      </Row>

      <Row justify="space-evenly" style={{paddingTop: 40}}>
        <Col span={5}>
          <div className={styles.divBtn}  onClick={()=>btnOnClick("department")} style={{backgroundColor: "#ff85c0"}}>
            <h2>部门管理</h2>
          </div>
        </Col>
        <Col span={5}>
          <div className={styles.divBtn}  onClick={()=>btnOnClick("department")} style={{backgroundColor: "#ffa940"}}>
            <h2>权限管理</h2>
          </div>
        </Col>
        <Col span={5}>
          <div className={styles.divBtn}  onClick={()=>btnOnClick("department")} style={{backgroundColor: "#ff7875"}}>
            <h2>文件系统</h2>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default App;
