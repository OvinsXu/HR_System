import React, {FC} from "react";
import {Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {useDispatch} from 'react-redux';
import {setIndex} from '../../store/features/homeSlice'
import {ProfileOutlined, ReconciliationOutlined, VerifiedOutlined,SettingOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

const App: FC = () => {
  const headerItems = [
    {
      key: `1`,
      icon: React.createElement(ProfileOutlined),
      label: (
        <Link to={"agreement"}>合同管理</Link>
      ),
    },
    {
      key: `2`,
      icon: React.createElement(VerifiedOutlined),
      label: (
        <Link to={"skill"}>技能考核</Link>
      ),
    },
    {
      key: `3`,
      icon: React.createElement(ReconciliationOutlined),
      label: (
        <Link to={"attendance"}>考勤信息</Link>
      )
    },

    {
      key: '4',
      icon: React.createElement(SettingOutlined),
      label: (
        <Link to={"system"}>系统</Link>
      )
    },
  ];

  const dispatch = useDispatch();
  const itemOnClick = (item: any) => {
    dispatch(setIndex({index: item.key}))
  };
  return (
    <>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" items={headerItems}
              onClick={itemOnClick}
        />
      </Header>
    </>
  );
}

export default App;
