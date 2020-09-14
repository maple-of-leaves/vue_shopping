import Vue from 'vue'

import App from './App.vue'

import router from './router'

import store from './store'


import 'lib-flexible/flexible'

import Vant from 'vant';

import 'vant/lib/index.css';

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

Vue.use(Vant);

import { Lazyload } from 'vant';


Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.config.productionTip = false


// Vue.prototype.$axios=axios

router.beforeEach((to, from, next) => {

  if (!to.meta.isflag || sessionStorage.username) {

    next()



  } else {
    let token = localStorage.getItem("Authtoken")
    if (token == null || token == '') {
      next('/login')
    } else {
      next()
    }

  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
