import Vue from 'vue'
import Vuex from 'vuex'
//vuex数据持久化 （借助本地缓存做的持久化 sesssionStorage,localStorage） 
import createPersistedState from 'vuex-persistedstate'

//vuex 注册给vue
Vue.use(Vuex);

//数据中心
let state = {
    userinfo: [],
    count: 10,
    //存储用户登录信息
    token: '',
    code: ''
}
//actions 异步操作（定时器，ajax）
let actions = {
    
    getsync(context, val) {
        //context 值得是上下文对象。
        context.commit('increament', val)
    },

    register(context, users) {

        context.commit("register", users)

    }


}
//mutations 同步修改state中的数据
let mutations = {
    increament(state, val) {
        //state指的是 state数据中心
        state.count += val;
    },
    setToken(state, val) {
        state.token = val;
    },
    register(state, users) {
        state.userinfo = users

        console.log(state.userinfo)
    }
}
// getters  可以对state中的数据进行计算。（相当于组件中的computed）
let getters = {
    newVal: (state) => state.count * 2
}
//实例化 仓库
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    plugins: [createPersistedState({
        storage: window.localStorage
    })] //
});
