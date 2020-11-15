import config from '@/config'
import axios from 'axios-miniprogram';
import {getAuthorization, getUserInfo, judgeIsLogin} from "@/libs/utils";
import store from "@/store";

//白名单
const whiteList = ['/index/mini_program/login','/member/info','/member/goods','/index/banner','/member/goods/detail/']

//passList
const passList = ['/admin/banner','/member/write_off_code/status']

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

function findUrl(url){
    let  i =  whiteList.find(item => url.indexOf(item) !== -1)
    return i !== undefined
}

// 添加请求拦截器
instance.interceptors.request.use( async (config)=> {
    // console.log(findUrl(config.url));
    // if (!passList.includes(config.url)){
    //     uni.showLoading({
    //         title: '加载中'
    //     });
    // }
    // config.headers.token = store.state.user.token || '';
    // return config
    if (findUrl(config.url)){
        if (!passList.includes(config.url)){
            uni.showLoading({
                title: '加载中'
            });
        }
        config.headers.token = store.state.user.token || '';
        return config
    }else {
        if (store.state.user.isLogin){
            if (!passList.includes(config.url)){
                uni.showLoading({
                    title: '加载中'
                });
            }
            config.headers.token = store.state.user.token || '';
            return config
        }else {
            await judgeIsLogin()
            uni.showLoading({
                title: '加载中'
            });
            config.headers.token = store.state.user.token || '';
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
        uni.showModal({
            title:'提示',
            content:'查看内容需用户授权登录！',
            success:  (res)=> {
                store.commit('setShowLogin', false)
                if (res.confirm) {
                    uni.redirectTo({
                        url:'/pages/authorization/Authorization'
                    })
                }
            }
        })
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
