import config from '@/config'
import axios from 'axios-miniprogram';
import {getUserInfo, judgeIsLogin} from "@/libs/utils";
import store from "@/store";

//白名单
const whiteList = ['/index/mini_program/login','/member/info']

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
instance.interceptors.request.use( async (config)=> {
    // 在发送请求之前做些什么
    uni.showLoading({
        title: '加载中'
    });
    if (whiteList.includes(config.url)){
        config.headers.token = store.state.user.token || '';
        return config
    }else {
        await judgeIsLogin()
        config.headers.token = store.state.user.token || '';
        return config
    }
}, function (error) {
    //处理请求错误
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    uni.hideLoading()
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
        uni.showToast({
            title:`错误信息：${data.message || '无'}，错误码：${status || '无'}`,
            duration: 2000,
            icon:'none'
        })
        return Promise.reject(data)
    }
    return response;
}, function (error) {
    // 处理响应错误
    return Promise.reject(error);
});

export default instance;
