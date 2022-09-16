import request from '@/utils/request'

export function getRefundList(params) {  // 查询退款记录
  return request({
    method: 'get',
    url:'http://8.134.59.178:8080/imu-datareduction-course/contestant/getRefundPageByOrgCode.html',
    params
  })
}

export function refundById(params) {  // 确认退款
  return request({
    method: 'post',
    url:'http://8.134.56.88:8080/trade/tradeController/HZZWxRefund.do',
    params
  })
}