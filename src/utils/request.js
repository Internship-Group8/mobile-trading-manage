import axios from 'axios'
// import { config } from "process"
import { message } from 'ant-design-vue'
import { getToken } from "./token"
import errorCode from "./errorCode"
import router from '../router/index';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8';

const service = axios.create({
  baseURL: 'http://www.allimu.com',
  timeout: 60 * 1000
})
// 请求拦截器
service.interceptors.request.use(config => {
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer' + getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})
// 响应拦截器
// service.interceptors.response.use(res => {
//   const code = res.data.code || 200;
//   const msg = errorCode[code] || res.data.msg || errorCode['default']
//   if (code === 401) {
//     message.warning('用户未登陆，请重新登陆')
//     router.push('/login')
//   } else if (code === 500) {
//     message.warning(msg)
//     return Promise.reject(new Error(msg));
//   } else if (code !== 200) {
//     message.warning(msg)
//     return Promise.reject("error");
//   } else {
//     return res.data;
//   }
// }, (error) => {
//   console.log("err" + error);
//   let { msg } = error;
//   if (msg == "Network Error") {
//     msg = "后端接口连接异常";
//   } else if (msg.includes("timeout")) {
//     msg = "系统接口请求超时";
//   } else if (msg.includes("Request failed with status code")) {
//     msg = "系统接口" + msg.substr(msg.length - 3) + "异常";
//   }
//   message.warning(msg)
//   return Promise.reject(error);
// })
export default service;