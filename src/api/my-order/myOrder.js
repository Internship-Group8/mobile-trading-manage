import request from '@/utils/request'

export function getMyOrder(params) {  // 获取当前账户的订单信息,参数中需要所属机构号以及当前账号通行号码，这里的数据来自登录后的缓存中的数据
    return request({
      method: 'post',
      url: 'http://8.134.56.88:8080/trade/tradeController/getOrderFormByUser.do',
      params
    })
}