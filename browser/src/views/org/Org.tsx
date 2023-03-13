import React, { useState, useEffect } from 'react';
import { OrganizationTreeGraph } from '@ant-design/charts';

const App: React.FC = () => {
  const data = {
    id: 'root',
    label: 'root',
    children: [
      {
        id: 'c1',
        label: 'c1',
        children: [
          {
            id: 'c1-1',
            label: 'c1-1',
          },
          {
            id: 'c1-2',
            label: 'c1-2',
            children: [
              {
                id: 'c1-2-1',
                label: 'c1-2-1'
              },
              {
                id: 'c1-2-2',
                label: 'c1-2-2'
              },
            ]
          },
        ]
      },
      {
        id: 'c2',
        label: 'c2'
      },
      {
        id: 'c3',
        label: 'c3',
        children: [
          {
            id: 'c3-1',
            label: 'c3-1'
          },
          {
            id: 'c3-2',
            label: 'c3-2',
            children: [
              {
                id: 'c3-2-1',
                label: 'c3-2-1'
              },
              {
                id: 'c3-2-2',
                label: 'c3-2-2'
              },
              {
                id: 'c3-2-3',
                label: 'c3-2-3'
              },
            ]
          },
          {
            id: 'c3-3',
            label: 'c3-3'
          },
        ]
      }
    ]
  }

  /**
   * 遍历树
   */
  const traverseTree = <T extends { children?: T[] }>(data: T, fn: (param: T) => boolean) => {
    if (typeof fn !== 'function') {
      return;
    }

    if (fn(data) === false) {
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
      lineWidth: 3
    }
  }
  /**
   * 节点被点击事件
   */
  const handleNodeClick = (item:any, graph:any) => {
    graph.setItemState(item, 'selected', true)
  }
  /**
   * 画布被点击事件
   */
  const handleCanvasClick = (graph:any) => {
    const selectedEdges = graph.findAllByState('edge', 'selected');
    selectedEdges.forEach((edge:any) => {
      graph.setItemState(edge, 'selected', false)
    })
    const selectedNodes = graph.findAllByState('node', 'selected');
    selectedNodes.forEach((node:any) => {
      graph.setItemState(node, 'selected', false)
    })
  }
  return (
    <>
      <OrganizationTreeGraph data={data} nodeType='rect'
                             nodeStateStyles={nodeStateStyles}
                             handleNodeClick={handleNodeClick}
                             handleCanvasClick={handleCanvasClick} />;
    </>
  );
};

export default App;
