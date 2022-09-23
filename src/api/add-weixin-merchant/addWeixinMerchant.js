import request from '@/utils/request'

export function setAccount(params) {  // 创建或更新商户账号
    return request({
      method: 'post',
      url: 'http://8.134.56.88:8080/trade/tradeController/saveOrUpdateAccountConfig.do',
      params
    })
}

export function getAccount(params){ //根据id查询商户账号实体
    return request({
        method: 'post',
        url: 'http://8.134.56.88:8080/trade/tradeController/getAccountConfigById.do',
        params
    })
}

export function getOrgList(params){  // 获取所有机构列表
    return request({
        method: 'get',
        url: 'http://8.134.56.88:8080/trade/tradeController/getOrgList.do',
        params
    })
}
