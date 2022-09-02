import request from '@/utils/request'

export function getLogin(params) {
  return request({
    method: 'get',
    url: 'http://wmp.aiiedu.cn/imu-datareduction-weweb/admin/login_user.html',
    params
  })
}