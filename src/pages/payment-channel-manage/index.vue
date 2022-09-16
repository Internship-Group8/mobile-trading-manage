<template>
<div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="支付渠道" />
    <a-form  name="horizontal_query" layout="inline" autocomplete="off">
        <a-form-item label="支付类型">
          <a-select v-model:value="formState.selected" placeholder="全部支付类型" style="width: 200px">
            <a-select-option value=''>全部支付类型</a-select-option>
            <a-select-option value='1'>微信支付</a-select-option>
            <a-select-option value='2'>支付宝支付</a-select-option>
            <a-select-option value='3'>时光币支付</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="渠道名称">
            <a-input v-model:value="formState.content"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="getPageList(formState.selected,formState.content)" html-type="submit">搜索</a-button>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="add()">创建渠道</a-button>
        </a-form-item>
    </a-form>
    <a-table bordered 
      :data-source="dataSource" 
      :columns="columns"
      :row-key="record => record.id" 
      :pagination="pagination"
      @change="handleTableChange"
      >
      
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" @click="edit(record.id)">编辑</a-button>
        <a-button type="primary" @click="showModal()">删除</a-button>
        <a-modal
          title="提示"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk(record.id)"
          @cancel="handleCancel"
        >
          <p>{{ ModalText }}</p>
        </a-modal>
      </template>
    </a-table>
</div>
    
  
</template>

<script>
  import { getPayChannelList } from '@/api/payment-channel/paychannel';
  import { delPayChannel } from '@/api/payment-channel/paychannel';
  import { setCookie, delCookie } from '@/utils/cookie';
  import { setToken, delToken } from '@/utils/token';

// 列名
const columns = [
      {
        title: '支付渠道名称',
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' },
        align: 'center',
        width: '10%',
      },
      {
        title: '渠道支付类型',
        dataIndex: 'ctName',
        scopedSlots: { customRender: 'ctName' },
        align: 'center',
        width: '10%',
      },
      {
        title: '关联商户配置名称',
        dataIndex: 'baName',
        scopedSlots: { customRender: 'baName' },
        align: 'center',
        width: '10%',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        align: 'center',
        width: '10%',
      }]  

export default {
  name:'PaymentChannal',
  data() {

    return {
      // 搜索对应表单对象
      formState:{
        selected:'',
        content:''
      },
      dataSource:[],
      pagination: {pageSize: 5},
      columns,
      ModalText: '是否确认删除该渠道',
      visible: false,
      confirmLoading: false,
    }
  },
  created() {
      this.getPageList();
  },
  
  methods: {
    // 查询支付渠道
    getPageList:function(ctName,name){
				getPayChannelList({
					"ctId": ctName,
					"search": name,
				}).then(res => {
					// console.log(res.data.info);
					if (res.status == 200) {
            this.dataSource=[];
						for (let i = 0; i < res.data.data.length; i++) {
							this.dataSource.push({
                id:res.data.data[i].id,
								name:res.data.data[i].name,
								ctName:res.data.data[i].ctName,
								baName:res.data.data[i].baName,
							});
						}
            const pagination = { ...this.pagination };
            pagination.total = res.data.data.length;
            this.pagination = pagination;

					}else{
            console.log('Failed:'+res.status);
          }
				}).catch(errinfo=>{
           console.log(errinfo);
        });
		},
    // 页码更新表格内容
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      // this.getPageList();
    },

    // 创建渠道
    add:function(){
      this.$router.push({
          path: '/addchannel',
          name: 'AddPaymentChannel',
          params: {
            selected:false,
            paychannelId:0
          }
        })
    },

    // 编辑渠道
    edit:function(id){
      this.$router.push({
          path: '/addchannel',
          name: 'AddPaymentChannel',
          params: {
            selected:true,
            paychannelId: id
          }
        })
    },

    showModal:function() {
      this.visible = true;
    },
    // 确认删除
    handleOk:function(id){
      this.ModalText = '正进行删除';
      this.confirmLoading = true;
      console.log(id);
      delPayChannel({
        'id':id
      }).then(res=>{
        console.log(res.data.info);
        this.visible = false;
        this.confirmLoading = false;
        this.getPageList();
      }).catch(errinfo=>{
           console.log(errinfo);
      });
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
  },

}
</script>

<style >

</style>