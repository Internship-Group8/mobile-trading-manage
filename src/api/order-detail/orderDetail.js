import request from '@/utils/request'

export function getOrderData(params) {  // 获取当前订单信息,参数中需要传入订单号
    return request({
      method: 'post',
      url: 'http://8.134.56.88:8080/trade/tradeController/getOrderForm.do',
      params
    })
}