<template>
<div>
<a-page-header style="border: 1px solid rgb(235, 237, 240)" title="产品类型新增" />
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="name" label="产品类型名称" prop="name">
      <a-input
        v-model="form.name"
        @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
      />
    </a-form-model-item>
    
    </a-form-model-item>
    <a-form-model-item label="关联支付渠道" prop="type">
      <a-checkbox-group v-model="form.type" :options="plainOptions" />
    </a-form-model-item>
    
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit()">
        {{ submitText }}
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</div>
</template>
<script>
import { getPayChannelList } from '@/api/payment-channel/paychannel';
import { getProductType,setProductType} from '@/api/product-type/productType';
const dict = {};
// 表单对象
const form={
  id:0,
  name: '',
  type: [],
};
// 表单规则
const rules = {
  name: [
    { required: true, message: '请输入产品类型名称', trigger: 'blur' },
    { min: 1, max: 20, message: '长度为1到10个字符', trigger: 'blur' },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: '请选择至少一种关联支付渠道',
      trigger: 'change',
    },
  ],
};
export default {
  name:'AddProductType',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      plainOptions:[],
      selected:false,
      productTypeId:0,
      form,
      rules,
      submitText:'创建类型',
    };
  },

  created() {
    // 获取路由跳转传值
    this.selected=this.$route.params.selected;
    this.productTypeId=this.$route.params.productTypeId;

    if(this.selected==false){
      this.submitText='创建类型';
      getPayChannelList().then(res =>{
        for (let i = 0; i < res.data.data.length; i++) {
							this.plainOptions.push(res.data.data[i].name);
              dict[res.data.data[i].name]=res.data.data[i].id;
			  }
      });
    }else{
      this.submitText='保存编辑';
      getProductType({'id':this.productTypeId}).then(res=>{
        console.log(res.data.data);
        this.form.id = res.data.data.id;
        this.form.name = res.data.data.name;
        let codelist = res.data.data.channelId.split(',').map(Number);
        // console.log(codelist);
        getPayChannelList().then(res =>{
          for (let i = 0,j=0; i < res.data.data.length; i++) {
                this.plainOptions.push(res.data.data[i].name);
                dict[res.data.data[i].name]=res.data.data[i].id;
                if(codelist[j]===res.data.data[i].id){
                  this.form.type.push(res.data.data[i].name);
                  j++;
                }
          }
        });

      });

    }     
    
        
      
  },

  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let channelcode=[];
          for(let i = 0;i<this.form.type.length;i++){
            channelcode.push(dict[this.form.type[i]]);
          }
          let channelId = channelcode.toString();
          if(this.selected){ // true则代表编辑，false代表创建
            setProductType({
              "id":this.form.id,
              "name":this.form.name,
              "orgCode":'111111',
              "channelId":channelId,
            }).then(res=>{
              console.log(res);
              alert('编辑成功');
            });
          }else{
            setProductType({
              "name":this.form.name,
              "orgCode":'111111',
              "channelId":channelId,
            }).then(res=>{
              console.log(res);
              alert('创建成功');
            });
          }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
