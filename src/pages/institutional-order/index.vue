<template>
<div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="机构订单统计查询" />
    <a-form  name="horizontal_query" layout="inline" autocomplete="off">
        <a-form-item label="产品类型">
          <a-select v-model:value="formState.productType" placeholder="全部" style="width: 200px">
            <a-select-option v-for="item in options" :key="item.code" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="开始时间">
          <a-date-picker
            v-model="formState.startTime"
            show-time
            type="date"
            placeholder="选择日期时间"
            style="width: 100%;"
          />
        </a-form-item>
        <a-form-item label="结束时间">
          <a-date-picker
            v-model="formState.endTime"
            show-time
            type="date"
            placeholder="选择日期时间"
            style="width: 100%;"
          />
        </a-form-item>
        <a-form-item label="订单状态">
          <a-select v-model:value="formState.payStatus" placeholder="全部" style="width: 200px">
            <a-select-option value=''>全部</a-select-option>
            <a-select-option value='3'>失败</a-select-option>
            <a-select-option value='2'>成功</a-select-option>
            <a-select-option value='1'>待支付</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="交易订单号">
            <a-input v-model:value="formState.outTradeNo"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="getPageList(1,true)" html-type="submit">搜索</a-button>
        </a-form-item>
        
    </a-form>
    <a-table bordered 
      :data-source="dataSource" 
      :columns="columns"
      :row-key="record => record.id" 
      :pagination="pagination"
      @change="handleTableChange"
      >
      <template slot="payStatus" slot-scope="text,record">
        {{check(text)}}
      </template>
      
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" @click="showDetail(record.id)">查询详情</a-button>
      </template>
    </a-table>
</div>
    
  
</template>

<script>
  import { getOrgTrade } from '@/api/institutional-order/orgtrade';
  import { getProductTypeList} from '@/api/product-type/productType';
  import { setCookie, delCookie } from '@/utils/cookie';
  import { setToken, delToken } from '@/utils/token';

// 列名
const columns = [
    {
    title: '交易订单号',
    dataIndex: 'outTradeNo',
    scopedSlots: { customRender: 'outTradeNo' },
    align: 'center',
    width: '10%',
    },
    {
    title: '产品类型',
    dataIndex: 'ptname',
    scopedSlots: { customRender: 'ptname' },
    align: 'center',
    width: '10%',
    },
    {
    title: '订单状态',
    dataIndex: 'payStatus',
    scopedSlots: { customRender: 'payStatus' },
    align: 'center',
    width: '10%',
    },
    {
    title: '订单金额（元）',
    dataIndex: 'totalFee',
    scopedSlots: { customRender: 'totalFee' },
    align: 'center',
    width: '10%',
    },
    {
    title: '订单时间',
    dataIndex: 'createDate',
    scopedSlots: { customRender: 'createDate' },
    align: 'center',
    width: '10%',
    },
    {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
    width: '10%',
    }
]  

export default {
  name:'InstitutionalOrder',
  data() {

    return {
      formState:{},
      dataSource:[],  
      pagination: {},
      columns,
      options:[],
    }
  },
  created() {
    // 搜索功能对应表单对象
    this.formState={
      productType:undefined,
      payStatus:'',                                       
      startTime:undefined,
      endTime:undefined,
      outTradeNo:'',
    };
    // 获取所有产品类型
    getProductTypeList().then(res=>{
        // console.log(res.data.info);
        this.options=[{id:0,name:'全部'}];
        for(let i = 0;i<res.data.data.length;i++){
          this.options.push({
            id:res.data.data[i].id,
            name:res.data.data[i].name,
          });
        }
      }).catch(errinfo=>{
           console.log(errinfo);
    });
    this.getPageList(1,false);
  },
  
  methods: {
    
    // 查询机构订单,因没有机构订单数据，搜索功能返回空对象数组
    getPageList:function(pageNo,issearch){ 

        getOrgTrade({
          "ptid":this.formState.productType?this.formState.productType:'',
          "startTime":this.formState.startTime?this.$moment(this.formState.startTime).format('YYYY-MM-DD HH:mm:ss'):'',
          "endTime":this.formState.endTime?this.$moment(this.formState.endTime).format('YYYY-MM-DD HH:mm:ss'):'',
          "payStatus":this.formState.payStatus,
          "outTradeNo":this.formState.outTradeNo,
          "pageNo": pageNo,
          "pageSize": 10,
          "issueOrgCode": '111111',
        }).then(res => {
          if (res.status == 200) {
              this.dataSource=[];
              if(issearch){
                const pagination = { ...this.pagination };
                pagination.total = 0;
                this.pagination = pagination;
              }
              else{
                let datalist = res.data.data.list; 
                for (let i = 0; i < datalist.length; i++) {
                  this.dataSource.push({
                    id:datalist[i].id,
                    outTradeNo:datalist[i].outTradeNo,
                    ptname:!datalist[i].ptname?'null':datalist[i].ptname,
                    payStatus:datalist[i].payStatus,
                    totalFee:datalist[i].totalFee,
                    createDate:!datalist[i].createDate?'null':datalist[i].createDate,
                  });
                }
                const pagination = { ...this.pagination };
                pagination.total = res.data.data.totalCount;
                this.pagination = pagination;
              }
          }else{
          console.log('Failed:'+res.status);
          }
		    }).catch(errinfo=>{
           console.log(errinfo);
        });
		},

    check:function(val){
      if(val==2)return '已付费';
      else if(val==1)return '未付费';
      else return '支付失败';
    },
    
    // 页码更新表格内容
    handleTableChange(pagination, filters, sorter) {  
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getPageList(this.pagination.current,false);
    },

    showDetail:function(id) {
      console.log(id);
      //跳转到订单详情组件
      this.$router.push({
            name:'OrderDetail',
            params:{orderId:id}
        })
      
    },


  },

}
</script>

<style >

</style>