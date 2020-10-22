import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//模块
import user from './models/user'

export default new Vuex.Store({
    modules:{
        user
    }
})
