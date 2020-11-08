export default {
    state: {
        //是否登录
        isLogin: false,
        //用户鉴权
        token: '',
        //用户信息
        userInfo: {},
        //扫码进入code
        sceneCode: null,
        showLogin: false
    },
    getters: {
        getUserInfo: state => state.userInfo,
        getToken: state => state.token,
        getIsLogin: state => state.isLogin,
        getSceneCode: state => state.sceneCode
    },
    mutations: {
        setUserInfo: (state, data) => {
            state.userInfo = data
        },
        setUserInfoPhone: (state, data) => {
            state.userInfo.phone = data
        },
        setUserInfoName: (state, data) => {
            state.userInfo.realName = data
        },
        setUserInfoWithdrawQrCode: (state, data) => {
            state.userInfo.withdrawQrCode = data
        },
        setToken: (state, data) => {
            state.token = data
        },
        setIsLogin: (state, data) => {
            state.isLogin = data
        },
        setSceneCode: (state, data) => {
            state.sceneCode = data
        },
        setShowLogin: (state, data) => {
            state.showLogin = data
        }
    }
}
