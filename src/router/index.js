import VueRouter from "vue-router";
import Vue from 'vue'
import Home from '@/pages/demo.vue'
import PaymentChannal from '@/pages/payment-channel-manage/index.vue'
import AddPaymentChannel from '@/components/add-payment-channel/index.vue'
import AddProductType from '@/components/add-product-type/index.vue'
import Refund from '@/pages/refund-statistic/index.vue'
import InstitutionalOrder from '@/pages/institutional-order/index.vue'

Vue.use(VueRouter)
// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home,
      children:[
        { //支付渠道管理页面
          path:'/pay',
          name:'PaymentChannal',
          component:PaymentChannal,
        },
        // {
        //   path:'/addchannel', 
        //   name:'AddPaymentChannel',
        //   component:AddPaymentChannel
        // },
        { //产品类型组件
          path:'/addtype',
          name:'AddProductType',
          component:AddProductType,
        },
        { // 退款统计页面
          path:'/refund',
          name:'Refund',
          component:Refund,
        },
        { // 机构订单页面
          path:'/orgtrade',
          name:'InstitutionalOrder',
          component:InstitutionalOrder,
        },
      ]
    }
    
    
  ]
})