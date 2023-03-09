import React, {FC, useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {Content} from "antd/lib/layout/layout";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const App:FC=()=>{
  const { viewIndex } = useSelector((state:RootState) => state.home);
  const navigator = useNavigate();

  useEffect(()=>{
    switch (viewIndex) {
      // 顶部
      case '1': navigator("./agreement"); break;
      case '2': navigator("./skill"); break;
      case '3': navigator("./attendance"); break;
      case '4': navigator("./system"); break;

      //侧边
      case '11': navigator("./post/mgr"); break;
      case '12': navigator("./post/move"); break;

      case '21': navigator("./user/mgr"); break;
      case '22': navigator("./user/add"); break;

      case '31': navigator("./wage/bonustype"); break;
      case '32': navigator("./wage/bonus"); break;
      case '33': navigator("./wage/info"); break;
      case '34': navigator("./wage/add"); break;

      case '40':navigator("./train")
    }
  },[viewIndex])

  return (
    <>
      <Content style={{
        padding: '0 24px',
      }}>
        <Outlet/>

      </Content>
    </>
  );
}

export default App;
