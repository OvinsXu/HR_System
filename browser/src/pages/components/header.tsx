import React, {FC} from "react";
import {Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {useDispatch} from 'react-redux';
import {setIndex} from '../../store/features/homeSlice'
import {ProfileOutlined, ReconciliationOutlined, VerifiedOutlined,SettingOutlined} from "@ant-design/icons";

const App: FC = () => {
  const headerItems = [
    {
      key: `1`,
      icon: React.createElement(ProfileOutlined),
      label: `合同管理`,
    },
    {
      key: `2`,
      icon: React.createElement(VerifiedOutlined),
      label: `技能考核`,
    },
    {
      key: `3`,
      icon: React.createElement(ReconciliationOutlined),
      label: `考勤信息`,
    },

    {
      key: '4',
      icon: React.createElement(SettingOutlined),
      label: "其他"
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
