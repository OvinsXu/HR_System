import {FC, useMemo, useState} from "react";
import {getUserListLike} from "../api/user";
import {Select} from "antd";
import {UserItem} from "../model/user";
// @ts-ignore
import debounce from 'lodash/debounce';

const App:FC=()=>{
  const [searchUserList, setSearchUserList] = useState([] as Array<UserItem>);//搜索用户列表
  const [openSelect, setOpenSelect] = useState(false);//控制列表是否默认展开
  const [fetching, setFetching] = useState(false);
    //防抖用户搜索,时间内只能发送一个请求
    const debounceFetcher = useMemo(() => {
        const loadOptions = (username: string) => {
            setFetching(true);

            getUserListLike(username).then((res) => {
                setSearchUserList(res);
                setFetching(false);
                setOpenSelect(true);//搜索完成,刷新列表,会关闭展开项,这里主动展开
            });
        };
        return debounce(loadOptions, 1000);//loadOptions上次调用后,时间超过才能再次调用
    }, []);
  return (
    <>
    <Select style={{width: 120}} showSearch placeholder="姓名搜索"
                            onSearch={debounceFetcher}
                            defaultOpen={openSelect}
                            onSelect={() => {
                                setOpenSelect(false);
                            }}
                            options={
                                searchUserList.map((item) => {
                                    return {key: item.id, value: item.id, label: item.truename}
                                })}>
                    </Select>
    </>
  );
}

export default App;

