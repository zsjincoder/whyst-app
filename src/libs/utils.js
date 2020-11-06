import {getInfo, login} from "@/api";
import store from "@/store"
import config from "@/config";

/**
 * 判断用户是否授权用户信息
 */
export const getAuthorization = () =>{
    uni.getSetting({
        success(res) {
            if (! res.authSetting.hasOwnProperty("scope.userInfo")){
                 console.log("没有权限")
                uni.redirectTo({
                    url:'/pages/authorization/Authorization'
                })
            }else {
                getUserInfo()
            }
        }
    })
}

/**
 * 获取用户信息并登录
 */
export const getUserInfo = () =>{
    if (store.state.user.isLogin) return false;
    uni.login({
        provider: 'weixin',
        success: function (loginRes) {
            // console.log(loginRes);
            let code = loginRes.code;
            // 获取用户信息
            uni.getUserInfo({
                provider: 'weixin',
                success: (infoRes)=> {
                    console.log(infoRes)
                    let {iv , encryptedData} = infoRes
                    console.log('用户：' + infoRes);
                    let params = {code, iv, encryptedData}
                    login(params,'post').then(res=>{
                        // console.log(res);
                        let {token} = res
                        store.commit("setToken",token)
                        getInfo({token},'get').then(res=>{
                            console.log(res);
                            store.commit("setIsLogin",true)
                            store.commit("setUserInfo",{...res,token})
                            let tabUrl = ['/pages/index/index','/pages/mall-over/mall-over','/pages/about_platform/AboutPlatform']
                            if (tabUrl.includes(config.homePage)){
                                uni.switchTab({
                                    url: config.homePage
                                })
                            }else {
                                uni.navigateTo({
                                    url: config.homePage
                                })
                            }

                        })

                    })
                }
            });
        },
        fail: (err)=>{
            console.log(err);
            this.getUserInfo()
        }
    });
}

/**
 * 轮询判断是否登录
 * @return {Promise<unknown>}
 */
export const judgeIsLogin = () =>{
    return new Promise((resolve, reject) => {
        let timer = setInterval(() => {
            if (store.state.user.isLogin) {
                clearInterval(timer)
                resolve(true)
            }
        }, 500)
    })
}

/**
 * 处理restfulApi参数
 * @param sendURL
 * @param data
 * @param method
 * @param headers
 */
export const handleRestful = (sendURL, data, method = 'get', headers = {}) => {
    let url = ''
    if (method === 'delete') {
        url += `${sendURL}/${data}`
    } else if (method === 'post' || method === 'put' || method === 'get') {
        url = data.hasOwnProperty('id') ? `${sendURL}/${data.id}` : sendURL
    } else {
        url = sendURL
    }
    switch (method) {
        case 'get': return { url, params: data, method, headers }
        case 'post': return { url, data, method, headers }
        case 'put': return { url, data, method, headers }
        case 'delete': return { url, method, headers }
    }
}

/**
 * 给List赋值并且判断是否需要加载更多
 * @param saveList
 * @param pageData
 * @param list
 */
export const needToLoadMore = (saveList, pageData, list) => {
    let result =  pageData.page <= Math.ceil(pageData.total/pageData.limit)
    console.log(result);
    if (result) {
        saveList.push(...list)
        return  "loadmore"
    } else {
        pageData.page > 1 && pageData.page--;
        return  "nomore"
    }
}

/**
 * 截取手机号码中间变成*号
 * @param phone
 * @return {string}
 */
export const formatPhone = (phone) =>{
    let replaceStr = phone.toString().substr(3,4)
    return phone.toString().replace(replaceStr,"****");
}

/**
 * 获取缓存中的用户数据
 * @param key
 * @return {string|*}
 */
export const getUserInfoForStorage = (key) =>{
    let userInfo = uni.getStorageSync('userInfo')
    if (!userInfo) return ''
    else if (!userInfo.hasOwnProperty(key)) {
        return ''
    }else {
        return userInfo[key]
    }
}

/**
 * 合并多个对象
 * @param obj1
 * @param obj2
 * @return {{}}
 * @constructor
 */
export const CombineMultipleObjects = (obj1,obj2) =>{
    let resObj = {}
    Object.assign(resObj, obj1, obj2)
    return resObj
}

/**
 * 查询数组中是否存在
 * @param array
 * @param array1
 * @param value
 * @return {string|boolean}
 */
export const isInArray = (array,array1, value) =>{
    if (array.indexOf(value) !== -1){
        if (array1.indexOf(value) !== -1){
            return 'tui-attr-active'
        }else {
            return false
        }
    }else {
        return 'tui-attr-disabled'
    }
}

//根据内容推算快递进度
export const expressProgress = (string) =>{
    let keyStr = ['揽收','到达','离开','派件','签收']
    let index = -1
    for (let i = 0; i < keyStr.length; i++){
        let key = string.indexOf(keyStr[i])
        if (key !== -1) {
            index = i
            break
        }
    }
    switch (index) {
        case 0: return 1
        case 1: return 2
        case 2: return 2
        case 3: return 3
        case 4: return 4
    }
}




















