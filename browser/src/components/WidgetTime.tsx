import React, {useEffect, useState} from 'react';
import moment from 'moment';

const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const App = () => {
    const [renderKey, setRenderKey] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setRenderKey(Math.random());
        }, 1000);
        // 组件卸载清除定时器
        return () => clearInterval(timer);
    }, []);

    return (
        // 获取当前时间 年-月-日 时:分:秒  moment().format('YYYY-MM-DD HH:mm:ss')
        // 获取星期几，其中星期日为0、星期六为6  moment().day()
        <div style={{backgroundColor:'#ffffb8',width:'160px',margin:'20px',border:'solid #faad14 2px',borderRadius:'10px'}}>
            <div style={{fontSize:'16px'}}>
                {moment().format('YYYY-MM-DD')}&nbsp;{weeks[moment().day()]}
            </div>
            <div style={{fontSize:'32px',color:'#0958d9'}}>{moment().format('HH:mm:ss')}</div>
        </div>
    );
};
export default App;
