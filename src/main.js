
import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router/index'//引入
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false

Vue.use(Antd)
 
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')