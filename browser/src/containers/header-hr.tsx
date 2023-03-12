import React, {FC} from "react";
import {Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {hrItems,userItems} from "./header-items";

const App: FC = () => {
  const userrole = JSON.parse(sessionStorage.getItem("userrole")+"");
  const headerItems = userrole.includes("hr") ? hrItems : userItems;

  return (
    <>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" items={headerItems}
              subMenuCloseDelay={0.2} subMenuOpenDelay={0.3}
        />
      </Header>
    </>
  );
}

export default App;
