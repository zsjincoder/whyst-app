import config from '@/config'
import axios from 'axios-miniprogram';
import {getTokens, getUserInfo} from "@/libs/utils";

const baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro


const instance = axios.create({
    baseURL,
    headers: {
        common: {
            'Accept': 'application/json, test/plain, */*'
        },
        post: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getTokens() || '';
    return config;
}, function (error) {
    //处理请求错误
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 请求成功后做些什么
    const { data, status } = response
    if (data.code === 0) {
        return data.data
    } if (data.code === 4221){
        uni.showModal({
            title: '提示',
            content: '登录失效，重新登录',
            showCancel: false,
            confirmColor: "#2a93ef",
            success: function (res) {
                if (res.confirm) {
                    getUserInfo()
                }
            }
        });
    } else {
        uni.showModal({
            title:'服务器内部错误',
            content: `,错误信息：${data.message},错误码：${status}`
        })
        return Promise.reject(data)
    }
    return response;
}, function (error) {
    // 处理响应错误
    return Promise.reject(error);
});

export default instance;
