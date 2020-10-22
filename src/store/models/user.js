export default {
    state: {
        //是否登录
        isLogin: false,
        //用户鉴权
        token: '',
        //用户信息
        userInfo: {}
    },
    getters: {
        getUserInfo: state => state.userInfo,
        getToken: state => state.token,
        getIsLogin: state => state.isLogin,
    },
    mutations: {
        setUserInfo: (state, data) => {
            state.userInfo = data
        },
        setToken: (state, data) => {
            state.token = data
        },
        setIsLogin: (state, data) => {
            state.isLogin = data
        }
    }
}
