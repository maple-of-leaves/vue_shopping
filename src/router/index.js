import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shop',
    meta: {
      isshow: true,
      // 是否需要守卫
      isflag: false
    },
    component: () => import('../views/shop.vue')
  },

  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue')

  },
  {
    path: '/details',
    name: 'details',
    meta: {
      isshow: false,
      isflag: true
    },
    component: () => import('../views/details.vue')

  },

  {
    path: '/category',
    name: 'category',
    meta: {
      isshow: true,
      isflag: false
    },
    component: () => import('../views/category.vue')
  },

  {
    path: '/cart',
    name: 'cart',
    meta: {
      isshow: true,
      isflag: true
    },
    component: () => import('../views/cart.vue')
  },
  {
    path: '/user',
    name: 'user',

    meta: {
      isshow: true,
      isflag: true
    },

    component: () => import('../views/user.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('../components/register.vue')
  },

  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/homelist',
    name: "homelist",
    component: () => import('../views/homenavlist.vue')
  },

  {
    path: '/about',
    name: 'about',

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  }, {
    path: '/order',
    name: 'order',
    component: () => import('../views/order.vue')
  }, {
    path: '/address',
    name: 'address',
    component: () => import('../components/address.vue')
  },
  {
    path: '/payorder',
    name: 'payorder',
    component: () => import('../views/payorder.vue')
  }, {
    path: '/confirm',
    name: 'confirm',
    component: () => import('../views/confirmorder.vue')
  }, {
    path: '/addplace',
    name: 'addplace',
    component: () => import('../views/useraddress.vue')
  }, {
    path: '/addform',
    name: 'addform',
    component: () => import('../views/addform.vue')
  },{
    path:'/zfb',
    name:'zfb',
    component:()=>import('../views/zhifubao.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
