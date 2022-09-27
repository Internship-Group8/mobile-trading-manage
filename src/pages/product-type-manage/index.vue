<template>
<div>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="产品类型管理" />
    <a-form  name="horizontal_query" layout="inline" autocomplete="off">
        <a-form-item label="类型名称">
            <a-input v-model:value="formState.name"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="getProductTypeByName()" html-type="submit">搜索</a-button>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="addProductType()">创建产品类型</a-button>
         </a-form-item>
    </a-form>

    <a-table bordered 
      :data-source="dataSource" 
      :columns="columns"
      :row-key="record => record.id" 
      :pagination="true"
      >

      <template slot="operation" slot-scope="text, record, index">
        <a-button type="primary" @click="editProductType(record.id)">编辑</a-button>
        <a-button type="danger" @click="showModal()">删除</a-button>
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
  import { getProductType, getProductTypeList,delProductType} from '@/api/product-type/productType';
  import { setCookie, delCookie } from '@/utils/cookie';
  import { setToken, delToken } from '@/utils/token';
// 列名
const columns = [
    {
    title: '产品类型名称',
    dataIndex: 'name',
    align: 'center',
    width: '50%',
    },
    {
    title: '操作',
    dataIndex: 'id',
    scopedSlots: { customRender: 'operation' },
    align: 'center',
    width: '50%',
    }
]  
export default {
  name:'ProductType',
  data() {
    return {
      formState:{},
      dataSource:[],  
      columns,
      ModalText: '确认删除类型？',
      visible: false,
      confirmLoading: false,
    }
  },
  created() {
    // 搜索功能对应表单对象
    this.formState={
      name:'',
      id:'',
    };
    //加载页面数据
    this.getProductTypeData();
  },
  
  methods: {
    //刷新页面时重新加载数据
    getProductTypeData:function(){
      // 获取所有产品类型以展示
      getProductTypeList().then(res=>{
          // console.log(res.data.info);
          this.dataSource=[];
          for(let i = 0;i<res.data.data.length;i++){
            this.dataSource.push({
              id:res.data.data[i].id,
              name:res.data.data[i].name,
            });
          }
        }).catch(errinfo=>{
            console.log(errinfo);
      });
    },
    
    // 根据名称查询类型
    getProductTypeByName:function(){
        getProductTypeList({
          "search":this.formState.name?this.formState.name:[],
          "orgCode":'',
        }).then(res => {
          if (res.status == 200) {
              this.dataSource=[];
              let datalist = res.data.data; 
              for (let i = 0; i < datalist.length; i++) {
                this.dataSource.push({
                  id:datalist[i].id,
                  name:datalist[i].name,
                });
              }
          }else{
          console.log('Failed:'+res.status);
          }
		    }).catch(errinfo=>{
           console.log(errinfo);
        });
		},
    //跳转到产品类型添加组件页面进行类型创建
    addProductType:function(){
        this.$router.push({
            name:'AddProductType',
            params:{selected:false, productTypeId:''}
        })
    },
    //跳转到产品类型添加组件页面进行类型编辑，主要是传递参数的不同
    editProductType:function(id){
        this.$router.push({
            name:'AddProductType',
            params:{selected:true, productTypeId:id}
        })
    },
    //跳转到删除提示界面
    showModal:function() {
      this.visible = true;
    },
    // 确认删除
    handleOk:function(id){
      this.ModalText = '正进行删除';
      this.confirmLoading = true;
      console.log(id);
      delProductType({
        'id':id
      }).then(res=>{
        console.log(res.data.info);
        this.visible = false;
        this.confirmLoading = false;
        this.getProductTypeData();
      }).catch(errinfo=>{
           console.log(errinfo);
      });
    },
    //取消删除
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
  },
}
</script>

<style >
</style>