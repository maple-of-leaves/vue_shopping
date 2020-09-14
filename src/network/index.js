//封装具体的业务请求
import request from './core'

import qs from 'qs'

import {
  homerec, homelist, getgoods, getcategory, getlist, getdetails,
  login, register, verifyPhone, phonecode, username, hotwords,
  addcart, getcart, showOrder, corelog, restmy, getOrderInfo,
  getArea, addArea, payorder, createOrder,
  verifypsd, zhi
} from "./APIConfig";

export function homeRec(params = {}) {
  return request({
    url: homerec,
    method: 'get',
    params,
    hideloading: false
  })
}

export function homeList(params) {
  return request(
    {
      url: homelist,
      method: 'get',
      params,
      hideloading: false
    }
  )
}

export function getGoods(params = {}) {
  return request({
    url: getgoods,
    method: 'get',
    params,
    hideloading: false
  })
}
export function getCategory(params) {
  return request({
    url: getcategory,
    method: 'get',
    params,
    hideloading: false
  })
}
export function getList(params) {
  return request({
    url: getlist,
    method: 'get',
    params,
    hideloading: false
  })
}
export function getDetails(goodsId) {
  return request({
    url: getdetails,
    method: 'get',
    params: {
      goodsId
    },
    hideloading: false
  })
}

export function Login(data) {
  return request({
    url: login,
    method: 'post',
    data,
    hideloading: true
  })

}
export function Register(data) {
  return request({
    url: register,
    method: 'post',
    data,
    hideloading: true
  })
}
export function VerifyPhone(params) {

  return request({
    url: verifyPhone,
    method: "get",
    params,
    hideloading: true
  })

}

// 手机验证吗
export function Phonecode(params) {

  return request({
    url: phonecode,
    method: "get",
    params,
    hideloading: true
  })

}

export function Checkusername(params) {

  return request({
    url: username,
    method: "get",
    params,
    hideloading: true
  })

}

export function Gethotwords(params) {
  return request({
    url: hotwords,
    method: "get",
    params,
    hideloading: false
  })

}
export function AddCart(params) {
  return request({
    url: addcart,
    method: 'post',
    params,
    hideloading: true,
  })
}

export function GetCart(params) {
  return request({
    url: getcart,
    method: 'get',
    params,
    hideloading: false,
  })

}

export function ShowOrder(goodsid) {
  return request({
    url: showOrder,
    method: 'get',
    params: { goodsid },
    hideloading: false,
  })

}

export function GetOrderInfo(goodsid) {
  return request({
    url: getOrderInfo,
    method: 'get',
    params: {
      goodsid
    }
  })
}

export function Restmy(params) {
  return request({
    url: restmy,
    method: 'get',
    params
  })
}

export function Core(params) {
  return request({
    url: corelog,
    method: 'get',
    params
  })
}
export function GetArea(params) {
  return request({
    url: getArea,
    method: 'get',
    params,
  })
}


export function AddArea(params) {
  return request({
    url: addArea,
    method: 'post',
    params,
  })
}


export function Payorder(data) {
  return request({
    url: payorder,
    method: 'post',
    data
  })
}


export function CreateOrder(data) {
  return request({
    url: createOrder,

    method: 'post',

    data
  })
}

export function VerifyPsd(data) {

  return request({
    url: verifypsd,
    method: 'post',
    data
  })

}

export function zfb(data) {
  return request({
    url: zhi,
    method: "post",
    data
  })
}