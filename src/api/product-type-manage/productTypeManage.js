import request from '@/utils/request'

export function delProductType(params) {  // 删除产品类型
    return request({
      method: 'post',
      url: 'http://8.134.56.88:8080/trade/tradeController/deleteProductType.do',
      params
    })
}