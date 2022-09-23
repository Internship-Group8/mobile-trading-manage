import VueRouter from "vue-router";
import Vue from 'vue'
import Home from '@/pages/demo.vue'
import PaymentChannal from '@/pages/payment-channel-manage/index.vue'
import AddPaymentChannel from '@/components/add-payment-channel/index.vue'
import AddProductType from '@/components/add-product-type/index.vue'
import Refund from '@/pages/refund-statistic/index.vue'
import InstitutionalOrder from '@/pages/institutional-order/index.vue'
import MyOrder from '@/pages/my-order/index.vue'
import ProductType from '@/pages/product-type-manage/index.vue'
import AddWeixinMerchant from '@/components/add-weixin-merchant/index.vue'
import OrderDetail from '@/components/order-detail/index.vue'


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
        { // 个人订单页面
          path:'/myorder',
          name:'MyOrder',
          component:MyOrder,
        },
        { // 产品类型管理页面
          path:'/producttype',
          name:'ProductType',
          component:ProductType,
        },
        { // 微信商户添加组件
          path:'/addmerchant',
          name:'AddWeixinMerchant',
          component:AddWeixinMerchant,
        },
        { // 订单详情组件
          path:'/orderdetail',
          name:'OrderDetail',
          component:OrderDetail,
        },
      ]
    }
    
    
  ]
})