<template>
    <div id="layout">
        <a-layout>
            <a-layout-header>实践活动服务平台</a-layout-header>
            <a-layout>
                <a-layout-sider>
                    <a-menu  mode="inline" theme="dark" >
                        <a-menu-item key="1">         
                            <router-link to="/">首页</router-link>
                        </a-menu-item>
                        <a-sub-menu key="sub1">                           
                            <template #title>
                                <span class="onemenu">移动交易管理</span>
                            </template>
                            <a-menu-item key="2">
                                <router-link to="/pay">支付渠道管理</router-link>
                            </a-menu-item>
                            <a-menu-item key="3">
                                <router-link to="/producttype">产品类型管理</router-link>
                            </a-menu-item>
                            <a-menu-item key="4">
                                <router-link to="/refund">退款统计</router-link>
                            </a-menu-item>
                            <a-menu-item key="5">
                                <router-link to="/myorder">我的订单</router-link>
                            </a-menu-item>
                            <a-menu-item key="6">
                                <router-link to="/orgtrade">机构订单</router-link>
                            </a-menu-item>
                            <a-menu-item key="7">
                                <router-link :to="{name:'AddWeixinMerchant',params:{selected:false}}">微信商户添加组件</router-link>
                            </a-menu-item>
                            
                        </a-sub-menu>
                        
                    </a-menu>
                </a-layout-sider>

                <a-layout-content>
                    <router-view></router-view>
                </a-layout-content>

            </a-layout>
            
        </a-layout>
    </div>
</template>
 
<script>

</script>
 
<style>
    #app{
        height: inherit;
    }
    #layout{
        height: inherit;
    }
    .ant-layout{
        height: inherit;
    }
    #layout .code-box-demo {
        text-align: center;
    }
 
    #layout .ant-layout-header,
    #layout .ant-layout-footer {
        color: #fff;
        
    }
 
    [data-theme='dark'] #layout .ant-layout-header {
        background: #6aa0c7;
    }
 
    [data-theme='dark'] #layout .ant-layout-footer {
        background: #6aa0c7;
    }
 
    #layout .ant-layout-footer {
        line-height: 1.5;
    }
 
    #layout .ant-layout-sider {
        color: #fff;
        line-height: 120px;
        
    }
 
    [data-theme='dark'] #layout .ant-layout-sider {
        background: #3499ec;
    }
 
    #layout .ant-layout-content {
        min-height: 120px;
        color: #fff;
        line-height: 120px;
        
    }
 
    [data-theme='dark'] #layout .ant-layout-content {
        
    }
 
    #layout>.code-box-demo>.ant-layout+.ant-layout {
        margin-top: 48px;
    }
</style>