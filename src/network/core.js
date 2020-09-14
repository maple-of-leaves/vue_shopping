//网络模块核心代码
import axios from "axios";
import store from '@/store'
import { Toast } from 'vant'

const tip = msg => {
  Toast.loading({
    message: msg,
    duration: 1000,
    forbidClick: true
  });
}

const { baseURL } = require('../config/env.' + process.env.NODE_ENV + ".js")


const instance = axios.create({

  baseURL: "http://www.hj0819.top:44369/api",
  timeout: 10000
});

instance.interceptors.request.use(function (config) {

  if (!config.hideloading) {

    tip("加载中..")

  }

  if (JSON.parse(localStorage.getItem("Authtoken"))) {

    config.headers.token = JSON.parse(localStorage.getItem("Authtoken"))
  }
  return config;

}, function (error) {

  console.log("========>", error);
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  Toast.clear()
  const res = response.data
  if (res.status && res.status !== 200) {
    // 登录超时,重新登录
    if (res.status === 401) {
      store.dispatch('FedLogOut').then(() => {
        location.reload()
      })
    }
    return Promise.reject(res || 'error')
  } else {
    return Promise.resolve(res)
  }

}, function (error) {

  Toast.clear()
  console.log('err' + error) // for debug


  return Promise.reject(error);
});

export default instance






