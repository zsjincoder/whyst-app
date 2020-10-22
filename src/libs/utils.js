import {login} from "@/api";

/**
 * 处理restfulApi参数
 * @param sendURL
 * @param data
 * @param method
 * @param headers
 */
export const handleRestful = (sendURL, data, method, headers = {}) => {
    let url = ''
    if (method === 'delete') {
        url += `${sendURL}/${data}`
    } else if (method === 'post' || method === 'put' || 'get') {
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
    result ? saveList.push(...list) : pageData.page--
}

/**
 * 获取token
 * @return {string|CancelToken}
 */
export const getTokens = () =>{
    let userInfo = uni.getStorageSync('userInfo')
    if (!userInfo) return ''
    else {
        let u = JSON.parse(userInfo)
        return u.token
    }
}
/**
 * 获取用户信息并登录
 */
export const getUserInfo = () =>{
    uni.login({
        provider: 'weixin',
        success: function (loginRes) {
            // console.log(loginRes);
            let code = loginRes.code;
            // 获取用户信息
            uni.getUserInfo({
                provider: 'weixin',
                success: (infoRes)=> {
                    // console.log(infoRes)
                    let {iv , encryptedData} = infoRes
                    console.log('用户昵称为：' + infoRes.userInfo.nickName);
                    let params = {code, iv, encryptedData}
                    login(params,'post').then(res=>{
                        console.log(res);
                        let {token} = res
                        uni.setStorageSync('userInfo', JSON.stringify({...infoRes.userInfo,token}));
                        let userInfo = uni.getStorageSync('userInfo')
                        console.log(userInfo);
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
