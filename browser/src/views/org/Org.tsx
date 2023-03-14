import React, {useEffect, useState} from 'react';
import {OrganizationTreeGraph} from '@ant-design/charts';

import {Button, Col, Drawer, Row} from 'antd';
import DeptMgr from "./DeptMgr";
import PostMgr from './PostMgr';
import {getAllDept, getAllPost} from "../../api/org";
import {PostItem} from "../../model/org";

const App: React.FC = () => {

  const [data, setData] = useState(Object);
  const [post, setPost] = useState(Array<PostItem>);
  const [open, setOpen] = useState('');

  /**
   * 递归找出子组织
   * @param org 当前的组织
   * @param resData 所有组织
   */
  const findSubOrg = (org: any, resData: any) => {
    const subOrg = resData.filter((i: any) => i.did == org.id);


    if (subOrg.length > 0) {//有子部门先找子部门
      org.children = [];
      for (let i = 0; i < subOrg.length; i++) {
        org.children[i] = {};
        let item = subOrg[i];
        org.children[i].id = item.id + "";
        org.children[i].label = item.name;
        findSubOrg(org.children[i], resData);
      }
    }

  }


  useEffect(() => {
    getAllPost().then((res: any) => {
      setPost(res.data)
    });
  }, []);

  useEffect(() => {
    getAllDept().then((res: any) => {
      const resData = res.data;
      //根节点
      let org: any = {
        id: null,
        label: '公司',
      }
      //再去遍历每一个部门
      findSubOrg(org, resData);
      setData(org);
    });
  }, [post,open]);


  /**
   * 遍历树
   */
  const traverseTree = <T extends { children?: T[] }>(data: T, fn: (param: T) => boolean) => {
    if (typeof fn !== 'function') {
      return;
    }

    if (!fn(data)) {
      return false;
    }

    if (data && data.children) {
      for (let i = data.children.length - 1; i >= 0; i--) {
        if (!traverseTree(data.children[i], fn)) return false;
      }
    }
    return true;
  };

  traverseTree((data as any), (d: any) => {
    d.leftIcon = {
      style: {
        fill: '#e6fffb',
        stroke: '#e6fffb'
      },
    }
    return true
  })

  const nodeStateStyles = {
    hover: {
      stroke: '#1890ff',
      lineWidth: 2
    },
    selected: {
      stroke: '#f00',
      lineWidth: 1
    }
  }
  /**
   * 节点被点击事件
   */
  const handleNodeClick = (item: any, graph: any) => {
    graph.setItemState(item, 'selected', true)
  }
  /**
   * 画布被点击事件
   */
  const handleCanvasClick = (graph: any) => {
    const selectedEdges = graph.findAllByState('edge', 'selected');
    selectedEdges.forEach((edge: any) => {
      graph.setItemState(edge, 'selected', false)
    })
    const selectedNodes = graph.findAllByState('node', 'selected');
    selectedNodes.forEach((node: any) => {
      graph.setItemState(node, 'selected', false)
    })
  }

  return (
    <>
      <Row justify="center">
        <OrganizationTreeGraph data={data} nodeType='rect'
                               width={1000} height={400} style={{border: '1px solid green', margin: 20}}
                               nodeSize={[80, 30]}
          //nodeLabelCfg={{style:{fontSize:1}}}
                               collapseExpand={true}   //折叠子节点
                               nodeStateStyles={nodeStateStyles} //节点状态样式
                               handleNodeClick={handleNodeClick} //点击节点的回调函数
                               handleCanvasClick={handleCanvasClick} //点击画板背景的回调函数
          //enableEdit={true}   //是否可编辑
          //minimapCfg = {{ show: true}}  //显示导航小视图
        />
      </Row>
      <Row justify="center">
        <Col span={4}><Button type={'primary'} onClick={() => setOpen('dept')}>部门管理</Button></Col>
        <Col span={4}><Button type={'primary'} onClick={() => setOpen('post')}>岗位管理</Button></Col>
      </Row>

      <Drawer
        title="部门详情"
        width={800}
        onClose={() => setOpen('')}
        open={open === 'dept'}
        bodyStyle={{paddingBottom: 80}}
      >
        <DeptMgr/>
      </Drawer>
      <Drawer
        title="岗位详情"
        width={1200}
        onClose={() => setOpen('')}
        open={open === 'post'}
        bodyStyle={{paddingBottom: 80}}
      >
        <PostMgr/>
      </Drawer>

    </>
  );
};

export default App;
