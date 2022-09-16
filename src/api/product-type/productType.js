import request from '@/utils/request'

export function setProductType(params) {  // 创建或更新产品类型
    return request({
      method: 'post',
      url: 'http://8.134.56.88:8080/trade/tradeController/saveOrUpdateProductType.do',
      params
    })
}

export function getProductType(params){ //查询产品类型
    return request({
        method: 'post',
        url: 'http://8.134.56.88:8080/trade/tradeController/getProductTypeById.do',
        params
    })
}

export function getProductTypeList(params){  // 获取所有产品类型
    return request({
        method: 'get',
        url: 'http://8.134.56.88:8080/trade/tradeController/getProductTypeListByOrgCode.do',
        params
    })
}