<template>
<div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="机构退款管理" />
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
          <a-select v-model:value="formState.costStatus" placeholder="全部" style="width: 200px">
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
      <template slot="costStatus" slot-scope="text,record">
        {{check(text)}}
      </template>
      
      <template slot="operation" slot-scope="text, record">
        
        <a-button v-if='record.costStatus==3' type="primary" @click="showModal(record)">确认退款</a-button>
        <a-modal
          title="请输入退款金额"
          :visible="refund_visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <a-input v-model:value="inputFee"></a-input>
        </a-modal>
        <a-button v-if='record.costStatus==4' type="default" @click="showDetail(record)">查看详情</a-button>
        <a-modal
          title="信息"
          :visible="detail_visible"
          :footer="null"
          @cancel="detailCancel"
        >
        <p>创建时间：{{modelrecord.gmtCreated}}</p>
        <p>退款订单号：{{modelrecord.outRefundNo}}</p>
        <p>课程名称：{{modelrecord.contestName}}</p>
        <p>退款时间：{{modelrecord.gmtModified}}</p>
        <p>退款金额：{{modelrecord.refundFee}}元</p>
        </a-modal>
      </template>
    </a-table>
</div>
    
  
</template>

<script>
  import { getRefundList,refundById } from '@/api/refund-statistic/refund';
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
    title: '订单金额（元）',
    dataIndex: 'totalFee',
    scopedSlots: { customRender: 'totalFee' },
    align: 'center',
    width: '10%',
    },
    {
    title: '退款金额（元）',
    dataIndex: 'refundFee',
    scopedSlots: { customRender: 'refundFee' },
    align: 'center',
    width: '10%',
    },
    {
    title: '退款人',
    dataIndex: 'userName',
    scopedSlots: { customRender: 'userName' },
    align: 'center',
    width: '10%',
    },
    {
    title: '联系方式',
    dataIndex: 'refundPhone',
    scopedSlots: { customRender: 'refundPhone' },
    align: 'center',
    width: '10%',
    },
    {
    title: '订单状态',
    dataIndex: 'costStatus',
    scopedSlots: { customRender: 'costStatus' },
    align: 'center',
    width: '10%',
    },
    {
    title: '订单时间',
    dataIndex: 'gmtCreated',
    scopedSlots: { customRender: 'gmtCreated' },
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
  name:'Refund',
  data() {

    return {
      formState:{},
      dataSource:[],
      pagination: {},
      columns,
      options:[],
      refund_visible: false,
      confirmLoading: false,
      modelrecord:{},
      inputFee:0,
      detail_visible:false,
    }
  },
  created() {
    // 搜索功能对应表单对象
    this.formState={
      productType:undefined,
      costStatus:'',
      startTime:undefined,
      endTime:undefined,
      outTradeNo:'',
    }
    // 获取所有产品类型
    getProductTypeList().then(res=>{
        // console.log(res.data.info);
        this.options=[{id:'',name:'全部'}];
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
    // 查询退款记录,因没有退款记录数据，搜索功能返回空对象数组
    getPageList:function(pageNo,issearch){
      
			getRefundList({
          "ptid":this.formState.productType?this.formState.productType:'',
          "startTime":this.formState.startTime?this.$moment(this.formState.startTime).format('YYYY-MM-DD HH:mm:ss'):'',
          "endTime":this.formState.endTime?this.$moment(this.formState.endTime).format('YYYY-MM-DD HH:mm:ss'):'',
          "payStatus":this.formState.costStatus,
          "outTradeNo":this.formState.outTradeNo,
					"pageNo": pageNo,
					"pageSize": 10,
          "orgCode": '111111',
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
                  totalFee:datalist[i].totalFee,
                  refundFee:!datalist[i].refundFee?0:datalist[i].refundFee,
                  userName:datalist[i].userName,
                  refundPhone:!datalist[i].refundPhone?'无':datalist[i].refundPhone,
                  costStatus:datalist[i].costStatus,
                  gmtCreated:datalist[i].gmtCreated,
                  outRefundNo:datalist[i].outRefundNo,
                  contestName:datalist[i].contestName,
                  gmtModified:datalist[i].gmtModified,
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
      if(val==3)return '退款中';
      else if(val==4)return '已退款';
      else return '退款失败';
    },

    // 页码更新表格内容
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getPageList(this.pagination.current,false);
    },

    showModal:function(record) {
      this.refund_visible = true;
      this.modelrecord = record;
    },

    // 确认退款
    handleOk:function(){
      this.confirmLoading = true;
      // console.log(this.modelrecord);
      refundById({
        'baId':this.modelrecord.costStatus,
        'totalFee':this.modelrecord.totalFee,
        'refund_fee':this.inputFee,
        'orgCode':'111111',
        'outTradeNo':this.modelrecord.outTradeNo,
        'outRefundNo':this.modelrecord.outRefundNo
      }).then(res=>{
        console.log(res.data);
        if(res.data.returnCode==='error')this.$message.info(res.data.err_code_des);
        this.refund_visible = false;
        this.confirmLoading = false;
        this.inputFee=0;
        this.getPageList(1,false);
      }).catch(errinfo=>{
           console.log(errinfo);
           this.$message.info('抛出错误');
           this.inputFee=0;
      });
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.refund_visible = false;
      this.inputFee=0;
    },

    // 显示退款详情
    showDetail:function(record){
      this.detail_visible=true;
      this.modelrecord = record;
    },
    detailCancel(e){
      console.log('Clicked cancel button');
      this.detail_visible = false;
    },
  },

}
</script>

<style >

</style>