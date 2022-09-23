<template>
<div>
<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="订单详情" />
<a-descriptions :column="1" style="margin-bottom: 8px;" bordered>
    <a-descriptions-item label="交易订单号">{{orderData.outTradeNo?orderData.outTradeNo:'NULL'}}</a-descriptions-item>
    <a-descriptions-item label="订单日期">{{orderData.createDate?orderData.createDate:'NULL'}}</a-descriptions-item>
    <a-descriptions-item label="产品类型">{{orderData.ptname?orderData.ptname:'NULL'}}</a-descriptions-item>
    <a-descriptions-item label="产品内容">{{orderData.pname?orderData.pname:'NULL'}}</a-descriptions-item>
    <a-descriptions-item label="订单状态">{{orderData.payStatus?orderData.payStatus:'NULL'}}</a-descriptions-item>
    <a-descriptions-item label="订单金额">{{orderData.totalFee?orderData.totalFee:'NULL'}}</a-descriptions-item>
    <a-descriptions-item label="交易人">{{orderData.userName?orderData.userName:'NULL'}}</a-descriptions-item>
    <a-descriptions-item label="交易人通行证">{{orderData.usernumber?orderData.usernumber:'NULL'}}</a-descriptions-item>
  </a-descriptions>
</div>
</template>

<script>
import { getOrderData } from '@/api/order-detail/orderDetail';

export default {
  name:'OrderDetail',
  data() {
    return {
      orderData:{},
      orderId:'',
    };
  },

  created() {
    // 获取路由跳转传值,也即订单编号，此为必传参数
    this.orderId=this.$route.params.orderId;
    this.orderData={
        outTradeNo:'',
        createDate:'',
        ptname:'',
        pname:'',
        payStatus:'',
        totalFee:'',
        userName:'',
        usernumber:'',
    }
    getOrderData({'id':this.orderId}).then(res =>{
        this.orderData.outTradeNo = res.data.data.obj.outTradeNo;
        this.orderData.createDate = res.data.data.obj.createDate;
        this.orderData.ptname = res.data.data.obj.ptname;
        this.orderData.pname = res.data.data.obj.pname;
        this.orderData.totalFee = res.data.data.obj.totalFee;
        this.orderData.userName = res.data.data.obj.userName;
        this.orderData.usernumber = res.data.data.obj.usernumber;

        // 支付状态需要从id转化为对应文字
        if(res.data.data.obj.payStatus==2)this.orderData.payStatus='已付费';
        else if(res.data.data.obj.payStatus==1)this.orderData.payStatus='未付费';
        else this.orderData.payStatus='交易失败';
    })   

      
  },

  methods: {

  },
};
</script>

<style >

</style>