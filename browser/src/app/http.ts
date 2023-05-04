import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {message} from 'antd';

// 返回res.data的interface
export interface IResponse {
    code: number | string;
    data: any;
    msg: string;
}

let axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
    },
    transformRequest: [
        function (data) {
            //由于使用的 form-data传数据所以要格式化
            data = JSON.stringify(data);
            return data;
        }
    ]
});


// axios实例拦截响应
axiosInstance.interceptors.response.use(
    (response: any) => {
        if (response.headers.authorization) {
            sessionStorage.setItem('token', response.headers.authorization);
        }
        return response.status === 200 ? response.data : response;

    },
    (error: any) => {// 请求失败
        if (error.response.status === 403) {
            window.location.href = "/#/login";//跳转登录界面
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
        }
        if (error.response) {// 请求已发出，但是不在2xx的范围
            return Promise.reject(error.response.data);
        } else {
            message.error('网络连接异常,请稍后再试!');
        }
    }
);
// axios实例拦截请求
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        let token = sessionStorage.getItem('token');
        if (token) {
            config.headers!.Authorization = `${token}`
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)
export default axiosInstance;

