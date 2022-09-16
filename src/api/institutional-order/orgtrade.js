import request from '@/utils/request'

export function getOrgTrade(params) {  // 查询机构订单
  return request({
    method: 'get',
    url:'http://8.134.56.88:8080/trade/order/getTradeByIssueOrgCode.do',
    params
  })
}