import request from '@/utils/request'

export function getLogin(data) {
  return request({
    method: 'post',
    url: 'https://57m71549f3.oicp.vip/cloud-imu-server/login.html',
    // url: 'http://wmp.aiiedu.cn/cloud-imu-server/login.html',
    // url: 'http://192.168.0.215/cloud-imu-server/login.html',
    data
  })
}
