
const PATH = {

  homerec: "/Home/getHomeREC",
  // 首页商品 展示
  homelist: "/Home/getHomeShowGoods",
  // 点击首页分类导航进去的接口
  getgoods: "/Goods/getGoods",
  // 分类页面  分类导航 二级导航
  getcategory: "/Goods/getCatsTree",
  // 分类商品
  getlist: "/Goods/getCadGoods",

  getdetails: "/Goods/GetGoodsInfo",

  login: "/LoginPage/Login",

  register: '/LoginPage/AddLogin',
  // 手机号是否被注册
  verifyPhone: "/Verify/GetPhone",
  // 手机短信验证码
  phonecode: '/SMSCode/GetCode',
  // 用户名是否可用
  username: '/Verify/LoginName',
  // 获取热词搜索榜
  hotwords: '/Goods/getSearchHot',

  addcart: '/Cart/addCart',

  getcart: '/Cart/getCart',
  // 展示订单信息
  showOrder: '/Order/getOrderInfo',
  // 从购物车获取商品
  getOrderInfo: '/Order/getGoodsInfoFromCart',
  // 积分变动
  corelog: "/Log/getPointLog",
  // 余额信息
  restmy: '/Log/getBalanceLog',
  // 获取用户的收货地址
  getArea: '/UserInfo/getArea',
  // 添加用户地址
  addArea: '/UserInfo/addArea',
  // 订单支付
  payorder: '/Order/payOrder',
  // 创建订单
  createOrder: '/Order/cretaeOrder',
  // 验证密码
  verifypsd: '/Order/verifyPayPWD',
  // 支付宝支付
  zhi: "/Alipay/appWebPay"

}

module.exports = PATH