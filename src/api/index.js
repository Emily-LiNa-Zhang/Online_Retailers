//当前这个模块，统一管理所有的API接口

//需要发请求的话，需要引入request文件
import requests from "./request";
//mock模拟数据接口
import mockRequest from './mockRequest'

//三级联动接口
///api/product/getBaseCategoryList  get   无参数
//对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求，获取咱们的三级菜单数据。当前咱们这个函数只需要把服务器返回结果返回即可
//发请求：axios发送请求返回结果Promise对象
export const reqCategoryList = () => {
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequest.get('/banner')
//获取floor数据
export const reqGetFloorList = () => mockRequest.get('/floor')


//获取搜索模块的数据  请求地址：/api/list   请求方式：POST     参数：需要带参数
/*   
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前这个函数需不需要阶段后外部传递参数
//当前这个接口，给服务器传递参数params，至少是一个对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
// 注意requests中的数据配置项，post时对应的是data，get时对应的是params


//获取产品详情信息的接口   URL：/api/item/{ skuId }  请求方式：GET   
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })


//将产品添加到购物车中（获取更新某一个产品的个数）   url:/api/cart/addToCart/{ skuId }/{ skuNum }  post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表数据的接口  url：/api/cart/cartList   get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车产品的接口  url：/api/cart/deleteCart/{skuId}   请求方式：DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改商品选中的状态  url：/api/cart/checkCart/{skuId}/{isChecked}   get
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })


//获取验证码  url:/api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册接口  url：/api/user/passport/register    method:post    参数：pthone code password
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data: data, method: 'post' })

//登录接口  url：/api/user/passport/login  method：post  参数：phone、password
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data: data, method: 'post' })

//获取用户信息【带着用户对的token向服务器要用户信息】   /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })

//退出登录    url：/api/user/passport/logout   get
export const reqLogout = () => requests({ url: `/user/passport/logout`, method: 'get' })

// 获取用户地址信息     url：/api/user/userAddress/auth/findUserAddressList   get
export const reqAderessInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })

// 获取商品清单    url：/api/order/auth/trade   get
export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: 'get' })

// 提交订单    url：/api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data: data, method: 'post' })


//获取支付信息 url：/api/payment/weixin/createNative/{orderId}   get
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取订单支付状态     url：/api/payment/weixin/queryPayStatus/{orderId}    get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取个人中心的数据   url: /api/order/auth/{page}/{limit}    get
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })


