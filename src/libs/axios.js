import config from '@/config'
import axios from 'axios-miniprogram';
import {getAuthorization, getUserInfo, judgeIsLogin} from "@/libs/utils";
import store from "@/store";

//白名单
const whiteList = ['/index/mini_program/login','/member/info','/admin/banner']

const baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

let cancel = null


const instance = axios.create({
    baseURL,
    headers: {
        cancelToken: new axios.CancelToken(function (c) {
            // 将c保存在vuex的cancelAxios中
            cancel = c
        }),
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
    if (whiteList.includes(config.url)){
        uni.showLoading({
            title: '加载中'
        });
        config.headers.token = store.state.user.token || '';
        return config
    }else {
        if (store.state.user.isLogin){
            await judgeIsLogin()
            uni.showLoading({
                title: '加载中'
            });
            config.headers.token = store.state.user.token || '';
            return config
        }else {
            cancel('不想请求了');
            getAuthorization()
            return config
        }
    }

    // 在发送请求之前做些什么

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
    } if (data.errCode === 4221){
        console.log("没有权限，未登录");
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
