import {Cascader} from "antd";
import moment from "moment";
import {FC} from "react";

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}
const App: FC<any> = (props) => {
    const selectOnChange = props.selectOnChange;
    let months: Option[] = [];
    for (let i = 0; i < 12; i++) {
        const opt: Option = {
            value: i + 1,
            label: i + 1 + "月",
        }
        months.push(opt)
    }
    let casOpts: Option[] = [];//近五年的时间来作为选项
    for (let i = 0; i < 5; i++) {
        const opt: Option = {
            value: moment().subtract(i, 'y').format("YYYY"),
            label: moment().subtract(i, 'y').format("YYYY年"),
            children: months
        }
        casOpts.push(opt);
    }
    return (
        <>
            <Cascader options={casOpts} onChange={selectOnChange} placeholder="请选择时间" />
        </>
    );
}

export default App;

