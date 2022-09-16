import request from '@/utils/request'

export function getPayChannel(params) { //查询支付渠道
    return request({
      method: 'post',
      url: 'http://8.134.56.88:8080/trade/tradeController/getChannel.do',
      params
    })
}

export function getPayChannelList(params) { //获取所有支付渠道
  return request({
    method: 'get',
    url: 'http://8.134.56.88:8080/trade/tradeController/getChannelList.do',
    params
  })
}

export function getPayChannelTypeList(params) { //获取所有支付渠道类型
  return request({
    method: 'get',
    url: 'http://8.134.56.88:8080/trade/tradeController/getChannelTypeList.do',
    params
  })
}

export function delPayChannel(params) { //删除支付渠道
  return request({
    method:'get',
    url:'http://8.134.56.88:8080/trade/tradeController/delChannel.do',
    params
  })

}