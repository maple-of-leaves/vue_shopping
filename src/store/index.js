import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  },
  state: {
    userinfo: [],
    token: JSON.parse(localStorage.getItem("Authtoken")) || '',
    username: '',
    arr: [],
    history: JSON.parse(localStorage.getItem("history")) || [],
    cart: [],
    goodsId: []
  },

  mutations: {
    register(state, users) {
      state.userinfo = users
    },
    login(state, val) {

      state.token = val[0]

      localStorage.setItem("Authtoken", JSON.stringify(val[0]))

      state.username = val[1].LoginName

     

    },
    save(state, val) {

      if (val) {
        state.arr.push(val)
      }

      if (state.history.length >= 6) {

        state.history.pop()

        state.history.unshift(val)

      }

      for (var i = 0; i < state.arr.length; i++) {

        if (state.history.indexOf(state.arr[i]) == -1) {


          state.history.unshift(state.arr[i])

        }
      }

      localStorage.setItem("history", JSON.stringify(state.history))

      return state.history

    },

    del(state, val) {

      state.history.splice(val, 1)

    },
    clearAll(state) {
      state.history = []
    },
    addCart(state, val) {

      // let rel = true
      // state.goodsId.forEach(Element => {
      //   if (Element == val) {
      //     rel = false
      //   }
      // })
      // if (rel) {
      //   state.goodsId.push(val)
      // }


      let rel = true

      state.cart.forEach(Element => {

        if (Element.goods.goodsId == val[0].goodsId) {

          rel = false

          Element.buyNum++
        }
      })
      if (rel) {
        state.cart.push({
          goods: val[0],
          buyNum: 1
        })
      }

    }
  },
  actions: {
    register(context, users) {

      context.commit("register", users)

    },

    login(context, val) {

      context.commit("login", val)

    },

    save(context, val) {
      context.commit("save", val)
    },

    addCart(context, val) {
      context.commit("addCart", val)
    },

    del(context, val) {
      context.commit("del", val)
    },

    clearAll(context) {
      context.commit("clearAll")
    }
  },

})

export default store
